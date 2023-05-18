import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';

export const DetailsModal = styled.div`
  ${flex}
  & h3 {
    font-size: 2.6rem;
  }

  & span:nth-child(3) {
    font-size: 2rem;
  }

  & ul {
    padding-left: 1rem;
    & li {
      font-size: 1.8rem;
    }
  }

  & p {
    font-size: 1.8rem;
    & span {
      font-size: 2.2rem;
      text-decoration: underline;
    }

    & a,
    a:link {
      color: var(--primary-theme-color);
    }

    & a:hover,
    a:active {
      color: var(--tertiary-theme-color);
    }
  }
`;
