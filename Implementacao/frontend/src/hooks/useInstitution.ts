import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Option } from '../components/Atoms/FormField/Select';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { InstitutionData } from './../components/Organisms/InstitutionForm';
import { SignUpResponse } from './useSignUp';

type UseInstitutionResponse = {
    institution?: InstitutionData
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

type UseInstitutionListResponse = {
  institutions?: Option[];
  isLoading: boolean;
  error: boolean;
  refetch: Function;
}

type UseSignUpInstitutionFunctions = {
    signUp: (institution: InstitutionData) => Promise<SignUpInstitutionResponse>
}

type SignUpInstitutionResponse = {
    userCreatedSuccessfully: boolean;
    error: boolean;
}

const BASE_API_URL = `${process.env.REACT_APP_API_BASE_URL}/institution`;

export const useSignUpInstitution = () => {
  const signUp = async (institute: InstitutionData): Promise<SignUpResponse | void> => {
    const response = await fetch(BASE_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        institute
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

export const useInstitutionList = (): UseInstitutionListResponse => {
  const { session } = useSession();
  const [institutions, setInstitutions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getInstitutionsData = useCallback(async (keepIsLoadingState = false) => {
    !keepIsLoadingState && setIsLoading(true);

    const responseData = await fetch(`${BASE_API_URL}/all`, {
        headers: session.authHeaders
    })

    if (responseData.status === 200) {
        const _institutions: InstitutionData[] = (await responseData.json())?.institutions;

        const mappedInstitutions: Option[] = _institutions?.map(institution => ({
          label: institution.nome as string,
          value: institution.id as number
        }))

        setInstitutions(mappedInstitutions);
        setError(false);
    } else {
        setError(true);
        toast.error('Ocorreu um erro ao recuperar os dados');
    }

    setIsLoading(false);
  }, [session.authHeaders]);

  useEffect(() => {
      getInstitutionsData();
  }, [getInstitutionsData]);

  return {
    institutions,
    isLoading,
    error,
    refetch: () => getInstitutionsData(true),
};
}

const useInstitution = (): UseInstitutionResponse => {
    const { session } = useSession();
    const [institution, setInstitution] = useState<InstitutionData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getInstitutionData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const _institution = session?.data;

        if (_institution) {
            setInstitution(_institution);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar os dados');
        }

        setIsLoading(false);
    }, [session.authHeaders]);

    useEffect(() => {
        getInstitutionData();
    }, [getInstitutionData]);

    return {
        institution,
        isLoading,
        error,
        refetch: () => getInstitutionData(true),
    };
};

export default useInstitution;
