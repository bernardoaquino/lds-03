import { toast } from 'react-toastify';

/** Types */
import { BusinessData } from '../components/Organisms/BusinessForm';
import { InstitutionData } from '../components/Organisms/InstitutionForm';
import { ProfessorData } from '../components/Organisms/ProfessorForm';
import { StudentData } from '../components/Organisms/StudentForm';

export type SignUpResponse = {
  error?: boolean;
  userCreatedSuccessfully?: boolean;
}

export const useSignUpStudent = () => {
  const signUp = async (studentData: StudentData): Promise<SignUpResponse> => {
    const { courseId: courseIdStr, institutionId, ...student } = studentData;
    const courseId = Number(courseIdStr);

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student`, {
      method: 'POST',
      body: JSON.stringify({
        student,
        courseId
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
  const signUp = async (business: BusinessData): Promise<SignUpResponse | void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/business`, {
      method: 'POST',
      body: JSON.stringify({
        business
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

export const useSignUpProfessor = () => {
  const signUp = async (professor: ProfessorData): Promise<SignUpResponse | void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/professor`, {
      method: 'POST',
      body: JSON.stringify({
        professor
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