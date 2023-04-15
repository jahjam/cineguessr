import * as Styled from './styles';

import { useContext } from 'react';
import InputContext from '../../store/input-context';

const Input = () => {
  const inputContex = useContext(InputContext);

  const { input } = inputContex;

  return <Styled.Input type="text" value={input} disabled />;
};

export default Input;
