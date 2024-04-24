import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import InputText, { Props } from './InputText';

const defaultProps: Props = {
  id: 'test',
  label: 'Test input',
  placeHolder: 'Test placeholder',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  onFocus: jest.fn(),
};

describe('<InputText />', (): void => {
  it('renders the component', (): void => {
    expect(() => render(<InputText {...defaultProps} />)).not.toThrow();
  });

  it('renders the correct label and placeholder', (): void => {
    render(<InputText {...defaultProps} />);

    expect(screen.getByPlaceholderText('Test placeholder')).not.toBeNull();
    expect(screen.getByLabelText('Test input')).not.toBeNull();
  });

  it('executes a callback on blur', (): void => {
    const spyOnBlur = jest.fn();
    render(<InputText {...defaultProps} onBlur={spyOnBlur} />);
    const input: HTMLInputElement = screen.getByLabelText('Test input');

    fireEvent.blur(input);

    expect(spyOnBlur).toHaveBeenCalledTimes(1);
  });

  it('executes the correct callback on change', (): void => {
    const spyOnChange = jest.fn();
    render(<InputText {...defaultProps} onChange={spyOnChange} />);
    const input: HTMLInputElement = screen.getByLabelText('Test input');

    fireEvent.change(input, { target: { value: 'Text change' } });

    expect(spyOnChange).toHaveBeenCalledTimes(1);
    expect(screen.getByDisplayValue('Text change')).not.toBeNull();
  });

  it('executes a callback on focus', (): void => {
    const spyOnFocus = jest.fn();
    render(<InputText {...defaultProps} onFocus={spyOnFocus} />);
    const input: HTMLInputElement = screen.getByLabelText('Test input');

    fireEvent.focus(input);

    expect(spyOnFocus).toHaveBeenCalledTimes(1);
  });
});
