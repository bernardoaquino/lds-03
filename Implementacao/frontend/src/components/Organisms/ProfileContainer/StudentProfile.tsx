import React, { useState } from 'react';

/** Types */
import { Form } from '../../../hooks/useForm';

/** Hooks */
import { useAcquireAdvantage, useAdvantages } from '../../../hooks/useAdvantage';
import useStudent from '../../../hooks/useStudent';
import useUpdateStudent from '../../../hooks/useUpdateStudent';

/** Components */
import Button from '../../Atoms/Button';
import List from '../../Atoms/List';
import Modal from '../../Molecules/Modal';
import StudentForm, { StudentData } from '../StudentForm';
import TransactionHistory from '../TransactionHistory';

/** Style */
import * as El from './ProfileContainer.style';

const StudentProfile = () => {
  const [updateTransferHistory, setUpdateTransferHistory] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { acquireAdvantage } = useAcquireAdvantage();
  const { advantages, refetch: refetchAdvantages } = useAdvantages(); 
  const { student, refetch } = useStudent();
  const { update } = useUpdateStudent();

  const handleSubmit = (formValues: Form) => {
    update(formValues as StudentData).then(response => {
      if (!response.error) {
        refetch();
        setIsModalOpen(false);
      }
    });
  }

  const handleAcquireAdvantage = (advantageId: number) => {
    acquireAdvantage(advantageId).then((response: any) => {
      if (!response.error) {
        refetchAdvantages();
        setUpdateTransferHistory(true);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Header>
        <El.Name>{student?.nome}</El.Name>
        <Button onClick={() => setIsModalOpen(true)} color={'primary'}>editar</Button>
      </El.Header>
      <El.DataEntry>
        <b>CPF</b>: {student?.cpf}
      </El.DataEntry>
      <El.DataEntry>
        <b>RG</b>: {student?.rg}
      </El.DataEntry>
      <El.DataEntry>
        <b>Endereco</b>: {student?.endereco}
      </El.DataEntry>
      <El.DataEntry>
        <b>Quantidade de moedas</b>: {student?.qtdeMoedas}
      </El.DataEntry>

      <El.Subtitle>Vantagens disponíveis</El.Subtitle>
      <List
        items={advantages}
        render={(advantage: any) => (
          <El.Card>
            <El.Wrapper>
              <El.DataEntry>
                <b>Vantagem</b>: {advantage?.nome}
              </El.DataEntry>
              <El.DataEntry>
                <b>Custo moedas</b>: {advantage?.custoMoedas}
              </El.DataEntry>
              <El.DataEntry>
                {advantage?.descricao}
              </El.DataEntry>
            </El.Wrapper>
            <Button onClick={() => handleAcquireAdvantage(advantage.id)}>adquirir</Button>
          </El.Card>
        )}
      />

      <El.Subtitle>Extrato</El.Subtitle>
      <TransactionHistory refetch={updateTransferHistory} updateRefetch={() => setUpdateTransferHistory(false)} />
      <Modal
        title={'editar dados'}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        content={(
          <StudentForm 
            editMode
            values={student} 
            onSubmit={handleSubmit} 
          />
        )}
      />
    </El.Wrapper>
  )
}

export default StudentProfile;
