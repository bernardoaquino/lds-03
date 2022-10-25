import { css } from 'styled-components';

const WidthDelimiter = (maxWidth: string) => css`
  max-width: ${maxWidth};
  width: 100%;
`;

export default WidthDelimiter;
