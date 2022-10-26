import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { BusinessData } from './../components/Organisms/BusinessForm';

type UseBusinessResponse = {
    business?: BusinessData
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

const useBusiness = (): UseBusinessResponse => {
    const { session } = useSession();
    const [business, setBusiness] = useState<BusinessData>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getBusinessData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/business`, {
            headers: session.authHeaders
        })

        if (responseData.status === 200) {
            const _business = await responseData.json();

            setBusiness(_business);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar os dados da empresa');
        }

        setIsLoading(false);
    }, [session.authHeaders]);

    useEffect(() => {
        getBusinessData();
    }, [getBusinessData]);

    return {
        business,
        isLoading,
        error,
        refetch: () => getBusinessData(true),
    };
};

export default useBusiness;
