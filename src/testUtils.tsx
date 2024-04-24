import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '@state/store';

export const renderWithProviderStore = (children: React.ReactElement) =>
  render(<Provider store={store}>{children}</Provider>);
