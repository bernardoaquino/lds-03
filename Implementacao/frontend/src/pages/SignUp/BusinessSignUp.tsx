import React from 'react';

/** Components */
import BusinessSignUp from '../../components/Organisms/SignUpContainer/BusinessSignUp';

/** Style */
import * as El from './SignUp.style';

const BusinessSignUpPage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <BusinessSignUp />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default BusinessSignUpPage;