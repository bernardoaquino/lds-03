import React from 'react';

/** Components */
import ProfessorProfile from '../../components/Organisms/ProfileContainer/ProfessorProfile';

/** Style */
import * as El from './Profile.style';

const ProfessorProfilePage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <ProfessorProfile />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default ProfessorProfilePage;