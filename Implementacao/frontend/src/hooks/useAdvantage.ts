import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { AdvantageData } from '../components/Organisms/AdvantageForm';

type UseAcquireAdvantageResponse = {
    acquireAdvantage: Function;
}

type UseCreateAdvantageResponse = {
    createAdvantage: Function;
}

type UseAdvantagesResponse = {
    advantages: any[]
    isLoading: boolean;
    error: boolean;
    refetch: Function;
}

const BASE_API_URL = `${process.env.REACT_APP_API_BASE_URL}/advantage`;

export const useCreateAdvantage = (): UseCreateAdvantageResponse => {
    const { session } = useSession();

    const createAdvantage = async (advantage: AdvantageData) => {    
        const response = await fetch(BASE_API_URL, {
          method: 'POST',
          body: JSON.stringify({ advantage }),
          headers: session.authHeaders
        });
    
        const advantageAcquiredSuccessfully = response.status === 201;
        
        if (advantageAcquiredSuccessfully) {
          toast.success("Vantagem criada!");
        } else {
          const errorMessage = await response.json();
    
          toast.error(errorMessage);
        }
    
        return {
          advantageAcquiredSuccessfully,
          error: !advantageAcquiredSuccessfully,
        }
    }
    
    return { 
        createAdvantage
    };
};

export const useAcquireAdvantage = (): UseAcquireAdvantageResponse => {
    const { session, updateSession } = useSession();

    const acquireAdvantage = async (advantageId: number, cost: number) => {    
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/student/advantage`, {
          method: 'POST',
          body: JSON.stringify({ advantageId }),
          headers: session.authHeaders
        });
    
        const advantageAcquiredSuccessfully = response.status === 201;
        
        if (advantageAcquiredSuccessfully) {
          toast.success("Vantagem adquirida!");

          updateSession({
            ...session,
            data: {
              ...session.data,
              qtdeMoedas: session?.data?.qtdeMoedas - cost
            }
          });
        } else {
          const errorMessage = await response.json();
    
          toast.error(errorMessage);
        }
    
        return {
          advantageAcquiredSuccessfully,
          error: !advantageAcquiredSuccessfully,
        }
    }
    
    return { 
        acquireAdvantage
    };
};

export const useAdvantages = (isBusiness: boolean = false): UseAdvantagesResponse => {
    const { session } = useSession();
    const [advantages, setAdvantages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getAdvantagesData = useCallback(async (keepIsLoadingState = false) => {
        !keepIsLoadingState && setIsLoading(true);

        const endpoint = isBusiness ? 'business' : 'all'

        const responseData = await fetch(`${BASE_API_URL}/${endpoint}`, {
            headers: session.authHeaders
        })

        if (responseData.status === 200) {
            const _advantages = (await responseData.json()).advantages;
            
            setAdvantages(_advantages);
            setError(false);
        } else {
            setError(true);
            toast.error('Ocorreu um erro ao recuperar os dados da empresa');
        }

        setIsLoading(false);
    }, [session.authHeaders]);

    useEffect(() => {
        getAdvantagesData();
    }, [getAdvantagesData]);

    return {
        advantages,
        isLoading,
        error,
        refetch: () => getAdvantagesData(true),
    };
};
