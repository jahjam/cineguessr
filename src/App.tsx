import Header from './Feature/Header/Header';
import Details from './Feature/Details/Details';
import Cards from './Feature/Cards/Cards';
import Pool from './Feature/Pool/Pool';
import Input from './Feature/Display/Display';
import Keyboard from './Feature/Keyboard/Keyboard';
import styled from 'styled-components';
import { flex } from './styled-utils/mixins';
import { useContext, useState } from 'react';
import GameContext from './store/game-context';
import DetailsModal from './Feature/DetailsModal/DetailsModal';
import { AnimatePresence } from 'framer-motion';
import { AlertContext } from './store/alert-context';
import EndStateModal from './Feature/EndStateModal/EndStateModal';
import UserContext from './store/user-context';

const AppContainer = styled.div`
  ${flex}
`;

const App = () => {
  const gameContext = useContext(GameContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const [toggleDetailsModal, setToggleDetailsModal] = useState(false);

  const { correctLetters } = gameContext;
  const { endGame } = alertContext;
  const { user } = userContext;

  const handleToggleDetailsModal = () => {
    if (endGame) return;

    setToggleDetailsModal(!toggleDetailsModal);
  };

  return (
    <AppContainer direction='column'>
      <AnimatePresence mode='wait'>
        {toggleDetailsModal && (
          <DetailsModal handleToggleDetailsModal={handleToggleDetailsModal} />
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {endGame && (
          <EndStateModal handleToggleDetailsModal={handleToggleDetailsModal} />
        )}
      </AnimatePresence>
      <Header handleToggleDetailsModal={handleToggleDetailsModal} />
      {user ?
        <>
          <Details />
          <Cards />
          {correctLetters.length !== 0 && <Pool />}
          <Input />
          <Keyboard />
        </> : <span>Loading...</span>}
    </AppContainer>
  );
};

export default App;
