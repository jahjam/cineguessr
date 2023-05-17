import * as Styled from './styles';

import Key from '../../Components/Key/Key';

import InputContext from '../../store/input-context';
import { useContext, useEffect, useRef, useState } from 'react';
import KeyDownContext from '../../store/key-down-context';
import GameContext from '../../store/game-context';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const Keyboard = () => {
  const spacebarBtn = useRef<HTMLDivElement>(null);
  const backspaceBtn = useRef<HTMLDivElement>(null);
  const returnBtn = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState<string>('');
  const [flash, setFlash] = useState<boolean>(false);

  const inputContext = useContext(InputContext);
  const keyDownContext = useContext(KeyDownContext);

  const { handleSetInput, input } = inputContext;
  const { keyDown } = keyDownContext;

  const handleBackspaceIconClick = () => {
    handleSetInput('Backspace');
    setFlash(true);
    setKey('backspace');
    backspaceBtn.current?.blur();
  };

  const handleSpacebar = () => {
    setKey('spacebar');
    setFlash(true);
    handleSetInput('Spacebar');
    spacebarBtn.current?.blur();
  };

  const handleReturnIconClick = () => {
    setKey('return');
    setFlash(true);
    handleSetInput('Enter');
    returnBtn.current?.blur();
  };

  useEffect(() => {
    if (keyDown === 'Enter' || keyDown === 'Backspace' || keyDown === ' ') {
      setFlash(true);
    }
  }, [input]);

  return (
    <Styled.Keyboard direction="column">
      {KEYS.map((keyRow, i) =>
        i === 2 ? (
          <Styled.Row gap={0.4} key={i}>
            <Styled.IconContainer
              onAnimationEnd={() => setFlash(false)}
              flash={key === 'return' || keyDown === 'Enter' ? flash : false}
              tabIndex={0}
              ref={returnBtn}
              onClick={handleReturnIconClick}
            >
              <Styled.ReturnIcon />
            </Styled.IconContainer>
            {keyRow.map((key, i) => {
              return <Key key={i} letter={key} />;
            })}
            <Styled.IconContainer
              onAnimationEnd={() => setFlash(false)}
              flash={
                key === 'backspace' || keyDown === 'Backspace' ? flash : false
              }
              tabIndex={0}
              onClick={handleBackspaceIconClick}
              ref={backspaceBtn}
            >
              <Styled.BackspaceIcon />
            </Styled.IconContainer>
          </Styled.Row>
        ) : (
          <Styled.Row gap={0.4} key={i}>
            {keyRow.map((key, i) => {
              return <Key key={i} letter={key} />;
            })}
          </Styled.Row>
        )
      )}
      <Styled.Spacebar
        onAnimationEnd={() => setFlash(false)}
        flash={key === 'spacebar' || keyDown === ' ' ? flash : false}
        ref={spacebarBtn}
        tabIndex={0}
        onClick={handleSpacebar}
      />
    </Styled.Keyboard>
  );
};

export default Keyboard;
