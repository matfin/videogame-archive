import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ListItem, Props } from './ListItem';

interface Game {
  id: string;
  name: string;
  rating: number;
}

const defaultProps: Props<Game> = {
  item: { id: '1', name: 'Test one', rating: 8 },
  onClick: jest.fn(),
  labelExtractor: jest.fn(),
};

describe('ListItem', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<ListItem {...defaultProps} />)).not.toThrow();
    expect(() =>
      render(<ListItem {...defaultProps} container="div" />),
    ).not.toThrow();
  });

  it('renders the correct label', (): void => {
    render(
      <ListItem
        {...defaultProps}
        labelExtractor={(item: Game) => `${item.name} - ${item.rating}`}
      />,
    );

    expect(screen.getByText('Test one - 8')).not.toBeNull();
  });

  it('executes a callback on click', (): void => {
    const spyOnClick = jest.fn();

    render(
      <ListItem
        {...defaultProps}
        onClick={spyOnClick}
        labelExtractor={(item: Game) => item.name}
      />,
    );
    const item = screen.getByText('Test one');

    fireEvent.click(item);

    expect(spyOnClick).toHaveBeenCalledTimes(1);
    expect(spyOnClick).toHaveBeenCalledWith({
      id: '1',
      name: 'Test one',
      rating: 8,
    });
  });
});
