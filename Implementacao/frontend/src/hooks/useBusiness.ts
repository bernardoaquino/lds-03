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

        const _business = session?.data;

        if (_business) {
            setBusiness(_business);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar os dados');
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
