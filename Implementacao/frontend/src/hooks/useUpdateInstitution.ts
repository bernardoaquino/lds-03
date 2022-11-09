import React from 'react';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { InstitutionData } from './../components/Organisms/InstitutionForm';

type UseUpdateInstitutionResponse = {
    update: (institution: InstitutionData) => Promise<UpdateInstitutionResponse>
}

type UpdateInstitutionResponse = {
    error: boolean;
}

const useUpdateInstitution = (): UseUpdateInstitutionResponse => {
    const { session } = useSession();

    const update = async (institution: InstitutionData) => {
        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/instituicao`, {
            method: 'PUT',
            body: JSON.stringify(institution),
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

export default useUpdateInstitution;
