import styled from 'styled-components';
import { flex } from '../styled-utils/mixins';

export const Cards = styled.section`
  height: auto;

  margin: 1rem 2rem 2rem 2rem;
  padding: 2rem;
  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${flex}
  flex-wrap: wrap;

  & div {
    height: 8rem;
    width: 8rem;

    background-color: white;

    border-radius: var(--primary-theme-border-radius);
  }
`;
