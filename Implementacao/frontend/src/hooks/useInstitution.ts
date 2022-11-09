import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { InstitutionData } from './../components/Organisms/InstitutionForm';

type UseInstitutionResponse = {
    institution?: InstitutionData
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

const useInstitution = (): UseInstitutionResponse => {
    const { session } = useSession();
    const [institution, setInstitution] = useState<InstitutionData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getInstitutionData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/perfil/instituicao`, {
            headers: session.authHeaders
        })

        if (responseData.status === 200) {
            const _institution = await responseData.json();

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
