import React from 'react';

/** Types */
import { Field } from '../../../../hooks/useForm';

/** Components */
import Form from '../../../Molecules/Form';

type BusinessSignUpFormProps = {
  onSubmit: Function;
};

const BusinessSignUpForm = ({ onSubmit }: BusinessSignUpFormProps) => {
  const businessSignUpFormFields: Field[] = [
    {
      type: 'text',
      label: 'Nome',
      name: 'nome',
      value: '',
      required: true
    },
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
      fields={businessSignUpFormFields}
      submitLabel={'Finalizar cadastro'}
    />
  );
};

export default BusinessSignUpForm;