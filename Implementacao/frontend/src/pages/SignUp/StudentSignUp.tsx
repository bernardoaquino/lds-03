import React from 'react';

/** Components */
import StudentSignUp from '../../components/Organisms/SignUpContainer/StudentSignUp';

/** Style */
import * as El from './SignUp.style';

const StudentSignUpPage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <StudentSignUp />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default StudentSignUpPage;