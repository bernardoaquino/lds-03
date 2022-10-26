import React from 'react';

/** Components */
import SignIn from '../../components/Organisms/SignIn';

/** Style */
import * as El from './SignIn.style';

const SignInPage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <SignIn />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default SignInPage;