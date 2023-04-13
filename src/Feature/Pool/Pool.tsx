import * as Styled from './styles';

import LetterCard from '../../Components/Letter-Card/Letter-Card';

const Pool = () => {
  return (
    <Styled.Container justify="flex-start" gap={1}>
      <LetterCard letter="R" />
      <LetterCard letter="B" />
      <LetterCard letter="T" />
    </Styled.Container>
  );
};

export default Pool;
