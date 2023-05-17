import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  height: 4rem;
  width: 2.8rem;

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${flex}
  // have to overwrite inherited from above
  justify-content: center;

  & span {
    font-size: 2.8rem;
  }
`;
