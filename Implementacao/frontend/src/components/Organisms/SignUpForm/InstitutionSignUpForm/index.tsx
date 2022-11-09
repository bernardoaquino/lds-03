import React from 'react';

/** Components */
import InstitutionForm from '../../InstitutionForm';

type InstitutionSignUpFormProps = {
  onSubmit: Function;
};

const InstitutionSignUpForm = ({ onSubmit }: InstitutionSignUpFormProps) => {
  return (
    <InstitutionForm onSubmit={onSubmit} />
  )
};

export default InstitutionSignUpForm;