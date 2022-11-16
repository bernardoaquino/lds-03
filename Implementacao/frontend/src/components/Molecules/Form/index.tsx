import React, { useEffect } from 'react';

/** Hooks */
import useForm, { Field, Form } from '../../../hooks/useForm';

/** Types */
import KeyValuePair from '../../../types/KeyValuePair';

/** Component */
import Button from '../../Atoms/Button';
import SelectField, { Option as SelectOption, SelectProps } from "../../Atoms/FormField/Select";
import TextField, { TextFieldProps } from '../../Atoms/FormField/TextField';

/** Styles */
import * as El from './Form.style';

type FormProps = {
  fields: Field[];
  localStorageLabel?: string;
  validators?: ((fields: Field[]) => void)[];
  submitLabel?: string;
  onSubmit: Function;
}

const FormComponent = ({
  submitLabel = 'enviar',
  fields,
  localStorageLabel,
  validators,
  onSubmit
}: FormProps) => {
  const { updateFormField, isSubmittingForm, handleSubmit } = useForm(fields, localStorageLabel);

  useEffect(() => {
    validators?.map(validatorFn => validatorFn(fields));
  }, [validators, fields]);

  const onChangeMap: KeyValuePair<(field: Field) => any> = {
    default: (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => updateFormField(field, e.target.value),
    select: (field: Field) => (selectedOption: SelectOption) => updateFormField(field, selectedOption.value),
  }

  const getChangeMapType = (type: string) => {
    if (Object.hasOwn(onChangeMap, type)) {
      return type;
    }

    return 'default';
  }

  const getFieldProps = (type: string, field: Field) => {
    const normalizedFieldName = field.name.toLowerCase().split(' ').join('_');
    const key = `form-field-${normalizedFieldName}`
    
    if (type === 'select') {
      const { type, value, ...fieldProps } = field;
      const onChange = onChangeMap?.[getChangeMapType(type)]?.(field);

      return {
        ...fieldProps,
        selected: value,
        options: fieldProps.options as SelectOption[],
        key,
        onChange
      };
    } else {
      const onChange = onChangeMap?.[getChangeMapType(type)]?.(field);
      
      return {
        ...field,
        key,
        onChange
      }
    }
  }

  const renderField = (field: Field) => {
    const { type } = field;
    const fieldProps = getFieldProps(type, field);

    if (!field?.value) {
      field.value = '';
    }

    if (field?.show === false) {
      return null;
    }

    if (type === 'select') {
      return <SelectField key={fieldProps.key} {...(fieldProps as SelectProps)} />;
    } else {
      return <TextField key={fieldProps.key} {...(fieldProps as TextFieldProps)} />;
    }
  }

  return (
    <El.Form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(renderField)}
      <Button type={'submit'} color='primary' disabled={isSubmittingForm}>
        {submitLabel}
      </Button>
    </El.Form>
  );
}

export default FormComponent;
