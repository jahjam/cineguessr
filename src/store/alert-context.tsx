import React, { useEffect, useState } from 'react';

export type ContextDefaults = {
  alert: string;
  handleSetAlert: Function;
  endGame: boolean;
  handleSetEndGame: Function;
};

const contextDefaults = {
  alert: '',
  handleSetAlert: (alert: string) => {},
  endGame: false,
  handleSetEndGame: () => {},
};

export const AlertContext =
  React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const AlertContextProvider = ({ children }: Props) => {
  const [endGame, setEndGame] = useState(false);
  const [alert, setAlert] = useState('play');

  const handleSetAlert = (alert: string) => {
    setAlert(alert);
  };

  const handleSetEndGame = () => {
    setEndGame(true);
  };

  const contextValue = { alert, handleSetAlert, endGame, handleSetEndGame };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};
