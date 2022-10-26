import React from 'react';

/** Components */
import StudentProfile from '../../components/Organisms/ProfileContainer/StudentProfile';

/** Style */
import * as El from './Profile.style';

const StudentProfilePage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <StudentProfile />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default StudentProfilePage;