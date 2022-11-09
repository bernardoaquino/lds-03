import React from 'react';

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

const useTransfer = (): UseTransferResponse => {
    const { session } = useSession();

    const transfer = async (transfer: TransferData) => {
        const responseData = await fetch(`${process.env.REACT_APP_API_BASE_URL}/transacao`, {
            method: 'POST',
            body: JSON.stringify(transfer),
            headers: session.authHeaders
        })

        return {
            error: responseData.status !== 200
        }
    }

    return {
        transfer
    };
};

export default useTransfer;
