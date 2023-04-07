import * as Styled from './styles';

const Details = () => {
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
        <span>3</span>
      </Styled.Score>
    </Styled.Container>
  );
};

export default Details;
