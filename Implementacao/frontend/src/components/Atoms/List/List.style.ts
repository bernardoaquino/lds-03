import styled, { css } from 'styled-components';

type StylingProps = {
  columns: number | number[];
}

const getColumnAmount = (columns: number | number[], isMobile = false) => {
  if (isMobile) {
    return Array.isArray(columns) ? columns?.[1] || columns[0] : columns;
  }

  return Array.isArray(columns) ? columns[0] : columns;
}

const ColumnsStyling = css<StylingProps>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${getColumnAmount(props.columns)}, 1fr)`};
  grid-gap: ${(props) => props.theme.grid(3)};

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: ${(props) => `repeat(${getColumnAmount(props.columns, true)}, 1fr)`};
  }
`

export const List = styled.ul<StylingProps>`
  ${(props) => props.columns && ColumnsStyling}

  list-style: none;
  padding-inline-start: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
`;

export const Li = styled.li``;