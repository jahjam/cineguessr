import React, { useState, useEffect, useContext, useRef } from 'react';

import { gameData } from '../game-data/game-data';
import { AlertContext } from './alert-context';
import UserContext, { User } from './user-context';
import { supabase } from '../supabaseClient';
import { format, isToday } from 'date-fns';

type Card = {
  card: string;
  svg: string;
};

export type Film = { title: string; cards: Array<Card>; hint: string };

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

  const [film, setFilm] = useState<Film>({ title: '', cards: [], hint: '' });
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
    breakUserStreak
  } = userContext;

  const filmRef = useRef<Film>({ title: '', cards: [], hint: '' });
  const userRef = useRef<User>();

  filmRef.current = film;
  userRef.current = user;

  const handleSetGuess = async (newGuess: string) => {
    // YOU WIN!
    if (newGuess.toLowerCase() === filmRef.current.title.toLowerCase()) {
      handleSetAlert('win');
      handleSetEndGame(true);

      setUserHasPlayedToday();
      setUserHasWon();
      setUserStreak();

      return;
    }

    // WRONG GUESS!
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

  useEffect(() => {
    if (user?.hasPlayedToday) {
      // TODO change to a hasPlayedToday alert
      handleSetAlert('win');
      handleSetEndGame(true);
      return;
    }

    if (lives === 0) {
      handleSetAlert('lose');
      handleSetEndGame(true);
      setEndState(true);

      setUserHasPlayedToday();
      breakUserStreak();
    } else {
      const currCorrectLetters = guess
        .split('')
        .filter(
          char => film.title.toLowerCase().includes(char) && char !== ' '
        );

      if (!currCorrectLetters.length && user) {
        setCorrectLetters([...user.curCorrectLetters.split('')]);
      } else {
        setCorrectLetters(prevState => {
          user && setUserCorrectLetters([
            ...[...new Set([...prevState, ...currCorrectLetters])]
          ].join(''));

          return [
            ...[...new Set([...prevState, ...currCorrectLetters])]
          ];
        });
      }
    }
  }, [lives, user]);

  // Load the film
  useEffect(() => {
    const fetchFilmFromDB = async () => {
      const todaysDate = format(new Date(), 'dd-MM-yyyy');
      const { data, error } = await supabase.from('game').select().eq('current_day', todaysDate);

      // TODO handle error
      if (error) {
        console.log(error);
        return;
      }

      // the game for this day has already been created, and we can get id to load in the game
      if (data.length) {
        console.log('Game exists');
        setFilm(gameData[data[0].index]);
      }
      // else it hasn't, and we must create it and then set the id for the game
      else {
        console.log('Game doesn\'t exist');
        // TODO check films_used table to see if all films have been used, if so, drop table and start again
        //
        //

        const { data, error: insertError } = await supabase.from('game').insert({ current_day: todaysDate }).select();

        const randomGameIndex = Math.floor(Math.random() * gameData.length);

        const selectedGame = gameData[randomGameIndex];

        if (!data) return;

        const { error: updateError } = await supabase.from('game').update({
          film: selectedGame.title.replaceAll(' ', '-').toLowerCase(),
          index: randomGameIndex
        }).eq('id', data[0]?.id);

        setFilm(gameData[randomGameIndex]);
      }
    };

    fetchFilmFromDB();


    if (!user) return;
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
