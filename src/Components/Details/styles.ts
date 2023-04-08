import styled from 'styled-components';
import { flex } from '../styled-utils/mixins';
import { ReactComponent as ClapperboardIconSVG } from '../../assets/clapperboard.svg';

export const Container = styled.section`
  margin-top: 1rem;
  height: 10rem;
  width: 100%;

  padding: 2rem;

  ${flex}
`;

export const Hint = styled.h2`
  font-size: 2.2rem;
  text-decoration: underline;

  cursor: pointer;
`;

export const Data = styled.div`
  width: 100%;
  padding: 0.8rem;
  border: var(--primary-theme-border);
  border-radius: var(--primary-theme-border-radius);

  ${flex}

  & span {
    font-size: 1.2rem;
    align-self: flex-start;
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
