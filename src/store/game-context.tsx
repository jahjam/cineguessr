import React, { useState, useEffect, useContext, useRef } from 'react';

import { gameData } from '../game-data/game-data';
import { AlertContext } from './alert-context';
import UserContext, { User } from './user-context';
import { supabase } from '../supabaseClient';
import { format } from 'date-fns';

type Card = {
  card: string;
  svg: string;
};

export type Film = { title: string; cards: Array<Card>; hint: string };

export type Game = {
  gameId: number,
  createdAt: Date,
  film: string,
  currentDay: string,
  index: number
}

export type ContextDefaults = {
  film: Film;
  lives: number;
  correctLetters: string[];
  endState: boolean;
  guess: string;
  handleSetGuess: Function;
  handleSetFilm: Function;
  handleDecrementLives: Function;
  handleSetEndState: Function;
};

const contextDefaults = {
  film: { title: '', cards: [], hint: '' },
  lives: 5,
  guess: '',
  correctLetters: [],
  endState: false,
  handleSetGuess: (guess: string) => {
  },
  handleSetFilm: (film: string) => {
  },
  handleDecrementLives: (lives: number) => {
  },
  handleSetEndState: (endState: boolean) => {
  }
};

const GameContext = React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const GameContextProvider = ({ children }: Props) => {
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const todaysDate = format(new Date(), 'dd-MM-yyyy');

  const [film, setFilm] = useState<Film>({ title: '', cards: [], hint: '' });
  const [game, setGame] = useState<Game>();
  const [lives, setLives] = useState<number>(5);
  const [endState, setEndState] = useState(false);
  const [guess, setGuess] = useState('');
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);

  const { handleSetAlert, handleSetEndGame } = alertContext;
  const {
    user,
    setUserHasPlayedToday,
    setUserLives,
    setUserCorrectLetters,
    setUserHasWon,
    setUserStreak,
    breakUserStreak,
    resetUserOnNewGame,
    setUserGuessForToday
  } = userContext;

  const filmRef = useRef<Film>({ title: '', cards: [], hint: '' });
  const userRef = useRef<User>();
  const gameRef = useRef<Game>();
  const livesRef = useRef<number>();

  filmRef.current = film;
  userRef.current = user;
  gameRef.current = game;
  livesRef.current = lives;

  const handleSetGuess = async (newGuess: string) => {
    if (userRef.current?.hasPlayedToday) {
      console.log("You've already played today, please come back tomorrow!");
      return;
    }

    // YOU WIN!
    if (newGuess.toLowerCase() === filmRef.current.title.toLowerCase()) {
      handleSetAlert('win');
      handleSetEndGame(true);

      setUserGuessForToday(newGuess.toLowerCase(), livesRef.current, gameRef.current);
      setUserHasPlayedToday(gameRef.current);
      setUserHasWon();
      setUserStreak();

      return;
    }

    // WRONG GUESS!
    setUserGuessForToday(newGuess.toLowerCase(), livesRef.current, gameRef.current);
    setLives(prevState => {
      setUserLives(prevState - 1);
      return prevState - 1;
    });
    setGuess(newGuess);
  };

  const handleSetFilm = (film: Film) => {
    setFilm(film);
  };

  const handleDecrementLives = () => {
    setLives(prevState => prevState - 1);
  };

  const handleSetEndState = (endState: boolean) => {
    setEndState(endState);
  };

  // handle everything about guesses
  useEffect(() => {
    if (!user) return;

    if (lives === 0 && !user.hasPlayedToday) {
      handleSetAlert('lose');
      handleSetEndGame(true);
      setEndState(true);

      setUserHasPlayedToday(gameRef.current);
      breakUserStreak();
    } else {
      const currCorrectLetters = guess
        .split('')
        .filter(
          char => film.title.toLowerCase().includes(char) && char !== ' '
        );

      if (!user) return;

      if (!currCorrectLetters.length) {
        setCorrectLetters(prevState => {
          if (prevState.length) {
            return [...prevState];
          }

          if (!user.hasPlayedToday) return [...user.curCorrectLetters.split('')];

          return [];
        });
      } else {
        setCorrectLetters(prevState => {
          const newCurrentLetters_a = [
            ...[...new Set([...prevState, ...currCorrectLetters])]
          ];

          user && setUserCorrectLetters(newCurrentLetters_a.join(''));

          return newCurrentLetters_a;
        });
      }
    }
  }, [lives, user]);

  // handle everything about loading the film
  useEffect(() => {
    const fetchFilmFromDB = async () => {
      const { data, error } = await supabase.from('game').select().eq('current_day', todaysDate);

      // TODO handle error
      if (error) {
        console.log(error);
        return;
      }

      // the game for this day has already been created, and we can get id to load in the game
      if (data.length) {
        const { id: gameId, created_at: createdAt, film, current_day: currentDay, index } = data[0];
        setGame({
          gameId,
          createdAt,
          film,
          currentDay,
          index
        });
        setFilm(gameData[data[0].index]);
      }
      // else it hasn't, and we must create it and then set the id for the game
      else {
        // generate random number that hasn't been used before using recursion
        const generateUnusedRandomNumber = async (): Promise<number> => {
          let i = Math.floor(Math.random() * gameData.length);

          const {
            data: filmUsedIndexData,
            error: selectfilmUsedIndexError
          } = await supabase.from('films_used').select().eq('film_index', i);

          if (selectfilmUsedIndexError) {
            console.log(selectfilmUsedIndexError);
            return 0;
          }

          if (filmUsedIndexData?.length) {
            i = await generateUnusedRandomNumber();
          }

          return i;
        };

        const { data: filmUsedData, error: selectfilmUsedError } = await supabase.from('films_used').select();

        if (selectfilmUsedError) {
          console.log('Something went wrong!');
          return;
        }

        if (filmUsedData?.length === gameData.length) {
          // delete all film_used table and start again (this means that all the films have been used);
          // 1000 is magic number because assuming there'll never been 1000 films in the game
          await supabase.from('films_used').delete().neq('film_index', 1000);
        }

        const randomGameIndex = await generateUnusedRandomNumber();

        const { data, error: insertError } = await supabase.from('game').insert({ current_day: todaysDate }).select();

        const { error: insertIndexError } = await supabase.from('films_used').insert({ film_index: randomGameIndex });

        if (insertError || insertIndexError) {
          console.log('Something went wrong!');
          return;
        }

        const selectedGame = gameData[randomGameIndex];

        if (!data) return;

        const { data: gameDataDb, error: updateError } = await supabase.from('game').update({
          film: selectedGame.title.replaceAll(' ', '-').toLowerCase(),
          index: randomGameIndex
        }).eq('id', data[0]?.id).select();

        if (updateError) {
          console.log('Something went wrong!');
          return;
        }

        const { id: gameId, created_at: createdAt, film, current_day: currentDay, index } = gameDataDb[0];

        setGame({
          gameId,
          createdAt,
          film,
          currentDay,
          index
        });
        setFilm(gameData[randomGameIndex]);
      }
    };

    fetchFilmFromDB();
  }, []);

  // handle everything about user
  useEffect(() => {
    if (!user) return;
    const dateLastPlayed = user?.lastPlayed;

    if (dateLastPlayed !== todaysDate) {
      resetUserOnNewGame();
      return;
    }

    if (user?.hasPlayedToday) {
      handleSetAlert('hasPlayedToday');
      handleSetEndGame(true);
      setLives(user.lives);
      return;
    }

    setLives(user.lives);
  }, [user]);

  const contextValue = {
    film,
    guess,
    correctLetters,
    lives,
    endState,
    handleSetGuess,
    handleSetFilm,
    handleDecrementLives,
    handleSetEndState
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContext;
