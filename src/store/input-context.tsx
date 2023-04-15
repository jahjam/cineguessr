import React, { useState, useEffect, useCallback } from 'react';

export type ContextDefaults = {
  keyDown: string;
  input: string;
  handleSetInput: Function;
};

const contextDefaults = {
  keyDown: '',
  input: '',
  handleSetInput: (key: string) => {},
};

const InputContext = React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const InputContextProvider = ({ children }: Props) => {
  const [keyDown, setKeyDown] = useState<string>('');
  const [input, setInput] = useState<string>('');

  const handleSetInput = (key: string) => {
    if (key === 'Backspace') {
      return setInput(prevState => prevState.slice(0, -1));
    }

    if (key === 'Spacebar') {
      return setInput(prevState => (prevState += ' '));
    }

    setInput(prevState => (prevState += key));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      return setInput(prevState => prevState.slice(0, -1));
    }

    if (e.key.length !== 1) return;

    setKeyDown(e.key);
    setInput(prevState => (prevState += e.key));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  const contextValue = {
    keyDown,
    input,
    handleSetInput,
  };

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  );
};

export default InputContext;
