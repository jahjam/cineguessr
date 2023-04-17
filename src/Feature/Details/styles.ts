import styled from 'styled-components';
import { flex } from '../../styled-utils/mixins';
import { ReactComponent as ClapperboardIconSVG } from '../../assets/clapperboard.svg';

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
  padding: 0.8rem;
  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${flex}

  & span {
    font-size: 1.4rem;
    align-self: flex-start;

    letter-spacing: 0.02rem;
  }
`;

export const Score = styled.div`
  position: relative;
  margin: -1rem;

  & span {
    position: absolute;
    left: 45%;
    top: 48%;

    font-size: 2rem;
  }
`;

export const ClapperboardIcon = styled(ClapperboardIconSVG)`
  height: 8.5rem;
`;
