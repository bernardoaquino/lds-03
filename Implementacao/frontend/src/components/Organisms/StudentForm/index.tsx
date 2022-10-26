import React from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

export type StudentData = {
  nome?: string;
  email?: string;
  senha?: string;
  rg?: string;
  cpf?: string;
  endereco?: string;
  id_curso?: string;
  id_instituicao?: string;
}

type StudentFormProps = {
  editMode?: boolean;
  values?: StudentData;
  onSubmit: Function;
};

const StudentForm = ({ 
  editMode = false,
  values,
  onSubmit
}: StudentFormProps) => {
  const studentFields: Field[] = [
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
    {
      type: 'text',
      label: 'CPF',
      name: 'cpf',
      value: values?.cpf || '',
      required: true
    },
    {
      type: 'text',
      label: 'RG',
      name: 'rg',
      value: values?.rg || '',
      required: true
    },
    {
      type: 'text',
      label: 'Endereco',
      name: 'endereco',
      value: values?.endereco || '',
      required: true
    },
    {
      type: 'text',
      label: 'Curso',
      name: 'id_curso',
      value: values?.id_curso || '',
      required: true
    },
    {
      type: 'text',
      label: 'Instituição de Ensino',
      name: 'id_instituicao',
      value: values?.id_instituicao || '',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={studentFields}
      submitLabel={editMode ? 'Salvar' : 'Finalizar cadastro'}
    />
  );
};

export default StudentForm;