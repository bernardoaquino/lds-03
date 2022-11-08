import React from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

export type ProfessorData = {
  nome?: string;
  email?: string;
  senha?: string;
  cpf?: string;
  id_instituicao?: string;
  id_departamento?: string;
}

type ProfessorFormProps = {
  editMode?: boolean;
  values?: ProfessorData;
  onSubmit: Function;
};

const ProfessorForm = ({ 
  editMode = false,
  values,
  onSubmit
}: ProfessorFormProps) => {
  const professorFields: Field[] = [
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
      label: 'Instituição de Ensino',
      name: 'id_instituicao',
      value: values?.id_instituicao || '',
      required: true
    },
    {
      type: 'text',
      label: 'Departamento',
      name: 'id_departamento',
      value: values?.id_departamento || '',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={professorFields}
      submitLabel={editMode ? 'Salvar' : 'Finalizar cadastro'}
    />
  );
};

export default ProfessorForm;