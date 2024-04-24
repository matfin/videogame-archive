import React from 'react';

import { SelectDropdown } from './InputSelect.style';

export interface Props<T> {
  className?: string;
  options: T[];
  value?: string;
  container?: React.ElementType;
  keyExtractor: (item: T) => string;
  labelExtractor: (item: T) => string;
  valueExtractor: (item: T) => string;
  onChange?: (e: React.FormEvent<HTMLSelectElement>) => void;
}

const InputSelect = <T extends {}>({
  className,
  options,
  container: Wrapper = SelectDropdown,
  value,
  keyExtractor,
  labelExtractor,
  valueExtractor,
  onChange,
}: Props<T>): React.ReactElement => (
  <Wrapper as="select" className={className} onChange={onChange} value={value}>
    {options.map(
      (item: T): React.ReactElement => (
        <option key={keyExtractor(item)} value={valueExtractor(item)}>
          {labelExtractor(item)}
        </option>
      ),
    )}
  </Wrapper>
);

export default InputSelect;
