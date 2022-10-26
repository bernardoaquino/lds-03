import React from 'react';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { StudentData } from './../components/Organisms/StudentForm';

type UseUpdateStudentResponse = {
    update: (student: StudentData) => Promise<UpdateStudentResponse>
}

type UpdateStudentResponse = {
    error: boolean;
}

const useUpdateStudent = (): UseUpdateStudentResponse => {
    const { session } = useSession();

    const update = async (student: StudentData) => {
        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student`, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: session.authHeaders
        })

        return {
            error: responseData.status !== 200
        }
    }

    return {
        update
    };
};

export default useUpdateStudent;
