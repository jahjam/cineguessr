import React, { useState, useEffect } from 'react';

export type ContextDefaults = {
  keyDown: string;
  input: string;
  handleSetInput: Function;
  setSubmit: Function;
  submit: boolean;
};

const contextDefaults = {
  keyDown: '',
  input: '',
  handleSetInput: (key: string) => {},
  setSubmit: () => {},
  submit: false,
};

const InputContext = React.createContext<ContextDefaults>(contextDefaults);

type Props = {
  children: React.ReactNode;
};

export const InputContextProvider = ({ children }: Props) => {
  const [keyDown, setKeyDown] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);

  const handleSetInput = (key: string) => {
    if (key === 'Backspace') {
      return setInput(prevState => prevState.slice(0, -1));
    }

    if (key === 'Spacebar') {
      return setInput(prevState => (prevState += ' '));
    }

    if (key === 'Enter') {
      setInput('');
      return setSubmit(true);
    }

    setInput(prevState => (prevState += key));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      return setInput(prevState => prevState.slice(0, -1));
    }

    if (e.key === 'Enter') {
      setInput('');
      return setSubmit(true);
    }

    if (e.key.length !== 1) return;

    setKeyDown(e.key);
    setInput(prevState => (prevState += e.key));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  console.log(input);

  const contextValue = {
    keyDown,
    input,
    handleSetInput,
    setSubmit,
    submit,
  };

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  );
};

export default InputContext;
