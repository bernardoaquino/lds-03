import React from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

export type StudentData = {
  name?: string;
  email?: string;
  password?: string;
  rg?: string;
  cpf?: string;
  address?: string;
  courseId?: string;
  institutionId?: string;
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
      name: 'address',
      value: values?.address || '',
      required: true
    },
    {
      type: 'text',
      label: 'Curso',
      name: 'courseId',
      value: values?.courseId || '',
      required: true
    },
    {
      type: 'text',
      label: 'Instituição de Ensino',
      name: 'schoolId',
      value: values?.institutionId || '',
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