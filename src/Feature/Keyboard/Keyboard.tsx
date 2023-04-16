import * as Styled from './styles';

import Key from '../../Components/Key/Key';

import InputContext from '../../store/input-context';
import GameContext from '../../store/game-context';
import { useContext, useRef } from 'react';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const Keyboard = () => {
  const spacebarBtn = useRef<HTMLDivElement>(null);
  const backspaceBtn = useRef<HTMLDivElement>(null);
  const returnBtn = useRef<HTMLDivElement>(null);

  const inputContext = useContext(InputContext);
  const gameContext = useContext(GameContext);

  const { input, handleSetInput } = inputContext;
  const { handleSetGuess } = gameContext;

  const handleBackspaceIconClick = () => {
    handleSetInput('Backspace');
    backspaceBtn.current?.blur();
  };

  const handleSpacebar = () => {
    handleSetInput('Spacebar');
    spacebarBtn.current?.blur();
  };

  const handleReturnIconClick = () => {
    handleSetInput('Enter');
    returnBtn.current?.blur();
  };

  return (
    <Styled.Keyboard direction="column">
      {KEYS.map((keyRow, i) =>
        i === 2 ? (
          <Styled.Row gap={0.4} key={i}>
            <Styled.IconContainer
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
        ref={spacebarBtn}
        tabIndex={0}
        onClick={handleSpacebar}
      />
    </Styled.Keyboard>
  );
};

export default Keyboard;
