import React, { useCallback } from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';
import { useStudentList } from '../../../hooks/useStudent';

/** Components */
import Form from '../../Molecules/Form';

export type TransferData = {
  studentId?: number;
  valor?: number;
  motivo?: string;
}

type TransferFormProps = {
  onSubmit: Function;
};

const TransferForm = ({ 
  onSubmit
}: TransferFormProps) => {
  const { students, isLoading } = useStudentList();

  if (isLoading) {
    return <>Carregando...</>
  }

  const transferFields: Field[] = [
    {
      type: 'select',
      label: 'Aluno',
      name: 'studentId',
      options: students,
      required: true
    },
    {
      type: 'number',
      label: 'Valor',
      name: 'valor',
      required: true
    },
    {
      type: 'text',
      label: 'Motivo',
      name: 'motivo',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={transferFields}
      submitLabel={'Enviar'}
    />
  );
};

export default TransferForm;