import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';

export const Input = styled.input`
  height: 5rem;
  width: 3rem;

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);
  background-color: transparent;

  text-align: center;

  color: inherit;
  font-family: inherit;
  caret-color: transparent;
  font-size: 3.2rem;
`;
