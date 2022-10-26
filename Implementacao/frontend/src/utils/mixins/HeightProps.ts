import { css } from 'styled-components';

type HeightProps = {
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

export default css<HeightProps>`
  min-height: ${({ minHeight }) => minHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  height: ${({ height }) => height};
`;
