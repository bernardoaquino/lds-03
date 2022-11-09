import React from 'react';

/** Components */
import InstitutionProfile from '../../components/Organisms/ProfileContainer/InstitutionProfile';

/** Style */
import * as El from './Profile.style';

const InstitutionProfilePage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <InstitutionProfile />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default InstitutionProfilePage;