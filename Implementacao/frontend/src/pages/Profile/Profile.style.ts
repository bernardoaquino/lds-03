import styled from 'styled-components';
import { WidthDelimiter } from '../../utils/mixins';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: ${(props) => props.theme.grid(10)} ${(props) => props.theme.grid(4)};
`;

export const CardWrapper = styled.div`
  height: 100%;
  width: 100%;
`