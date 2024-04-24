import styled from 'styled-components';
import { colours, fontSize } from '@styles/vars';

export const Container = styled.div`
  display: grid;
  width: 100vw;
  grid-template:
    'header header header'
    '. . .'
    '. main .'
    / 1fr minmax(50rem, 60rem) 1fr;
  grid-template-rows: 8rem 1rem auto;
`;

export const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colours.tertiary};
`;

export const Results = styled.main`
  grid-area: main;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const NoResultsHeading = styled.h1`
  color: ${colours.border};
  font-size: ${fontSize.heading}rem;
`;
