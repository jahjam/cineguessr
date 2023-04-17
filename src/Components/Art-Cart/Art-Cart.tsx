import * as Styled from './styles';

import useSVG from '../../hooks/useSVG';

type Props = {
  svgString: string;
};

const ArtCard = ({ svgString }: Props) => {
  const svgWrapperRef = useSVG(svgString);

  return <Styled.Container ref={svgWrapperRef}></Styled.Container>;
};

export default ArtCard;
