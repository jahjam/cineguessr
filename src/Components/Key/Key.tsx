import { useContext, useEffect, useRef, useState } from 'react';
import * as Styled from './styles';
import KeyDownContext from '../../store/key-down-context';
import InputContext from '../../store/input-context';

type KeyProps = {
  letter: string;
};

const Key = ({ letter }: KeyProps) => {
  const keyEl = useRef<HTMLButtonElement>(null);
  const keyDownContext = useContext(KeyDownContext);
  const inputContext = useContext(InputContext);
  const [flash, setFlash] = useState<boolean>(false);

  const { keyDown, setKeyDown } = keyDownContext;
  const { input, handleSetInput } = inputContext;

  const handleClick = () => {
    setFlash(true);
    setKeyDown('');
    handleSetInput(letter);

    keyEl.current?.blur();
  };

  useEffect(() => {
    if (letter === keyDown.toLowerCase()) {
      setFlash(true);
      setKeyDown('');
    }
  }, [input]);

  return (
    <Styled.Key
      onAnimationEnd={() => setFlash(false)}
      flash={flash}
      ref={keyEl}
      tabIndex={0}
      onClick={handleClick}
    >
      <span>{letter.toUpperCase()}</span>
    </Styled.Key>
  );
};

export default Key;
