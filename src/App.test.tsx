import React from 'react';
import { renderWithProviderStore } from './testUtils';

import App from './App';

describe('<App />', (): void => {
  it('should render the component', (): void => {
    expect(() => renderWithProviderStore(<App />)).not.toThrow();
  });
});
