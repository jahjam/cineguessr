import React, { useState, useEffect, useCallback, useMemo } from 'react';

export type ContextDefaults = {
  input: string;
  handleSetInput: Function;
  setSubmit: Function;
  submit: boolean;
};

const contextDefaults = {
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

  const contextValue = {
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
