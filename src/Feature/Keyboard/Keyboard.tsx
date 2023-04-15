import * as Styled from './styles';

import Key from '../../Components/Key/Key';

import InputContext from '../../store/input-context';
import { useContext, useRef } from 'react';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const Keyboard = () => {
  const spacebar = useRef<HTMLDivElement>(null);

  const inputContext = useContext(InputContext);

  const { handleSetInput } = inputContext;

  const handleBackspaceIconClick = () => {
    handleSetInput('Backspace');
  };

  const handleSpacebar = () => {
    handleSetInput('Spacebar');

    spacebar.current?.blur();
  };

  return (
    <Styled.Keyboard direction="column">
      {KEYS.map((keyRow, i) =>
        i === 2 ? (
          <Styled.Row gap={0.4} key={i}>
            <Styled.IconContainer tabIndex={0}>
              <Styled.ReturnIcon />
            </Styled.IconContainer>
            {keyRow.map((key, i) => {
              return <Key key={i} letter={key} />;
            })}
            <Styled.IconContainer
              tabIndex={0}
              onClick={handleBackspaceIconClick}
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
      <Styled.Spacebar ref={spacebar} tabIndex={0} onClick={handleSpacebar} />
    </Styled.Keyboard>
  );
};

export default Keyboard;
