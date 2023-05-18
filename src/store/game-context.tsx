import React, { useState, useEffect, useContext } from 'react';

import { gameData } from '../game-data/game-data';
import { AlertContext } from './alert-context';

type Card = {
  card: string;
  svg: string;
};

export type Film = { title: string; cards: Array<Card> };

export type ContextDefaults = {
  film: Film;
  lives: number;
  correctLetters: string[];
  endState: boolean;
  guess: string;
  handleSetGuess: Function;
  handleSetFilm: Function;
  handleSetLives: Function;
  handleSetEndState: Function;
};

const contextDefaults = {
  film: { title: '', cards: [] },
  lives: 5,
  guess: '',
  correctLetters: [],
  endState: false,
  handleSetGuess: (guess: string) => {},
  handleSetFilm: (film: string) => {},
  handleSetLives: (lives: number) => {},
  handleSetEndState: (endState: boolean) => {},
};

const GameContext = React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const GameContextProvider = ({ children }: Props) => {
  const alertContext = useContext(AlertContext);

  const [film, setFilm] = useState<Film>({ title: '', cards: [] });
  const [lives, setLives] = useState(5);
  const [endState, setEndState] = useState(false);
  const [guess, setGuess] = useState('');
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);

  const { handleSetAlert } = alertContext;

  const handleSetGuess = (newGuess: string) => {
    setLives(prevState => prevState - 1);
    setGuess(newGuess);
  };

  const handleSetFilm = (film: Film) => {
    setFilm(film);
  };

  const handleSetLives = (lives: number) => {
    setLives(lives);
  };

  const handleSetEndState = (endState: boolean) => {
    setEndState(endState);
  };

  useEffect(() => {
    if (guess.toLowerCase() === film.title.toLowerCase() && film.title !== '') {
      handleSetAlert('win');
    } else if (lives === 0) {
      handleSetAlert('lose');
      setEndState(true);
    } else {
      const currCorrectLetters = guess
        .split('')
        .filter(
          char => film.title.toLowerCase().includes(char) && char !== ' '
        );

      setCorrectLetters(prevState => [
        ...[...new Set([...prevState, ...currCorrectLetters])],
      ]);
    }
  }, [guess]);

  useEffect(() => {
    const loadFilm = () => {
      setFilm(gameData[0]);
    };

    loadFilm();
  }, []);

  const contextValue = {
    film,
    guess,
    correctLetters,
    lives,
    endState,
    handleSetGuess,
    handleSetFilm,
    handleSetLives,
    handleSetEndState,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContext;
