import React from 'react';

/** Components */
import BusinessProfile from '../../components/Organisms/ProfileContainer/BusinessProfile';

/** Style */
import * as El from './Profile.style';

const BusinessProfilePage = () => {
  return (
    <El.PageWrapper>
      <El.CardWrapper>
        <BusinessProfile />
      </El.CardWrapper>
    </El.PageWrapper>
  )
};

export default BusinessProfilePage;