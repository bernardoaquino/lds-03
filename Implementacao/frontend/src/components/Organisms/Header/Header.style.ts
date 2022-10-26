import styled from 'styled-components';

/** Utils */
import { getGridSize } from '../../../utils/grid';

export const Header = styled.header`
  padding: ${getGridSize(3)};
`;

export const Title = styled.p`
  color: ${(props) => props?.theme?.color?.brand?.pure};
  font-size: ${(props) => props.theme.typography.fontSize[48]};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
`

export const OptionsContainer = styled.div`
  align-items: center;
  display: flex;

  & > :not(:first) {
    margin-left: ${getGridSize(1.5)};
  }
`;