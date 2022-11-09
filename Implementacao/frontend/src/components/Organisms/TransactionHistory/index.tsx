import React from 'react';

/** Hooks */
import useTransactionHistory from '../../../hooks/useTransactionHistory';

/** Components */
import List from '../../Atoms/List';

/** Styles */
import * as El from './TransactionHistory.style';

const TransactionHistory = () => {
    const { history } = useTransactionHistory();

    return (
        <List 
            items={history}
            render={(transaction: any) => (
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
