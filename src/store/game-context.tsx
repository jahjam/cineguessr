import React, { useState, useEffect } from 'react';

import { gameData } from '../game-data/game-data';

type Card = {
  card: string;
  svg: string;
};

export type Film = { title: string; cards: Array<Card> };

export type ContextDefaults = {
  film: Film;
  lives: number;
  guess: string;
  handleSetGuess: Function;
  handleSetFilm: Function;
};

const contextDefaults = {
  film: { title: '', cards: [] },
  lives: 5,
  guess: '',
  handleSetGuess: (guess: string) => {},
  handleSetFilm: (film: string) => {},
};

const GameContext = React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const GameContextProvider = ({ children }: Props) => {
  const [film, setFilm] = useState<Film>({ title: '', cards: [] });
  const [lives, setLives] = useState(5);
  const [endState, setEndState] = useState(false);
  const [guess, setGuess] = useState('');

  const handleSetGuess = (guess: string) => {
    setGuess(guess);
  };

  const handleSetFilm = (film: Film) => {
    setFilm(film);
  };

  useEffect(() => {
    if (lives === 0) setEndState(true);

    const loadFilm = () => {
      setFilm(gameData[0]);
    };

    loadFilm();
  }, [endState]);

  const contextValue = {
    film,
    guess,
    lives,
    handleSetGuess,
    handleSetFilm,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContext;
