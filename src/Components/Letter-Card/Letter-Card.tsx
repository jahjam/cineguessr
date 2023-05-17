import * as Styled from './stlyes';

type LetterCardProps = {
  letter: string;
};

const LetterCard = ({ letter }: LetterCardProps) => {
  return (
    <Styled.Container
      transition={{ duration: 0.5 }}
      initial={{ translateX: 1000, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
    >
      <span>{letter}</span>
    </Styled.Container>
  );
};

export default LetterCard;
