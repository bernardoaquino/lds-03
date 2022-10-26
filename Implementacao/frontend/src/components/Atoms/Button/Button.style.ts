import styled, { css } from 'styled-components';

import { ButtonProps } from './';

const DisabledStyling = css`
  background-color: ${(props) => props.theme.color.neutral[75]};
`

const ColorStyling = {
  'primary': css`
    color: ${(props) => props.theme.color.neutral[0]};
    background-color: ${(props) => props.theme.color.primary.light};
  `,
  'secondary': css`
  color: ${(props) => props.theme.color.neutral[0]};
  background-color: ${(props) => props.theme.color.secondary.light};
  `
}

const SizeStyling = {
  'sm': css`
    font-size: ${(props) => props.theme.typography.fontSize[12]};
    padding: ${(props) => props.theme.grid(1)};
  `,
  'md': css`
    font-size: ${(props) => props.theme.typography.fontSize[14]};
    padding: ${(props) => props.theme.grid(1.5)};
  `,
  'lg': css`
    font-size: ${(props) => props.theme.typography.fontSize[16]};
    padding: ${(props) => props.theme.grid(2)};
  `,
}

type ButtonStyling = ButtonProps & {
  color: string;
}

export const Button = styled.button<ButtonStyling>`
  outline: none;
  border: none;
  border-radius: ${(props) => props.rounded ? '100vw' : props.theme.grid(0.5)};
  cursor: pointer;
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};

  ${(props) => props.size && SizeStyling[props.size]};
  ${(props) => ColorStyling[props.color]};
  ${(props) => props.disabled && DisabledStyling};
`