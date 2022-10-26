import { toast } from "react-toastify";
import { useSession } from "../providers/Auth";

export type UserCredentials = {
  email: string;
  senha: string;
}

type UserSignInResponse = {
  userType?: 'student' | 'business' | 'institution';
  error?: boolean;
  errorMessage?: string;
  user?: Object;
}

const useSignIn = () => {
  const { updateSession } = useSession();

  const signIn = async (user: UserCredentials): Promise<UserSignInResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        ...user
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const successfullyLoggedIn = response.status === 200
    const unauthorized = response.status === 401

    if (unauthorized) {
      toast.error("Login e/ou senha incorretos");
    } else if (successfullyLoggedIn) {
      const responseBody = await response.json();

      updateSession({
        name: responseBody.user.nome,
        token: responseBody.token,
        userType: responseBody?.userType
      });

      return {
        userType: successfullyLoggedIn && responseBody?.userType,
        user: successfullyLoggedIn && responseBody,
        error: !successfullyLoggedIn,
        errorMessage: !successfullyLoggedIn ? String(responseBody) : ''
      }
    }

    return {
      userType: undefined,
      user: false,
      error: true,
      errorMessage: ''
    }
  }

  return { 
    signIn
  };
};

export default useSignIn;