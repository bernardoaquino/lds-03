import React, { useState } from 'react';

/** Types */
import { Form } from '../../../hooks/useForm';

/** Hooks */
import useProfessor from '../../../hooks/useProfessor';
import useTransfer from '../../../hooks/useTransfer';
import useUpdateProfessor from '../../../hooks/useUpdateProfessor';

/** Components */
import Button from '../../Atoms/Button';
import Modal from '../../Molecules/Modal';
import ProfessorForm, { ProfessorData } from '../ProfessorForm';
import TransactionHistory from '../TransactionHistory';
import TransferForm from '../TransferForm';

/** Style */
import * as El from './ProfileContainer.style';

const ProfessorProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const { professor, refetch } = useProfessor(); 
  const { update } = useUpdateProfessor();
  const { transfer } = useTransfer();

  const handleSubmit = (formValues: Form) => {
    update(formValues as ProfessorData).then(response => {
      if (!response.error) {
        refetch();
        setIsModalOpen(false);
      }
    });
  }

  const handleSubmitTransfer = (formValues: Form) => {
    transfer(formValues).then(response => {
      if (!response.error) {
        setIsTransferModalOpen(false);
      }
    })
  }

  return (
    <El.Wrapper>
      <El.Header>
        <El.Name>{professor?.nome}</El.Name>
        <Button onClick={() => setIsModalOpen(true)} color={'primary'}>editar</Button>
      </El.Header>
      <El.Transfer>
        <Button onClick={() => setIsTransferModalOpen(true)} color={'primary'}>enviar moedas</Button>
      </El.Transfer>
      <El.DataEntry>
        <b>CPF</b>: {professor?.cpf}
      </El.DataEntry>
      <TransactionHistory />
      <Modal
        title={'editar dados'}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        content={(
          <ProfessorForm 
            editMode
            values={professor} 
            onSubmit={handleSubmit} 
          />
        )}
      />
      <Modal
        title={'enviar moedas'}
        open={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)} 
        content={(
          <TransferForm
            onSubmit={handleSubmitTransfer} 
          />
        )}
      />
    </El.Wrapper>
  )
}

export default ProfessorProfile;
