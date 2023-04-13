import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';

export const Container = styled.div`
  height: 4rem;
  width: 2.8rem;

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${flex}
  // have to overwrite inherited from above
  justify-content: center;

  & span {
    margin-top: 0.3rem;
    font-size: 2.8rem;
  }
`;
