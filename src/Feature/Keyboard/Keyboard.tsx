import * as Styled from './styles';

import Key from '../../Components/Key/Key';

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

type KeyboardProps = {
  keyDown: string;
};

const Keyboard = ({ keyDown }: KeyboardProps) => {
  console.log(keyDown);

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
            <Styled.IconContainer tabIndex={0}>
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
      <Styled.Spacebar tabIndex={0} />
    </Styled.Keyboard>
  );
};

export default Keyboard;
