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
import GameContext from './store/game-context';
import DetailsModal from './Feature/DetailsModal/DetailsModal';

const AppContainer = styled.div`
  position: relative;

  ${flex}
`;

const App = () => {
  const inputContext = useContext(InputContext);
  const gameContext = useContext(GameContext);

  const { setSubmit, submit } = inputContext;
  const { correctLetters } = gameContext;

  useEffect(() => {
    setSubmit(false);
  }, [submit]);

  return (
    <AppContainer direction="column">
      <DetailsModal />
      <Header />
      <Details />
      <Cards />
      {correctLetters.length !== 0 && <Pool />}
      <Input />
      <Keyboard />
    </AppContainer>
  );
};

export default App;
