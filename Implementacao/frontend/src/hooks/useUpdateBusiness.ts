import React from 'react';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { BusinessData } from './../components/Organisms/BusinessForm';

type UseUpdateBusinessResponse = {
    update: (business: BusinessData) => Promise<UpdateBusinessResponse>
}

type UpdateBusinessResponse = {
    error: boolean;
}

const useUpdateBusiness = (): UseUpdateBusinessResponse => {
    const { session } = useSession();

    const update = async (business: BusinessData) => {
        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/empresa/${business.email}`, {
            method: 'PUT',
            body: JSON.stringify(business),
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

export default useUpdateBusiness;
