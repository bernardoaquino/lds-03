import React, { useCallback } from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

export type TransferData = {
  id_aluno?: string;
  valor?: number;
  motivo?: string;
}

type TransferFormProps = {
  onSubmit: Function;
};

const TransferForm = ({ 
  onSubmit
}: TransferFormProps) => {
  // const { alunos, isLoading, error } = useAlunos();

  // if (isLoading) {
  //   return <>Carregando...</>
  // }

  // const alunosOptions = useCallback(alunos.map(aluno => ({

  // })), [alunos])

  const transferFields: Field[] = [
    {
      type: 'text',
      label: 'Aluno',
      name: 'id_aluno',
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