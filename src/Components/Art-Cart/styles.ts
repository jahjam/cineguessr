import styled from 'styled-components';
import { motion } from 'framer-motion';
import { flex } from '../../styled-utils/mixins';

export const Container = styled.div`
  height: 7.9rem;
  width: 7.9rem;

  perspective: 150rem;

  position: relative;
`;

export const FrontContainer = styled(motion.div)`
  height: 100%;
  width: 100%;

  background-color: white;

  position: absolute;
  top: 0;
  right: 0;

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);
  backface-visibility: hidden;
`;

export const BackContainer = styled(motion.div)`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  right: 0;

  ${flex}

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  & span {
    font-family: var(--title-theme-font-family);
    font-size: 1.4rem;
    transform: scale(-1, 1);
  }
`;
