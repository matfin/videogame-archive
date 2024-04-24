import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Games, Props } from './Games';

const defaultProps: Props = {
  filter: {},
  games: [
    {
      id: '1',
      name: 'Duke Nukem',
      publisherName: '3D Realms',
      platforms: [{ id: '1', name: 'PC' }],
    },
    {
      id: '2',
      name: 'Doom',
      publisherName: 'ID Software',
      platforms: [{ id: '2', name: 'Jaguar' }],
    },
  ],
  platformOptions: [
    { name: 'Snes', value: 'Snes' },
    { name: 'PlayStation', value: 'PlayStation' },
    { name: 'XBox', value: 'XBox' },
  ],
  onFilterChange: jest.fn(),
};

describe('<Games />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<Games {...defaultProps} />)).not.toThrow();
  });

  it('renders a list of games', (): void => {
    render(<Games {...defaultProps} />);

    expect(screen.getByText('3D Realms')).not.toBeNull();
    expect(screen.getByText('Duke Nukem')).not.toBeNull();
    expect(screen.getByText('PC')).not.toBeNull();

    expect(screen.getByText('Doom')).not.toBeNull();
    expect(screen.getByText('ID Software')).not.toBeNull();
    expect(screen.getByText('Jaguar')).not.toBeNull();
  });

  it('renders a message when there are no game results', (): void => {
    render(<Games {...defaultProps} games={[]} />);

    expect(screen.getByText('No results')).not.toBeNull();
  });

  it('sets the filter on publisher name input box text change', (): void => {
    const spyOnFilterChange = jest.fn();
    render(<Games {...defaultProps} onFilterChange={spyOnFilterChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'ID' } });

    expect(spyOnFilterChange).toHaveBeenCalledTimes(1);
    expect(spyOnFilterChange).toHaveBeenCalledWith({
      platform: undefined,
      publisherName: 'ID',
    });
  });

  it('sets the filter based on platform select change', (): void => {
    const spyOnFilterChange = jest.fn();
    render(<Games {...defaultProps} onFilterChange={spyOnFilterChange} />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'Snes' } });

    expect(spyOnFilterChange).toHaveBeenCalledTimes(1);
    expect(spyOnFilterChange).toHaveBeenCalledWith({
      platform: 'Snes',
      publisherName: undefined,
    });
  });
});
