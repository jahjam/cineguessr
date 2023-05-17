import { css, keyframes } from 'styled-components';

interface FlexProps {
  readonly align?: string;
  readonly justify?: string;
  readonly gap?: number;
  readonly direction?: string;
}

export const flex = css<FlexProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  gap: ${({ gap }) => gap || 2}rem;
`;

export const flashKF = keyframes`
  from {
    transform: scale(100%);
  }

  to {
    transform: scale(110%);
    background-color: var(--secondary-theme-color);
    color: var(--black-theme-color);
  }
`;

export const flashSpacebarKF = keyframes`
  from {
    transform: scale(100%);
  }

  to {
    transform: scale(102%);
    background-color: var(--secondary-theme-color);
    color: var(--black-theme-color);
  }
`;

export const openKF = keyframes`
  to {
    transform: rotate(-20deg);
  }
`;
