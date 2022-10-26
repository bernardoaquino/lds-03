import React from 'react';

/** Components */
import BusinessForm from '../../BusinessForm';

type BusinessSignUpFormProps = {
  onSubmit: Function;
};

const BusinessSignUpForm = ({ onSubmit }: BusinessSignUpFormProps) => {
  return (
    <BusinessForm onSubmit={onSubmit} />
  )
};

export default BusinessSignUpForm;