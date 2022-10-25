import React, { MouseEventHandler } from 'react';

import * as El from './Button.style';

export type ButtonProps = {
  children: React.ReactElement | string;
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: (MouseEventHandler<HTMLButtonElement> & Function) | undefined;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  children,
  color = 'primary',
  disabled = false,
  onClick,
  rounded = false,
  size = 'md',
  type = 'button',
}: ButtonProps) => {
  return (
    <El.Button
      color={color}
      rounded={rounded}
      size={size}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </El.Button>
  )
}

export default Button;
