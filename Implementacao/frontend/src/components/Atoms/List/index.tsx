import React from 'react';

/** Style */
import * as El from './List.style';

export type ListProps = {
  keyPrefix?: string;
  columns?: number | number[];
  items: any[];
  render: Function;
}

const List = ({
  keyPrefix = '',
  columns = 1,
  items,
  render
}: ListProps) => {
  return (
    <El.List columns={columns}>
      {items?.map((item: any, index: number) => (
        <El.Li key={`${keyPrefix && keyPrefix + '-'}${index}`}>
          {render(item, index)}
        </El.Li>
      ))}
    </El.List>
  )
}

export default List;