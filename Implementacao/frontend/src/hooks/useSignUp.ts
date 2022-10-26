import { toast } from 'react-toastify';

/** Types */
import { BusinessData } from '../components/Organisms/BusinessForm';
import { StudentData } from '../components/Organisms/StudentForm';

type UserAddress = {
  street: string;
  neighbourhood: string;
  zipCode: string;
  state: string;
}

type SignUpResponse = {
  error?: boolean;
  userCreatedSuccessfully?: boolean;
}

export const useSignUpStudent = () => {
  const signUp = async (user: StudentData): Promise<SignUpResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/aluno`, {
      method: 'POST',
      body: JSON.stringify({
        ...user
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const userCreatedSuccessfully = response.status === 201;
    
    if (userCreatedSuccessfully) {
      toast.success("Usuário criado com sucesso!");
    } else {
      const errorMessage = await response.json();

      toast.error(errorMessage);
    }

    return {
      userCreatedSuccessfully,
      error: !userCreatedSuccessfully,
    }
  }

  return { 
    signUp
  };
};

export const useSignUpBusiness = () => {
  const signUp = async (agent: BusinessData): Promise<SignUpResponse | void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/empresa`, {
      method: 'POST',
      body: JSON.stringify({
        ...agent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const userCreatedSuccessfully = response.status === 201;
    
    if (userCreatedSuccessfully) {
      toast.success("Usuário criado com sucesso!");
    } else {
      const errorMessage = await response.json();

      toast.error(errorMessage);
    }

    return {
      userCreatedSuccessfully,
      error: !userCreatedSuccessfully,
    }
  }

  return { 
    signUp
  };
};