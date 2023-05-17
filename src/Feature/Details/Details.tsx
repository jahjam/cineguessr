import { useContext } from 'react';
import GameContext from '../../store/game-context';
import * as Styled from './styles';

const Details = () => {
  const gameContext = useContext(GameContext);

  const { lives } = gameContext;

  return (
    <Styled.Container justify="space-between">
      <Styled.Hint>HINT</Styled.Hint>
      <Styled.Data direction="column" gap={0.1}>
        <span>Winning Streak: 2</span>
        <span>Average Tries: 3.4</span>
        <span>Least Tries: 3</span>
        <span>Average Guess Time: 2m 53s</span>
      </Styled.Data>
      <Styled.Score>
        <Styled.ClapperboardIcon />
        <span>{lives}</span>
      </Styled.Score>
    </Styled.Container>
  );
};

export default Details;
