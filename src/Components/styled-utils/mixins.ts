import { css } from 'styled-components';

interface FlexProps {
  readonly align?: string;
  readonly justify?: string;
  readonly gap?: number;
}

export const flex = css<FlexProps>`
  display: flex;
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  gap: ${({ gap }) => gap || 2}rem;
`;
