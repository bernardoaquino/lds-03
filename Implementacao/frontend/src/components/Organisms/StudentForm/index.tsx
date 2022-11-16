import React, { useEffect, useState } from 'react';

/** Types */
import { Field } from '../../../hooks/useForm';

/** Hooks */
import { useCoursesList } from '../../../hooks/useCourse';
import { useInstitutionList } from '../../../hooks/useInstitution';

/** Components */
import Form from '../../Molecules/Form';

/** Validators */
import enableWhenFieldValueIsNotNull from '../../../utils/validators/enableWhenFieldValueIsNotNull';
import { Option } from '../../Atoms/FormField/Select';

export type StudentData = {
  nome?: string;
  email?: string;
  senha?: string;
  rg?: string;
  cpf?: string;
  endereco?: string;
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
  // const [courses, setCourses] = useState<Option[]>([]);
  const { institutions, isLoading: isLoadingInstitutions } = useInstitutionList();
  const { courses, refetch: fetchCourses } = useCoursesList(values?.institutionId);

  // useEffect(() => {
  //   if (coursesData) {
  //     setCourses(coursesData);
  //   }
  // }, [coursesData])

  if (isLoadingInstitutions) {
    return null
  }

  const studentFields: Field[] = [
    {
      type: 'text',
      label: 'Nome',
      name: 'nome',
      value: values?.nome,
      required: true
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      value: values?.email,
      required: true
    },
    {
      type: 'password',
      label: 'Senha',
      name: 'senha',
      value: values?.senha,
      required: true
    },
    {
      type: 'text',
      label: 'CPF',
      name: 'cpf',
      value: values?.cpf,
      required: true
    },
    {
      type: 'text',
      label: 'RG',
      name: 'rg',
      value: values?.rg,
      required: true
    },
    {
      type: 'text',
      label: 'Endereco',
      name: 'endereco',
      value: values?.endereco,
      required: true
    },
    {
      type: 'select',
      label: 'Instituicao de Ensino',
      name: 'institutionId',
      value: values?.institutionId,
      required: true,
      options: institutions,
      afterChange: (institutionId: number) => fetchCourses(institutionId)
    },
    {
      type: 'select',
      label: 'Curso',
      name: 'courseId',
      value: values?.courseId,
      required: true,
      options: courses,
    },
  ]

  const validators = [
    enableWhenFieldValueIsNotNull('institutionId', 'courseId'),
  ]

  return (
    <Form
      localStorageLabel={'studentForm'}
      onSubmit={onSubmit}
      fields={studentFields}
      validators={validators}
      submitLabel={editMode ? 'Salvar' : 'Finalizar cadastro'}
    />
  );
};

export default StudentForm;