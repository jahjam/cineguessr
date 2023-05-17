import styled, { css, keyframes } from 'styled-components';
import { flex, flashKF } from '../../styled-utils/mixins';

interface Props {
  readonly flash: boolean;
}

export const Key = styled.button<Props>`
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

  ${({ flash }) =>
    flash
      ? css`
          animation: ${flashKF} 0.4s alternate;
          animation-iteration-count: 2;
        `
      : css`
          animation: none;
        `};

  &:hover {
    background-color: var(--secondary-theme-color);
    color: var(--black-theme-color);

    transform: scale(110%);
  }

  & span {
    font-size: 1.8rem;
  }
`;
