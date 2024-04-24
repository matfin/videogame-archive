import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import InputSelect, { Props } from './InputSelect';

interface Option {
  name: string;
  value: string;
}

const defaultProps: Props<Option> = {
  options: [
    { name: 'One', value: 'one' },
    { name: 'Two', value: 'two' },
    { name: 'Three', value: 'three' },
    { name: 'Four', value: 'four' },
  ],
  keyExtractor: (item: Option): string => item.value,
  labelExtractor: (item: Option): string => item.name,
  valueExtractor: (item: Option): string => item.value,
  onChange: jest.fn(),
};

describe('<InputSelect />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<InputSelect {...defaultProps} />)).not.toThrow();
    expect(() =>
      render(<InputSelect {...defaultProps} container="div" />),
    ).not.toThrow();
  });

  it('renders the component with the correct options', (): void => {
    render(<InputSelect {...defaultProps} />);

    expect(screen.getByText('One')).not.toBeNull();
    expect(screen.getByText('Two')).not.toBeNull();
    expect(screen.getByText('Three')).not.toBeNull();
    expect(screen.getByText('Four')).not.toBeNull();
  });

  it('executes a callback on change', (): void => {
    const spyOnChange = jest.fn();
    render(<InputSelect {...defaultProps} onChange={spyOnChange} />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, {
      target: { value: 'two' },
    });

    expect(spyOnChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('two');
  });
});
