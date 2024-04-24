import React, { useCallback } from 'react';

export interface Props<T> {
  as?: string;
  className?: string;
  item: T;
  container?: React.ElementType;
  onClick: (item: T) => void;
  labelExtractor: (item: T) => string;
}

export const ListItem = <T extends {}>({
  as = 'div',
  className,
  item,
  onClick,
  labelExtractor,
  container: Wrapper = 'div',
}: Props<T>): React.ReactElement => {
  const handleClick = useCallback((): void => {
    onClick(item);
  }, [item, onClick]);

  return (
    <Wrapper as={as} className={className} onClick={handleClick}>
      {labelExtractor(item)}
    </Wrapper>
  );
};
