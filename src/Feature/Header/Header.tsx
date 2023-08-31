import * as Styled from './styles';
import { LAUNCH_DATE } from '../../config';
import { formatDistanceToNowStrict } from 'date-fns';

type Props = {
  handleToggleDetailsModal: () => void;
};

const Header = ({ handleToggleDetailsModal }: Props) => {
  const numberOfDaysSinceLaunch = formatDistanceToNowStrict(LAUNCH_DATE, {
    unit: 'day',
  }).match(/([0-9])/g);

  const handleOpenModal = () => {
    handleToggleDetailsModal();
  };

  return (
    <Styled.Header justify="space-between">
      <Styled.InfoIcon tabIndex={0} onClick={handleOpenModal} />
      <Styled.HeaderContainer direction="column" gap={0.4}>
        <Styled.Title>CineGuessr</Styled.Title>
        <Styled.SubTitle>Day {numberOfDaysSinceLaunch}</Styled.SubTitle>
      </Styled.HeaderContainer>
      <Styled.PlaceHolderIcon  />
    </Styled.Header>
  );
};

export default Header;
