import * as Styled from './stlyes';

type LetterCardProps = {
  letter: string;
};

const LetterCard = ({ letter }: LetterCardProps) => {
  return (
    <Styled.Container>
      <span>{letter}</span>
    </Styled.Container>
  );
};

export default LetterCard;
