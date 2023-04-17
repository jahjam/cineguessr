import * as Styled from './styles';

import ArtCard from '../../Components/Art-Cart/Art-Cart';
import { useContext } from 'react';
import GameContext, { Film } from '../../store/game-context';

const Cards = () => {
  const gameContext = useContext(GameContext);

  const { film } = gameContext;

  return (
    <Styled.Cards justify="flex-start" gap={2}>
      {film.cards.map((card, i) => (
        <ArtCard key={i} svgString={card.svg} />
      ))}
    </Styled.Cards>
  );
};

export default Cards;
