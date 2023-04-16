import { useContext, useRef } from 'react';
import * as Styled from './styles';
import InputContext from '../../store/input-context';

type KeyProps = {
  letter: string;
};

const Key = ({ letter }: KeyProps) => {
  const keyEl = useRef<HTMLButtonElement>(null);
  const inputContext = useContext(InputContext);

  const { keyDown, handleSetInput } = inputContext;

  const handleClick = () => {
    handleSetInput(letter);

    keyEl.current?.blur();
  };

  return (
    <Styled.Key ref={keyEl} tabIndex={0} onClick={handleClick}>
      <span>{letter.toUpperCase()}</span>
    </Styled.Key>
  );
};

export default Key;
