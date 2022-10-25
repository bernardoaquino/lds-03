import React from 'react';

import BusinessSignUpForm from './BusinessSignUpForm';
import StudentSignUpForm from './StudentSignUpForm';

type SignUpFormProps = {
  type: 'business' | 'student';
  onSubmit: Function;
}

const SignUpForm = ({
  type,
  onSubmit
}: SignUpFormProps) => {
  const componentMap = {
    business: BusinessSignUpForm,
    student: StudentSignUpForm
  }

  const Component = componentMap[type];

  return (
    <Component onSubmit={onSubmit} />
  )
}

export default SignUpForm;