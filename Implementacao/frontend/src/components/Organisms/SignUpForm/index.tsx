import React from 'react';

import BusinessSignUpForm from './BusinessSignUpForm';
import ProfessorSignUpForm from './ProfessorSignUpForm';
import StudentSignUpForm from './StudentSignUpForm';

type SignUpFormProps = {
  type: 'business' | 'student' | 'professor';
  onSubmit: Function;
}

const SignUpForm = ({
  type,
  onSubmit
}: SignUpFormProps) => {
  const componentMap = {
    business: BusinessSignUpForm,
    student: StudentSignUpForm,
    professor: ProfessorSignupForm,
  }

  const Component = componentMap[type];

  return (
    <Component onSubmit={onSubmit} />
  )
}

export default SignUpForm;