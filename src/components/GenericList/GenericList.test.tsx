import React from 'react';
import { render, screen } from '@testing-library/react';

import GenericList, { Props } from './GenericList';

const defaultProps: Props<string> = {
  data: [],
  keyExtractor: (id: string) => id,
  renderItem: () => <></>,
};

interface GameAuthor {
  id: string;
  name: string;
}

const Author = ({ name }: GameAuthor): React.ReactNode => <span>{name}</span>;

describe('GenericList', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<GenericList {...defaultProps} />)).not.toThrow();
  });

  it('renders a list of items', (): void => {
    const gameAuthors: GameAuthor[] = [
      { id: '1', name: 'Ed Boon' },
      { id: '2', name: 'John Carmack' },
      { id: '3', name: 'Shigeryu Miyamoto' },
    ];

    render(
      <GenericList
        data={gameAuthors}
        keyExtractor={(author: GameAuthor) => author.id}
        renderItem={Author}
      />,
    );

    expect(screen.getByText('Ed Boon')).not.toBeNull();
    expect(screen.getByText('John Carmack')).not.toBeNull();
    expect(screen.getByText('Shigeryu Miyamoto')).not.toBeNull();
  });
});
