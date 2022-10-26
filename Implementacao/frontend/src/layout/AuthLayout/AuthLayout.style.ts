import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Children = styled.div`
  padding: 0 ${(props) => props.theme.grid(4)};
`