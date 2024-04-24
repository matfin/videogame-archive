import React from 'react';

export interface Props<T> {
  className?: string;
  as?: string;
  data: T[];
  container?: React.ElementType;
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}

const GenericList = <T extends {}>({
  className,
  as = 'ul',
  data,
  keyExtractor,
  renderItem: RenderItem,
  container: Wrapper = 'div',
}: Props<T>): React.ReactElement => (
  <Wrapper as={as} className={className}>
    {data.map((item: T) => (
      <RenderItem key={keyExtractor(item)} {...item} />
    ))}
  </Wrapper>
);

export default GenericList;
