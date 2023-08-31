import styled, { css } from 'styled-components';

import { ReactComponent as ReturnIconSVG } from '../../assets/keys/return.svg';
import { ReactComponent as BackspaceIconSVG } from '../../assets/keys/backspace.svg';
import { flex, flashKF, flashSpacebarKF } from '../../styled-utils/mixins';

interface Props {
  readonly flash: boolean;
}

const iconStyles = css`
  height: 1.4rem;
  width: 1.4rem;
  color: var(--white-theme-color);
`;

export const IconContainer = styled.div<Props>`
  height: 3rem;
  width: 3rem;

  border: var(--primary-theme-border);
  border-radius: 50%;

  margin: 0 0.2rem;

  ${flex}

  cursor: pointer;

  &:nth-child(1) {
    background-color: var(--primary-theme-color);
  }

  &:nth-child(9) {
    background-color: var(--tertiary-theme-color);
  }

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
    transform: scale(110%);
  }
`;

export const Keyboard = styled.section`
  height: auto;
  width: 30rem;

  margin-bottom: 2rem;

  ${flex}
  gap: 0.2rem;
`;

export const ReturnIcon = styled(ReturnIconSVG)`
  ${iconStyles}
`;

export const BackspaceIcon = styled(BackspaceIconSVG)`
  ${iconStyles}
`;

export const Spacebar = styled.div<Props>`
  height: 2.8rem;
  width: 22rem;

  margin-top: 0.8rem;

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  cursor: pointer;

  ${({ flash }) =>
    flash
      ? css`
          animation: ${flashSpacebarKF} 0.4s alternate;
          animation-iteration-count: 2;
        `
      : css`
          animation: none;
        `};

  &:hover {
    background-color: var(--secondary-theme-color);
    color: var(--black-theme-color);

    transform: scale(102%);
  }
`;

export const Row = styled.div`
  height: 4rem;

  ${flex}
`;
