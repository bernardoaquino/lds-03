import React from 'react';

/** Components */
import ProfessorForm from '../../ProfessorForm';

type ProfessorSignUpFormProps = {
  onSubmit: Function;
};

const ProfessorSignUpForm = ({ onSubmit }: ProfessorSignUpFormProps) => {
  return (
    <ProfessorForm onSubmit={onSubmit} />
  )
};

export default ProfessorSignUpForm;