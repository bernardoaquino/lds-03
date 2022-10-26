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

export const Name = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize[24]};
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