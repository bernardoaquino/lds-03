import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div``;

export const Name = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize[24]};
`;

export const Subtitle = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize[20]};
`;

export const DataEntry = styled.p`
  color: ${(props) => props.theme.color.neutral[75]};
  font-size: ${(props) => props.theme.typography.fontSize[14]};
  font-weight: ${(props) => props.theme.typography.fontWeight.light};

  > b {
    color: ${(props) => props.theme.color.neutral[100]};
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  }
`;

export const Card = styled.div`
  padding: ${(props) => props.theme.grid(2)};
  background-color: ${(props) => props.theme.color.neutral[0]};
  border: 1px solid ${(props) => props.theme.color.neutral[50]};
  border-radius: ${(props) => props.theme.grid(1)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Transfer = styled.div`
  display: flex;
  align-items: center;
`