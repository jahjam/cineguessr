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
  flex-wrap: wrap;
`;
