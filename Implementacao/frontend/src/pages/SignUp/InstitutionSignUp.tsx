import React from 'react';

/** Components */
import InstitutionSignUp from '../../components/Organisms/SignUpContainer/InstitutionSignUp';

/** Style */
import * as El from './SignUp.style';

const InstitutionSignUpPage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <InstitutionSignUp />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default InstitutionSignUpPage;