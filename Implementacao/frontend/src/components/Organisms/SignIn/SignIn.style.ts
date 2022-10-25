import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize[24]};
  margin-bottom: ${(props) => props.theme.grid(8)};
`

export const DividerText = styled.p`
  color: ${(props) => props.theme.color.neutral[75]};
  font-size: ${(props) => props.theme.typography.fontSize[12]};
  font-weight: ${(props) => props.theme.typography.fontWeight.light};
  margin-top: ${(props) => props.theme.grid(3)};
`

export const CreateAccountText = styled.a`
  color: ${(props) => props.theme.color.primary.medium};
  font-size: ${(props) => props.theme.typography.fontSize[14]};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  margin-top: ${(props) => props.theme.grid(1)};
  text-decoration: none;
`