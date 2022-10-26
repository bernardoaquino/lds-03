import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { StudentData } from './../components/Organisms/StudentForm';

type UseStudentResponse = {
    student?: StudentData
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

const useStudent = (): UseStudentResponse => {
    const { session } = useSession();
    const [student, setStudent] = useState<StudentData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getStudentData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/Student`, {
            headers: session.authHeaders
        })

        if (responseData.status === 200) {
            const _student = await responseData.json();

            setStudent(_student);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar os dados da empresa');
        }

        setIsLoading(false);
    }, [session.authHeaders]);

    useEffect(() => {
        getStudentData();
    }, [getStudentData]);

    return {
        student,
        isLoading,
        error,
        refetch: () => getStudentData(true),
    };
};

export default useStudent;
