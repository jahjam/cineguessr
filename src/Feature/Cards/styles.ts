import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';

export const Cards = styled.section`
  height: auto;
  width: 32rem;

  margin: 0 2rem;
  padding: 2rem;
  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${flex}
  flex-wrap: wrap;
`;
