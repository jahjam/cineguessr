import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { flex, openKF, scaleKF, rotateKF } from '../../styled-utils/mixins';

export const Container = styled.section`
  height: 10rem;
  width: 36rem;

  padding: 2rem;

  ${flex}
`;

export const Hint = styled.h2`
  font-size: 2.2rem;
  text-decoration: underline;

  cursor: pointer;

  &:hover {
    color: var(--primary-theme-color);
  }
`;

export const Data = styled.div`
  width: 100%;
  height: 10rem;

  perspective: 150rem;

  position: relative;
`;

const Side = css`
  width: 100%;
  height: 100%;
  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);
  position: absolute;
  top: 0;
  right: 0;

  backface-visibility: hidden;
`;

export const DataFront = styled(motion.div)`
  ${Side}
  padding: 0.8rem;
  ${flex}

  & span {
    font-size: 1.4rem;
    align-self: flex-start;

    letter-spacing: 0.02rem;
  }
`;

export const DataBack = styled(motion.div)`
  ${Side}
  ${flex}
`;

export const Score = styled.div`
  position: relative;
  margin: -1rem;

  & span {
    position: absolute;
    left: 45%;
    top: 50%;

    font-size: 2.2rem;
  }
`;

interface Props {
  readonly open: boolean;
}

export const ClapperboardIcon = styled.div<Props>`
  margin: 1rem;
  margin-top: 2.5rem;
  height: 4.8rem;
  width: 8rem;
  position: relative;

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${({ open }) =>
    open
      ? css`
          animation-name: ${rotateKF};
          transform-origin: left;
          animation-duration: 0.25s;
          animation-timing-function: ease-out;
          animation-iteration-count: 2;
          animation-direction: alternate;
        `
      : css`
          animation: none;
        `};

  & span {
    position: absolute;
    left: 45%;
    top: 32%;

    ${({ open }) =>
      open
        ? css`
            animation-name: ${scaleKF};
            transform-origin: left;
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-iteration-count: 2;
            animation-direction: alternate;
          `
        : css`
            animation: none;
          `};
  }

  & > div:nth-child(2) {
    height: 1.4rem;
    width: 1.4rem;
    border: var(--primary-theme-border);
    border-radius: 50%;
    position: absolute;
    left: -0.2rem;
    top: -0.7rem;
    background: none;
    background-color: #111;

    z-index: 1000;
  }

  & > div {
    background: repeating-linear-gradient(
      135deg,
      #111 0%,
      #111 5%,
      #fff 5%,
      #fff 10%
    );
    height: 1rem;
    width: 8rem;
    position: absolute;
    left: -0.2rem;
    top: -0.2rem;
    border: var(--primary-theme-border);
    border-radius: var(--primary-theme-border-radius);
  }

  & > div:nth-of-type(1) {
    background: repeating-linear-gradient(
      -135deg,
      #fff 0%,
      #fff 5%,
      #111 5%,
      #111 10%
    );
    top: -1rem;

    ${({ open }) =>
      open
        ? css`
            animation-name: ${openKF};
            transform-origin: left;
            animation-duration: 0.25s;
            animation-timing-function: ease-out;
            animation-iteration-count: 2;
            animation-direction: alternate;
          `
        : css`
            animation: none;
          `};
  }
`;

export const GuessTime = styled.span`
  display: flex;
  flex-direction: column;
`