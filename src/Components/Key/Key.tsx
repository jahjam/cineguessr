import * as Styled from './styles';

type KeyProps = {
  letter: string;
};

const Key = ({ letter }: KeyProps) => {
  const handleClick = () => {
    console.log(letter);
  };

  return (
    <Styled.Key tabIndex={0} onClick={handleClick}>
      <span>{letter.toUpperCase()}</span>
    </Styled.Key>
  );
};

export default Key;
