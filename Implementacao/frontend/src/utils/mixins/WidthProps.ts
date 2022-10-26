import { css } from 'styled-components';

type WidthProps = {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

export default css<WidthProps>`
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  width: ${({ width }) => width};
`;
