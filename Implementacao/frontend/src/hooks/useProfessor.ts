import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { ProfessorData } from './../components/Organisms/ProfessorForm';

type UseProfessorResponse = {
    professor?: ProfessorData
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

const useProfessor = (): UseProfessorResponse => {
    const { session } = useSession();
    const [professor, setProfessor] = useState<ProfessorData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getProfessorData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const _professor = session?.data;

        if (_professor) {
            setProfessor(_professor);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar os dados');
        }

        setIsLoading(false);
    }, [session.authHeaders]);

    useEffect(() => {
        getProfessorData();
    }, [getProfessorData]);

    return {
        professor,
        isLoading,
        error,
        refetch: () => getProfessorData(true),
    };
};

export default useProfessor;
