import { toast } from 'react-toastify';

type UserAddress = {
  street: string;
  neighbourhood: string;
  zipCode: string;
  state: string;
}

export type StudentData = {
  name: string;
  email: string;
  rg: string;
  cpf: string;
  address: string;
}

type SignUpResponse = {
  error?: boolean;
  userCreatedSuccessfully?: boolean;
}

export const useSignUpStudent = () => {
  const signUp = async (user: StudentData): Promise<SignUpResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student`, {
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

export type BusinessData = {
  nome: string;
  login: string;
  senha: string;
}

export const useSignUpBusiness = () => {
  const signUp = async (agent: BusinessData): Promise<SignUpResponse | void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/business`, {
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