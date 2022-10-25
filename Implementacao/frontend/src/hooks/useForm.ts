import { FormEvent, useEffect, useState } from "react";
import { Option as SelectOption } from "../components/Atoms/FormField/Select";



export type Field = {
  type: 'text' | 'password' | 'email' | 'select';
  name: string;
  label: string;
  required?: boolean;
  options?: SelectOption[]
  value?: string;
};

export type Form = {
  [key: string]: string | null;
};

const createDefaultForm = (fields: Field[]): Form => fields.reduce((formObject, field) => {
  formObject[field.name] = field?.value ?? null;

  return formObject;
}, {} as Form);

const useForm = (fields: Field[]) => {
  const DEFAULT_FORM = createDefaultForm(fields);
  const [form, setForm] = useState<Form>(DEFAULT_FORM);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  useEffect(() => {
    setForm(createDefaultForm(fields));
  }, [fields])

  const updateFormField = (field: Field, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field.name]: value,
    }))
    field.value = value;
  }

  const handleSubmit = (callback: Function) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    callback?.(form);
    setIsSubmittingForm(false);
  }

  return {
    updateFormField,
    handleSubmit,
    isSubmittingForm
  };
};

export default useForm;