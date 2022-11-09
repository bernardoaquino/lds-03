import React from 'react';

/** Components */
import ProfessorSignUp from '../../components/Organisms/SignUpContainer/ProfessorSignUp';

/** Style */
import * as El from './SignUp.style';

const ProfessorSignUpPage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <ProfessorSignUp />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default ProfessorSignUpPage;