import React, { ChangeEventHandler, FocusEventHandler } from 'react';

import * as El from './TextField.style';

export type TextFieldProps = {
  type?: string;
  name: string;
  label?: string;
  value?: string;
  required?: boolean;
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
}

const TextField = ({
  type = 'text',
  name,
  label,
  required = false,
  value,
  placeholder,
  onChange,
  onBlur,
}: TextFieldProps) => {
  return (
    <El.Container>
      <El.Label htmlFor={name}>{label}</El.Label>
      <El.TextField 
        type={type} 
        name={name}
        required={required} 
        value={value}
        placeholder={placeholder} 
        onChange={(e) => onChange?.(e)} 
        onBlur={onBlur} 
      />
    </El.Container>
  )
}

export default TextField;