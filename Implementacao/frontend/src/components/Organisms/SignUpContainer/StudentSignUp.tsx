import React from 'react';
import { useNavigate } from 'react-router-dom';

/** Constants */
import { SIGNIN_URL } from '../../../constants';

/** Types */
import { Form } from '../../../hooks/useForm';
import { StudentData } from '../StudentForm';

/** Hooks */
import { useSignUpStudent } from '../../../hooks/useSignUp';

/** Components */
import SignUpForm from '../SignUpForm';

/** Style */
import * as El from './SignUpContainer.style';

const StudentSignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useSignUpStudent();

  const handleSubmit = (formValues: Form) => {
    signUp(formValues as StudentData).then(response => {
      if (response.userCreatedSuccessfully) {
        navigate(SIGNIN_URL);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Title>Crie sua conta de aluno</El.Title>
      <SignUpForm type={'student'} onSubmit={handleSubmit} />
      <El.AlreadyHasAccount>Já possui conta? <a href={SIGNIN_URL}>Clique aqui para entrar</a></El.AlreadyHasAccount>
    </El.Wrapper>
  )
}

export default StudentSignUp;
