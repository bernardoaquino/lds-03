import { FormEvent, useEffect, useState } from "react";

/** Types */
import { Option as SelectOption } from "../components/Atoms/FormField/Select";



export type Field = {
  type: 'text' | 'number' | 'date' | 'password' | 'email' | 'select' | 'checkbox';
  disabled?: boolean;
  name: string;
  label: string;
  required?: boolean;
  options?: SelectOption[]
  value?: string | number | boolean;
  afterChange?: (value: any) => void;
  show?: boolean;
};

export type Form = {
  [key: string]: string | number | boolean | null;
};

const createDefaultForm = (fields: Field[], localStorageLabel?: string): Form => {
  let localStorageObj: Form = {}

  if (localStorageLabel) {
    const localStorageEntry = localStorage.getItem(localStorageLabel);

    localStorageObj = localStorageEntry ? JSON.parse(localStorageEntry) : {};
  }

  return fields.reduce((formObject, field) => {
    formObject[field.name] = field?.value ?? localStorageObj?.[field.name] ?? null;
   
    if (formObject[field.name] !== null) {
      field.value = formObject[field.name] as (string | number | boolean)
    }
    
    return formObject;
  }, {} as Form);
};

const useForm = (fields: Field[], localStorageLabel?: string) => {
  const DEFAULT_FORM = createDefaultForm(fields, localStorageLabel);
  const [form, setForm] = useState<Form>(DEFAULT_FORM);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  useEffect(() => {
    setForm(createDefaultForm(fields, localStorageLabel));
  }, [fields, localStorageLabel])

  const updateFormField = (field: Field, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field.name]: value,
    }))
    
    if (localStorageLabel) {
      localStorage.setItem(localStorageLabel, JSON.stringify({
        ...form,
        [field.name]: value
      }))
    }

    field.value = value;
    field?.afterChange?.(value);

  }

  const handleSubmit = (callback: Function) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingForm(true);
    callback?.(form);
    setIsSubmittingForm(false);

    if (localStorageLabel) {
      localStorage.removeItem(localStorageLabel);
    }
  }

  return {
    updateFormField,
    handleSubmit,
    isSubmittingForm
  };
};

export default useForm;