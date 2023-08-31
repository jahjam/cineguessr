import { useContext, useEffect, useState } from 'react';
import GameContext from '../../store/game-context';
import UserContext from '../../store/user-context';
import * as Styled from './styles';
import { supabase } from '../../supabaseClient';

const Details = () => {
  const [openClapper, setOpenClapper] = useState(false);
  const [toggleHint, setToggleHint] = useState(false);
  const [hasUsedHint, setHasUsedHint] = useState(false);
  const [avTakes, setAvTakes] = useState(0);
  const [leastTakes, setLeastTakes] = useState(0);

  const gameContext = useContext(GameContext);
  const userContext = useContext(UserContext);

  const { lives, film, handleDecrementLives } = gameContext;
  const { user, setUserLives, setAvTakes: setAvTakesDb, setLeastTakes: setLeastTakesDb } = userContext;

  useEffect(() => {
    if (lives < 5) {
      setOpenClapper(true);
    }
  }, [lives]);

  useEffect(() => {
    if (!user) return;

    const getData = async () => {
      const { data, error } = await supabase.from('num_takes').select().eq('user_id', user.id);

      if (!data) return;

      const calcAvTakes = +(data?.reduce((acc, take) => {
        return acc + take.num_takes;
      }, 0) / data?.length).toFixed(1);

      const calcLeastTakes = Math.min(...data.map(take => take.num_takes))

      setAvTakes(calcAvTakes);
      setLeastTakes(calcLeastTakes);
      setAvTakesDb(calcAvTakes);
      setLeastTakesDb(calcLeastTakes);
    };

    getData();
  }, [user]);

  const handleToggleHint = () => {
    if (!hasUsedHint) {
      if (!user) return;

      if (!user.hintUsedToday) {
        setUserLives(user.lives - 1, true);
        handleDecrementLives();
        setHasUsedHint(true);
      }
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
          <span>Average Takes: {avTakes}</span>
          <span>Least Takes: {leastTakes}</span>
          <Styled.GuessTime>Average Guess Time: <span>{user?.averageGuessTime}</span></Styled.GuessTime>
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
