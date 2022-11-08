import React from 'react';
import { useNavigate } from 'react-router-dom';

/** Constants */
import { SIGNIN_URL } from '../../../constants';

/** Types */
import { Form } from '../../../hooks/useForm';
import { ProfessorData } from '../ProfessorForm';

/** Hooks */
import { useSignUpProfessor } from '../../../hooks/useSignUp';

/** Components */
import SignUpForm from '../SignUpForm';

/** Style */
import * as El from './SignUpContainer.style';

const ProfessorSignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useSignUpProfessor();

  const handleSubmit = (formValues: Form) => {
    signUp(formValues as ProfessorData).then(response => {
      if (response?.userCreatedSuccessfully) {
        navigate(SIGNIN_URL);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Title>Crie sua conta de professor</El.Title>
      <SignUpForm type={'professor'} onSubmit={handleSubmit} />
      <El.AlreadyHasAccount>Já possui conta? <a href={SIGNIN_URL}>Clique aqui para entrar</a></El.AlreadyHasAccount>
    </El.Wrapper>
  )
}

export default ProfessorSignUp;
