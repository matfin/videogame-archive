import styled from 'styled-components';

import { colours, fontSize } from '@styles/vars';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputBox = styled.input`
  flex-grow: 1;
  height: 3rem;
  padding: 0.5rem;
  border: 0;
  background-color: inherit;
  border-bottom: 0.125rem solid ${colours.border};

  &:focus {
    border-bottom: 0.125rem solid ${colours.primary};
  }

  &::placeholder {
    color: ${colours.border};
  }

  font-size: ${fontSize.subHeading}rem;
`;

export const Label = styled.label`
  flex: 0 1 1rem;
  font-size: ${fontSize.small}rem;
`;
