import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  color: ${(props) => props?.theme?.color?.neutral?.[100]};
  font-size: ${(props) => props.theme.typography.fontSize[16]};
  margin-bottom: ${(props) => props.theme.grid(1)};
`

export const TextField = styled.input`
  padding: ${(props) => props.theme.grid(2)};
  border: 1px solid ${(props) => props.theme.color.neutral[75]};
  border-radius: ${(props) => props.theme.grid(.5)};
`;