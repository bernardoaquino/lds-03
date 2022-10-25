import styled, { css } from 'styled-components';

import { getGridSize } from '../../../utils/grid';

type IOption = {
  active: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const OptionList = styled.div`
  max-width: 100%;
  overflow-x: scroll;
`

export const Option = styled.div<IOption>`
  padding: ${getGridSize(2.5)};

  ${(props) => props.active && css`
    border-bottom: ${getGridSize(1)} solid ${(props) => props?.theme?.color?.brand?.pure}; 
  `};
`