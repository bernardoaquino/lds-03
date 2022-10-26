import React from 'react';
import { useNavigate } from 'react-router-dom';

/** Constants */
import { SIGNIN_URL } from '../../../constants';

/** Types */
import { Form } from '../../../hooks/useForm';
import { BusinessData } from '../BusinessForm';

/** Hooks */
import { useSignUpBusiness } from '../../../hooks/useSignUp';

/** Components */
import SignUpForm from '../SignUpForm';

/** Style */
import * as El from './SignUpContainer.style';

const BusinessSignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useSignUpBusiness();

  const handleSubmit = (formValues: Form) => {
    signUp(formValues as BusinessData).then(response => {
      if (response?.userCreatedSuccessfully) {
        navigate(SIGNIN_URL);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Title>Crie sua conta de empresa</El.Title>
      <SignUpForm type={'business'} onSubmit={handleSubmit} />
      <El.AlreadyHasAccount>Já possui conta? <a href={SIGNIN_URL}>Clique aqui para entrar</a></El.AlreadyHasAccount>
    </El.Wrapper>
  )
}

export default BusinessSignUp;
