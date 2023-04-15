import { useCallback, useEffect, useState } from 'react';

import Header from './Feature/Header/Header';
import Details from './Feature/Details/Details';
import Cards from './Feature/Cards/Cards';
import Pool from './Feature/Pool/Pool';
import Input from './Feature/Input/Input';
import Keyboard from './Feature/Keyboard/Keyboard';
import styled from 'styled-components';
import { flex } from './styled-utils/mixins';

const AppContainer = styled.div`
  ${flex}
`;

const App = () => {
  // const [keyDown, setKeyDown] = useState<string>('');
  // const [input, setInput] = useState<string>('');

  // const handleSetInput = (key: string) => {
  //   if (key === 'Backspace') {
  //     return setInput(prevState => prevState.slice(0, -1));
  //   }

  //   if (key === 'Spacebar') {
  //     return setInput(prevState => (prevState += ' '));
  //   }

  //   setInput(prevState => (prevState += key));
  // };

  // const handleKeyDown = useCallback(
  //   (e: KeyboardEvent) => {
  //     if (e.key === 'Backspace') {
  //       return setInput(prevState => prevState.slice(0, -1));
  //     }

  //     if (e.key.length !== 1) return;

  //     setKeyDown(e.key);
  //     setInput(prevState => (prevState += e.key));
  //   },
  //   [keyDown]
  // );

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown);
  // }, []);

  return (
    <AppContainer direction="column">
      <Header />
      <Details />
      <Cards />
      <Pool />
      <Input />
      <Keyboard />
    </AppContainer>
  );
};

export default App;
