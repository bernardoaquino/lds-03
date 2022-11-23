import React from 'react';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { ProfessorData } from './../components/Organisms/ProfessorForm';

type UseUpdateProfessorResponse = {
    update: (professor: ProfessorData) => Promise<UpdateProfessorResponse>
}

type UpdateProfessorResponse = {
    error: boolean;
}

const useUpdateProfessor = (): UseUpdateProfessorResponse => {
    const { session } = useSession();

    const update = async (professor: ProfessorData) => {
        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/professor`, {
            method: 'PUT',
            body: JSON.stringify({ professor }),
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

export default useUpdateProfessor;
