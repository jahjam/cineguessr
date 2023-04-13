import * as Styled from './styles';
import { LAUNCH_DATE } from '../../config';
import { formatDistanceToNowStrict } from 'date-fns';

const Header = () => {
  const numberOfDaysSinceLaunch = formatDistanceToNowStrict(LAUNCH_DATE, {
    unit: 'day',
  }).match(/([0-9])/g);

  return (
    <Styled.Header justify="space-between">
      <Styled.InfoIcon tabIndex={0} />
      <Styled.HeaderContainer direction="column" gap={0.4}>
        <Styled.Title>CineGuessr</Styled.Title>
        <Styled.SubTitle>Day {numberOfDaysSinceLaunch}</Styled.SubTitle>
      </Styled.HeaderContainer>
      <Styled.SettingsIcon tabIndex={0} />
    </Styled.Header>
  );
};

export default Header;
