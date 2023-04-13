import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';

export const Key = styled.button`
  height: 3rem;
  width: 3rem;

  display: inline-block;

  border: var(--primary-theme-border);
  border-radius: 50%;

  cursor: pointer;

  background-color: var(--black-theme-color);
  color: var(--white-theme-color);
  font-family: inherit;

  ${flex}

  &:hover {
    background-color: var(--secondary-theme-color);
    color: var(--black-theme-color);

    transform: scale(110%);
  }

  & span {
    margin-top: 0.3rem;
    font-size: 1.8rem;
  }
`;
