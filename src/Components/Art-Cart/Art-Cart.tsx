import * as Styled from './styles';

import useSVG from '../../hooks/useSVG';

type Props = {
  svgString: string;
};

const ArtCard = ({ svgString }: Props) => {
  const svgWrapperRef = useSVG(svgString);

  return (
    <Styled.Container>
      <Styled.BackContainer
        initial={{ rotateY: 180 }}
        animate={{ rotateY: 0, transition: { delay: 2, duration: 1 } }}
      >
        <span>Cineguessr</span>
      </Styled.BackContainer>
      <Styled.FrontContainer
        initial={{ rotateY: 180 }}
        animate={{
          rotateY: 0,
          transition: { delay: 2, duration: 1 },
        }}
        ref={svgWrapperRef}
      ></Styled.FrontContainer>
    </Styled.Container>
  );
};

export default ArtCard;
