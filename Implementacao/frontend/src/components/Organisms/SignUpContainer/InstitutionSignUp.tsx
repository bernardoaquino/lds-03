import React from 'react';
import { useNavigate } from 'react-router-dom';

/** Constants */
import { SIGNIN_URL } from '../../../constants';

/** Types */
import { Form } from '../../../hooks/useForm';
import { InstitutionData } from '../InstitutionForm';

/** Hooks */
import { useSignUpInstitution } from '../../../hooks/useInstitution';

/** Components */
import SignUpForm from '../SignUpForm';

/** Style */
import * as El from './SignUpContainer.style';

const InstitutionSignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useSignUpInstitution();

  const handleSubmit = (formValues: Form) => {
    signUp(formValues as InstitutionData).then(response => {
      if (response?.userCreatedSuccessfully) {
        navigate(SIGNIN_URL);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Title>Crie sua conta de Instituição de Ensino</El.Title>
      <SignUpForm type={'institution'} onSubmit={handleSubmit} />
      <El.AlreadyHasAccount>Já possui conta? <a href={SIGNIN_URL}>Clique aqui para entrar</a></El.AlreadyHasAccount>
    </El.Wrapper>
  )
}

export default InstitutionSignUp;
