import React from 'react';

/** Components */
import StudentForm from '../../StudentForm';

type StudentSignUpFormProps = {
  onSubmit: Function;
};

const StudentSignUpForm = ({ onSubmit }: StudentSignUpFormProps) => {
  return (
    <StudentForm onSubmit={onSubmit} />
  )
};

export default StudentSignUpForm;