import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Game, Props } from './Game';

const defaultProps: Props = {
  name: 'Doom',
  publisherName: 'ID Software',
  platforms: [
    { id: '1', name: 'Snes' },
    { id: '2', name: 'PlayStation' },
  ],
};

describe('<Repo />', (): void => {
  it('renders the name and the platforms', (): void => {
    render(<Game {...defaultProps} />);

    expect(screen.getByText('ID Software')).not.toBeNull();
    expect(screen.getByText('Doom')).not.toBeNull();
    expect(screen.getByText('Snes')).not.toBeNull();
    expect(screen.getByText('PlayStation')).not.toBeNull();
  });

  it('does not render any platforms', (): void => {
    render(<Game {...defaultProps} platforms={undefined} />);

    expect(screen.getByText('ID Software')).not.toBeNull();
    expect(screen.getByText('Doom')).not.toBeNull();
    expect(screen.queryByText('Snes')).toBeNull();
  });

  it('executes a callback on item click', (): void => {
    render(<Game {...defaultProps} />);

    const item = screen.getByText('Snes');
    fireEvent.click(item);
  });
});
