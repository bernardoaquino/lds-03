import styled from 'styled-components';
import { WidthDelimiter } from '../../utils/mixins';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 ${(props) => props.theme.grid(4)};
`;

export const CardWrapper = styled.div`
  ${(props) => WidthDelimiter(props.theme.grid(60))}
`