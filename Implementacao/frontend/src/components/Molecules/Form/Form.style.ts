import styled from 'styled-components';

/** Utils */
import { getGridSize } from '../../../utils/grid';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  > :not(:first-child) {
    margin-top: ${getGridSize(2)};
  }
`