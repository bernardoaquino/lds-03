import React from 'react';

/** Types */
import { Field } from '../../../../hooks/useForm';

/** Components */
import Form from '../../../Molecules/Form';

type UserSignUpFormProps = {
  onSubmit: Function;
};

const UserSignUpForm = ({ onSubmit }: UserSignUpFormProps) => {
  const userSignUpFormFields: Field[] = [
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
    {
      type: 'text',
      label: 'CPF',
      name: 'cpf',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'RG',
      name: 'rg',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Endereco',
      name: 'endereco',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Curso',
      name: 'courseId',
      value: '',
      required: true
    },
    {
      type: 'text',
      label: 'Instituição de Ensino',
      name: 'schoolId',
      value: '',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={userSignUpFormFields}
      submitLabel={'Finalizar cadastro'}
    />
  );
};

export default UserSignUpForm;