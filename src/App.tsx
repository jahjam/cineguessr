import { useEffect, useState } from 'react';

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
  const [keyDown, setKeyDown] = useState<string>('');
  const [input, setInput] = useState<string[]>([]);

  const handleKeyDown = (e: any) => {
    setKeyDown(e.key);
    setInput(prevState => [...prevState, e.key]);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContainer direction="column">
      <Header />
      <Details />
      <Cards />
      <Pool />
      <Input input={input} />
      <Keyboard keyDown={keyDown} />
    </AppContainer>
  );
};

export default App;
