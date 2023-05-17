import React, { useEffect, useState } from 'react';

export type ContextDefaults = {
  alert: string;
  handleSetAlert: Function;
};

const contextDefaults = {
  alert: '',
  handleSetAlert: (alert: string) => {},
};

export const AlertContext =
  React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const AlertContextProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState('');

  const handleSetAlert = (alert: string) => {
    setAlert(alert);
  };

  useEffect(() => {
    if (alert === 'win') {
      console.log(alert);
    }
  });

  const contextValue = { alert, handleSetAlert };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};
