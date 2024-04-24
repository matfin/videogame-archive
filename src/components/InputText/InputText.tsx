import React from 'react';

import { Container, InputBox, Label } from './InputText.style';

export interface Props {
  id: string;
  label?: string;
  value?: string;
  placeHolder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const TextInput = ({
  id,
  label,
  value,
  placeHolder,
  onBlur,
  onChange,
  onFocus,
}: Props): React.ReactElement => (
  <Container>
    {label && <Label htmlFor={id}>{label}</Label>}
    <InputBox
      id={id}
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </Container>
);

export default TextInput;
