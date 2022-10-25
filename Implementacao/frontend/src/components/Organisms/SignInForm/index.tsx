import React from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

type SignInFormProps = {
  onSubmit: Function;
};

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const signIpFormFields: Field[] = [
    {
      type: 'email',
      label: 'Email',
      name: 'login',
      value: '',
      required: true
    },
    {
      type: 'password',
      label: 'Senha',
      name: 'senha',
      value: '',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={signIpFormFields}
      submitLabel={'Entrar'}
    />
  );
};

export default SignInForm;