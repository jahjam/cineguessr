import * as Styled from './styles';

import LetterInput from '../../Components/Letter-Input/Letter-Input';

type InputProps = {
  input: string;
};

const Input = ({ input }: InputProps) => {
  return (
    <Styled.Form gap={1} justify="flex-start">
      <LetterInput input={input} />
    </Styled.Form>
  );
};

export default Input;
