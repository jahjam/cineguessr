import { motion } from 'framer-motion';
import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';
import { ReactComponent as Close } from '../../assets/close.svg';

export const Modal = styled(motion.section)`
  height: 100vh;
  width: 100%;

  position: fixed;
  top: 0;
  right: 0;

  backdrop-filter: blur(0.2rem);
  background-color: rgba(0, 0, 0, 0.6);

  ${flex};

  z-index: 2000;
`;

export const Container = styled.div`
  height: auto;
  width: auto;
  max-width: 80%;

  padding: 2rem;

  border: var(--primary-theme-border);

  background-color: var(--black-theme-color);

  position: relative;

  ${flex}
`;

export const CloseIcon = styled(Close)`
  height: 2.6rem;
  width: 2.6rem;

  color: var(--white-theme-color);

  position: absolute;
  top: 2rem;
  right: 2rem;

  cursor: pointer;

  transition: all 0.1s ease-in;

  &:hover {
    transform: scale(110%);
  }
`;
