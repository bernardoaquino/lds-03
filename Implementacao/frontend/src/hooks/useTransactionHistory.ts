import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"


type UseTransactionHistoryResponse = {
    history?: any
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

const BASE_API_URL = `${process.env.REACT_APP_API_BASE_URL}/transfer`;

const useTransactionHistory = (): UseTransactionHistoryResponse => {
    const { session } = useSession();
    const [history, setHistory] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getTransactionHistory = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const responseData = await fetch(BASE_API_URL, {
            headers: session.authHeaders
        })

        if (responseData.status === 200) {
            const _history = (await responseData.json()).transferHistory;

            setHistory(_history);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar o seu extrato');
        }

        setIsLoading(false);
    }, [session.authHeaders]);

    useEffect(() => {
        getTransactionHistory();
    }, [getTransactionHistory]);

    return {
        history,
        isLoading,
        error,
        refetch: () => getTransactionHistory(true),
    };
};

export default useTransactionHistory;
