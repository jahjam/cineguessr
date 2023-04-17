import styled from 'styled-components';
import { ReactComponent as InfoIconSVG } from '../../assets/info.svg';
import { ReactComponent as SettingsIconSVG } from '../../assets/settings.svg';
import { flex } from '../../styled-utils/mixins';

export const Header = styled.header`
  width: 100%;
  background-color: var(--black-theme-color);
  height: 8rem;
  padding: 2rem;

  border-bottom: solid 0.2rem var(--white-theme-color);

  ${flex}
`;

export const Title = styled.h1`
  font-family: var(--title-theme-font-family);
  color: var(--white-theme-color);
`;

export const InfoIcon = styled(InfoIconSVG)`
  height: 3.2rem;
  color: var(--white-theme-color);

  cursor: pointer;

  &:hover {
    color: var(--primary-theme-color);
  }
`;

export const SettingsIcon = styled(SettingsIconSVG)`
  height: 3.2rem;
  color: var(--white-theme-color);

  cursor: pointer;

  &:hover {
    color: var(--primary-theme-color);
  }
`;

export const HeaderContainer = styled.div`
  ${flex}
`;

export const SubTitle = styled.span`
  font-size: 1.4rem;
  color: var(--white-theme-color);

  align-self: flex-end;
`;
