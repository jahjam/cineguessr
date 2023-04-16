import Header from './Feature/Header/Header';
import Details from './Feature/Details/Details';
import Cards from './Feature/Cards/Cards';
import Pool from './Feature/Pool/Pool';
import Input from './Feature/Display/Display';
import Keyboard from './Feature/Keyboard/Keyboard';
import styled from 'styled-components';
import { flex } from './styled-utils/mixins';
import { useContext, useEffect } from 'react';
import InputContext from './store/input-context';

const AppContainer = styled.div`
  ${flex}
`;

const App = () => {
  const inputContext = useContext(InputContext);

  const { setSubmit, submit } = inputContext;

  useEffect(() => {
    setSubmit(false);
  }, [submit]);

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
