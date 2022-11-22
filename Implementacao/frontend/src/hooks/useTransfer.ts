import React from 'react';
import { toast } from 'react-toastify';

/** Hooks */
import { useSession } from "../providers/Auth"

/** Types */
import { TransferData } from './../components/Organisms/TransferForm';

type UseTransferResponse = {
    transfer: (transfer: TransferData) => Promise<TransferResponse>
}

type TransferResponse = {
    error: boolean;
}

const BASE_API_URL = `${process.env.REACT_APP_API_BASE_URL}/transfer`;

const useTransfer = (): UseTransferResponse => {
    const { session } = useSession();

    const transfer = async (transfer: TransferData) => {
        const { studentId, ...transferData } = transfer;

        const responseData = await fetch(BASE_API_URL, {
            method: 'POST',
            body: JSON.stringify({
                transfer: transferData,
                studentId
            }),
            headers: session.authHeaders
        })

        const sentMoneySuccessfully = responseData.status === 201;

        if (sentMoneySuccessfully) {
            toast.success('Moedas enviadas com sucesso');
        } else {
            toast.error('Ocorreu um erro ao enviar as moedas, cheque o seu saldo');
        }

        return {
            error: sentMoneySuccessfully
        }
    }

    return {
        transfer
    };
};

export default useTransfer;
