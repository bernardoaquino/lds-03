import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { StudentData } from './../components/Organisms/StudentForm';
import { Option } from '../components/Atoms/FormField/Select';

type UseStudentResponse = {
    student?: StudentData
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

type UseStudentListResponse = {
    students?: Option[]
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

const BASE_API_URL = `${process.env.REACT_APP_API_BASE_URL}/student`;

const useStudent = (): UseStudentResponse => {
    const { session } = useSession();
    const [student, setStudent] = useState<StudentData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getStudentData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/perfil/aluno`, {
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

export const useStudentList = (): UseStudentListResponse => {
    const { session } = useSession();
    const [students, setStudents] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getStudentsData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const responseData = await fetch(BASE_API_URL, {
            headers: session.authHeaders
        })

        if (responseData.status === 200) {
            const _students = (await responseData.json()).students;

            const mappedStudents: Option[] = _students.map((student: StudentData) => ({
                label: student.nome,
                value: student.id
            }))

            setStudents(mappedStudents);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar os dados da empresa');
        }

        setIsLoading(false);
    }, [session.authHeaders]);

    useEffect(() => {
        getStudentsData();
    }, [getStudentsData]);

    return {
        students,
        isLoading,
        error,
        refetch: () => getStudentsData(true),
    };
}

export default useStudent;
