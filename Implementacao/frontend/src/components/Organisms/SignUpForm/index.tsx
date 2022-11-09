import React from 'react';

/** Components */
import BusinessSignUpForm from './BusinessSignUpForm';
import InstitutionSignUpForm from './InstitutionSignUpForm';
import ProfessorSignUpForm from './ProfessorSignUpForm';
import StudentSignUpForm from './StudentSignUpForm';

type SignUpFormProps = {
  type: 'business' | 'student' | 'professor' | 'institution';
  onSubmit: Function;
}

const SignUpForm = ({
  type,
  onSubmit
}: SignUpFormProps) => {
  const componentMap = {
    business: BusinessSignUpForm,
    institution: InstitutionSignUpForm,
    student: StudentSignUpForm,
    professor: ProfessorSignUpForm,
  }

  const Component = componentMap[type];

  return (
    <Component onSubmit={onSubmit} />
  )
}

export default SignUpForm;