import React from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Components */
import Form from '../../Molecules/Form';

export type AdvantageData = {
    nome?: string;
    descricao?: string;
    custoMoedas?: any;
}

type AdvantageFormProps = {
    editMode?: boolean;
    values?: AdvantageData;
    onSubmit: Function;
};

const AdvantageForm = ({ 
    editMode = false,
    values,
    onSubmit 
}: AdvantageFormProps) => {
  const AdvantageFormFields: Field[] = [
    {
      type: 'text',
      label: 'Nome',
      name: 'nome',
      value: values?.nome || '',
      required: true
    },
    {
      type: 'text',
      label: 'Descricao',
      name: 'descricao',
      value: values?.descricao || '',
      required: true
    },
    {
      type: 'text',
      label: 'Custo de moedas',
      name: 'custoMoedas',
      value: values?.custoMoedas || '',
      required: true
    },
  ]

  return (
    <Form
      onSubmit={onSubmit}
      fields={AdvantageFormFields}
      submitLabel={editMode ? 'Salvar' : 'Criar'}
    />
  );
};

export default AdvantageForm;