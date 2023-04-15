import * as Styled from './styles';

type LetterInputProps = {
  input: string;
};

const LetterInput = ({ input }: LetterInputProps) => {
  const formattedInput = input;

  return (
    <Styled.Input
      type="text"
      placeholder="I Robot"
      value={formattedInput}
      disabled
    />
  );
};

export default LetterInput;
