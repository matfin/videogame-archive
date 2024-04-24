import styled from 'styled-components';

import { boxShadow, colours, fontSize, fontWeight } from '@styles/vars';

export const Container = styled.div`
  padding: 0.5rem;
  background-color: ${colours.tertiary};
  box-shadow: ${boxShadow};
`;

export const Title = styled.h2`
  font-size: ${fontSize.subHeading};
`;

export const PublisherName = styled.h3`
  font-size: ${fontSize.text};
  font-weight: ${fontWeight.normal};
`;

export const GamesList = styled.ul`
  padding: 0;
`;

export const GamePill = styled.li`
  display: inline-block;
  font-size: ${fontSize.small}rem;
  background-color: ${colours.tertiary};
  border: 1px solid ${colours.border};
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  margin: 0.5rem 0.25rem 0 0;
`;
