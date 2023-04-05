import styled from 'styled-components';
import { flex } from '../styled-utils/mixins';

export const Header = styled.header`
  background-color: var(--black-theme-color);
  height: 8rem;

  ${flex}
`;

export const Title = styled.h1`
  font-family: var(--title-theme-font-family);
  color: var(--white-theme-color);
`;
