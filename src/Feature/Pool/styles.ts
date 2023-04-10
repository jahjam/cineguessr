import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';

export const Container = styled.section`
  width: 30rem;
  height: auto;
  margin: 0 auto;
  padding: 1.4rem;

  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${flex}

  & div {
    height: 5rem;
    width: 3rem;

    border: var(--primary-theme-border);
    border-radius: var(--primary-theme-border-radius);

    ${flex}
    // have to overwrite inherited from above
    justify-content: center;

    & span {
      font-size: 3.2rem;
    }
  }
`;
