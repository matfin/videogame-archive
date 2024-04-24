import styled from 'styled-components';

import { colours } from '@styles/vars';

export const SelectDropdown = styled.select`
  height: 3rem;
  padding: 0.5rem;
  border: 0;
  background-color: inherit;
  border-bottom: 0.125rem solid ${colours.border};

  &:focus {
    border-bottom: 0.125rem solid ${colours.primary};
  }

  color: ${colours.border};
  font-size: 1.25rem;
`;
