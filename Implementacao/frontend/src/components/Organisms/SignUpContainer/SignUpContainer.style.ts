import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize[24]};
`

export const DividerText = styled.p`
  color: ${(props) => props.theme.color.neutral[75]};
  font-size: ${(props) => props.theme.typography.fontSize[12]};
  font-weight: ${(props) => props.theme.typography.fontWeight.light};
`

export const AlreadyHasAccount = styled.p`
  color: ${(props) => props.theme.color.neutral[100]};
  font-size: ${(props) => props.theme.typography.fontSize[14]};
  font-weight: ${(props) => props.theme.typography.fontWeight.normal};
  margin-top: ${(props) => props.theme.grid(6)};
  margin-bottom: ${(props) => props.theme.grid(1)};
  
  a {
    color: ${(props) => props.theme.color.primary.medium};
    font-weight: ${(props) => props.theme.typography.fontWeight.bold};
    text-decoration: none;
  }
`

export const CreateAgentAccountText = styled.a`
  color: ${(props) => props.theme.color.primary.medium};
  font-size: ${(props) => props.theme.typography.fontSize[14]};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  margin-top: ${(props) => props.theme.grid(1)};
  text-decoration: none;
`