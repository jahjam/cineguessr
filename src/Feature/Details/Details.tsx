import { useContext, useEffect, useState } from 'react';
import GameContext from '../../store/game-context';
import UserContext from '../../store/user-context';
import * as Styled from './styles';

const Details = () => {
  const [openClapper, setOpenClapper] = useState(false);
  const [toggleHint, setToggleHint] = useState(false);
  const [hasUsedHint, setHasUsedHint] = useState(false);

  const gameContext = useContext(GameContext);
  const userContext = useContext(UserContext);

  const { lives, film, handleDecrementLives } = gameContext;
  const { user } = userContext;

  useEffect(() => {
    if (lives < 5) {
      setOpenClapper(true);
    }
  }, [lives]);

  const handleToggleHint = () => {
    if (!hasUsedHint) {
      handleDecrementLives();
      setHasUsedHint(true);
    }

    setToggleHint(!toggleHint);
  };

  return (
    <Styled.Container justify='space-between'>
      <Styled.Hint onClick={handleToggleHint}>HINT</Styled.Hint>
      <Styled.Data>
        <Styled.DataFront
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: !toggleHint ? 0 : 180,
            transition: { duration: 1 }
          }}
          direction='column'
          gap={0.1}
        >
          <span>Winning Streak: {user?.streak}</span>
          <span>Average Tries: 3.4</span>
          <span>Least Takes: {user?.leastTakes}</span>
          <span>Average Guess Time: 2m 53s</span>
        </Styled.DataFront>
        <Styled.DataBack
          initial={{ rotateX: -180 }}
          animate={{
            rotateX: toggleHint ? 0 : -180,
            transition: { duration: 1 }
          }}
        >
          <span>{film.hint}</span>
        </Styled.DataBack>
      </Styled.Data>
      <Styled.Score>
        <Styled.ClapperboardIcon
          open={openClapper}
          onAnimationEnd={() => setOpenClapper(false)}
        >
          <div />
          <div />
          <div />
          <span>{lives}</span>
        </Styled.ClapperboardIcon>
      </Styled.Score>
    </Styled.Container>
  );
};

export default Details;
