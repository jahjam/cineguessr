import * as Styled from './styles';

import LetterInput from '../../Components/Input/Input';

// type InputProps = {
//   input: string;
// };

const Input = () => {
  return (
    <Styled.Form gap={1} justify="flex-start">
      <LetterInput />
    </Styled.Form>
  );
};

export default Input;
