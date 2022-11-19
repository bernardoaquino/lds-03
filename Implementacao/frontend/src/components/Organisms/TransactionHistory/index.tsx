import React, { useEffect } from 'react';

/** Hooks */
import useTransactionHistory from '../../../hooks/useTransactionHistory';

/** Components */
import List from '../../Atoms/List';

/** Styles */
import * as El from './TransactionHistory.style';

type TransactionHistoryProps = {
    refetch?: boolean;
    updateRefetch?: Function
}

const TransactionHistory = ({
    refetch, 
    updateRefetch
}: TransactionHistoryProps) => {
    const { history, refetch: refetchTransactionHistory } = useTransactionHistory();

    useEffect(() => {
        if (refetch) {
            refetchTransactionHistory();
            updateRefetch?.();
        }
    }, [refetch, refetchTransactionHistory, updateRefetch]);

    return (
        <List 
            items={history}
            render={(transaction: any) => transaction?.cupomGerado ? (
                <El.Transaction>
                    <El.DataEntry>
                        <b>Vantagem: </b> {transaction.vantagemId.nome}
                    </El.DataEntry>
                    <El.DataEntry>
                        <b>Valor: </b> {transaction.vantagemId.custoMoedas}
                    </El.DataEntry>
                    <El.DataEntry>
                        <b>Cupom gerado: </b> {transaction.cupomGerado}
                    </El.DataEntry>
                </El.Transaction>
            ) : (
                <El.Transaction>
                    <El.DataEntry>
                        <b>Valor: </b> {transaction.valor}
                    </El.DataEntry>
                    <El.DataEntry>
                        <b>Motivo: </b> {transaction.motivo}
                    </El.DataEntry>
                </El.Transaction>
            )}
        />
    )
}

export default TransactionHistory;
