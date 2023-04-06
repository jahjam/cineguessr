import * as Styled from './styles';
import { LAUNCH_DATE } from '../../config';
import { formatDistanceToNowStrict } from 'date-fns';

const Header = () => {
  const numberOfDaysSinceLaunch = formatDistanceToNowStrict(LAUNCH_DATE, {
    unit: 'day',
  }).slice(0, 1);

  return (
    <Styled.Header justify="space-between">
      <Styled.InfoIcon />
      <Styled.HeaderContainer direction="column" gap={0.4}>
        <Styled.Title>CineGuessr</Styled.Title>
        <Styled.SubTitle>Day {numberOfDaysSinceLaunch}</Styled.SubTitle>
      </Styled.HeaderContainer>
      <Styled.SettingsIcon />
    </Styled.Header>
  );
};

export default Header;
