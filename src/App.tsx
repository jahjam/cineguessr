import Header from './Feature/Header/Header';
import Details from './Feature/Details/Details';
import Cards from './Feature/Cards/Cards';
import Pool from './Feature/Pool/Pool';
import Input from './Feature/Display/Display';
import Keyboard from './Feature/Keyboard/Keyboard';
import styled from 'styled-components';
import { flex } from './styled-utils/mixins';
import { useContext, useEffect, useState } from 'react';
import InputContext from './store/input-context';
import GameContext from './store/game-context';
import DetailsModal from './Feature/DetailsModal/DetailsModal';
import { AnimatePresence } from 'framer-motion';

const AppContainer = styled.div`
  ${flex}
`;

const App = () => {
  const inputContext = useContext(InputContext);
  const gameContext = useContext(GameContext);
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);

  const { setSubmit, submit } = inputContext;
  const { correctLetters } = gameContext;

  const handleToggleDetailsModal = () => {
    setToggleDetailsModal(!toggleDetailsModal);
  };

  useEffect(() => {
    setSubmit(false);
  }, [submit]);

  return (
    <AppContainer direction="column">
      <AnimatePresence mode="wait">
        {toggleDetailsModal && (
          <DetailsModal handleToggleDetailsModal={handleToggleDetailsModal} />
        )}
      </AnimatePresence>
      <Header handleToggleDetailsModal={handleToggleDetailsModal} />
      <Details />
      <Cards />
      {correctLetters.length !== 0 && <Pool />}
      <Input />
      <Keyboard />
    </AppContainer>
  );
};

export default App;
