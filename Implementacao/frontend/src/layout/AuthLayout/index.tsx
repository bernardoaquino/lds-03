import React from 'react';

/** Components */
import Header from '../../components/Organisms/Header';

/** Style */
import * as El from './AuthLayout.style';

type AuthLayoutProps = {
  children: React.ReactNode;
}

const AuthLayout = ({
  children
}: AuthLayoutProps) => {
  return (
    <El.Wrapper>
      <Header />
      <El.Children>
        {children}
      </El.Children>
    </El.Wrapper>
  )
}

export default AuthLayout