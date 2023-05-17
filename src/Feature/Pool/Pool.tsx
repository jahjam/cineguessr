import * as Styled from './styles';

import LetterCard from '../../Components/Letter-Card/Letter-Card';
import { useContext } from 'react';
import GameContext from '../../store/game-context';

const Pool = () => {
  const gameContext = useContext(GameContext);

  const { correctLetters } = gameContext;

  return (
    <Styled.Container justify="flex-start" gap={1}>
      {correctLetters.map((letter: string, i: number) => (
        <LetterCard letter={letter.toUpperCase()} key={i} />
      ))}
    </Styled.Container>
  );
};

export default Pool;
