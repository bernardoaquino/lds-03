import styled from 'styled-components';

export const Transaction = styled.div`
  padding: ${(props) => props.theme.grid(3)};
  border: 1px solid ${(props) => props.theme.color.neutral[75]};
  border-radius: ${(props) => props.theme.grid(1)};
`

export const DataEntry = styled.p`
  color: ${(props) => props.theme.color.neutral[75]};
  font-size: ${(props) => props.theme.typography.fontSize[14]};
  font-weight: ${(props) => props.theme.typography.fontWeight.light};

  > b {
    color: ${(props) => props.theme.color.neutral[100]};
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  }
`;