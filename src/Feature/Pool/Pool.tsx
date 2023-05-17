import * as Styled from './styles';

import LetterCard from '../../Components/Letter-Card/Letter-Card';
import { useContext } from 'react';
import GameContext from '../../store/game-context';

const Pool = () => {
  const gameContext = useContext(GameContext);

  const { correctLetters } = gameContext;

  return (
    <Styled.Container
      transition={{ duration: 0.5 }}
      initial={{ transform: 'scale(50%)', opacity: 0 }}
      animate={{ transform: 'scale(100%)', opacity: 1 }}
      justify="flex-start"
      gap={1}
    >
      {correctLetters.map((letter: string, i: number) => (
        <LetterCard letter={letter.toUpperCase()} key={i} />
      ))}
    </Styled.Container>
  );
};

export default Pool;
