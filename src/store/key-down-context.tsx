import React, { useState, useEffect, useContext } from 'react';

import InputContext from './input-context';

export type ContextDefaults = {
  keyDown: string;
  setKeyDown: Function;
};

const contextDefaults = {
  keyDown: '',
  setKeyDown: () => {},
};

const KeyDownContext = React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const KeyDownContextProvider = ({ children }: Props) => {
  const inputContext = useContext(InputContext);
  const [keyDown, setKeyDown] = useState<string>('');

  const { handleSetInput } = inputContext;

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeyDown(e.key);

    if (e.key === 'Backspace') {
      return handleSetInput('Backspace');
    }

    if (e.key === 'Enter') {
      return handleSetInput('Enter');
    }

    if (e.key.length !== 1) return;

    handleSetInput(e.key);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  const contextValue = {
    keyDown,
    setKeyDown,
  };

  return (
    <KeyDownContext.Provider value={contextValue}>
      {children}
    </KeyDownContext.Provider>
  );
};

export default KeyDownContext;
