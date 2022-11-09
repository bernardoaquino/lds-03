import React from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

export type InstitutionData = {
  nome?: string;
  email?: string;
  senha?: string;
  cpf?: string;
  id_instituicao?: string;
  id_departamento?: string;
}

type InstitutionFormProps = {
  editMode?: boolean;
  values?: InstitutionData;
  onSubmit: Function;
};

const InstitutionForm = ({ 
  editMode = false,
  values,
  onSubmit
}: InstitutionFormProps) => {
  const institutionFields: Field[] = [
    {
      type: 'text',
      label: 'Nome',
      name: 'nome',
      value: values?.nome || '',
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
      name: 'senha',
      value: values?.senha || '',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={institutionFields}
      submitLabel={editMode ? 'Salvar' : 'Finalizar cadastro'}
    />
  );
};

export default InstitutionForm;