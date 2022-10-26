import React from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

export type BusinessData = {
    name?: string;
    email?: string;
    password?: string;
}

type BusinessFormProps = {
    editMode?: boolean;
    values?: BusinessData;
    onSubmit: Function;
};

const BusinessForm = ({ 
    editMode = false,
    values,
    onSubmit 
}: BusinessFormProps) => {
  const businessFormFields: Field[] = [
    {
      type: 'text',
      label: 'Nome',
      name: 'name',
      value: values?.name || '',
      required: true
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      value: values?.email || '',
      required: true
    },
    {
      type: 'password',
      label: 'Senha',
      name: 'password',
      value: values?.password || '',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={businessFormFields}
      submitLabel={editMode ? 'Salvar' : 'Finalizar cadastro'}
    />
  );
};

export default BusinessForm;