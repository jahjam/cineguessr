import React, { useState, useEffect } from 'react';

export type ContextDefaults = {
  film: object;
  lives: number;
  guess: string;
  handleSetGuess: Function;
  handleSetFilm: Function;
};

const contextDefaults = {
  film: {},
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
  const [film, setFilm] = useState({});
  const [lives, setLives] = useState(5);
  const [guess, setGuess] = useState('');

  const handleSetGuess = (guess: string) => {
    setGuess(guess);
  };

  const handleSetFilm = (film: object) => {
    setFilm(film);
  };

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
