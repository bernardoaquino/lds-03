import React, { useState } from 'react';

/** Types */
import { Form } from '../../../hooks/useForm';

/** Hooks */
import useProfessor from '../../../hooks/useProfessor';
import useUpdateProfessor from '../../../hooks/useUpdateProfessor';

/** Components */
import Button from '../../Atoms/Button';
import Modal from '../../Molecules/Modal';
import ProfessorForm, { ProfessorData } from '../ProfessorForm';

/** Style */
import * as El from './ProfileContainer.style';

const ProfessorProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { professor, refetch } = useProfessor(); 
  const { update } = useUpdateProfessor();

  const handleSubmit = (formValues: Form) => {
    update(formValues as ProfessorData).then(response => {
      if (!response.error) {
        refetch();
        setIsModalOpen(false);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Header>
        <El.Name>{professor?.nome}</El.Name>
        <Button onClick={() => setIsModalOpen(true)} color={'primary'}>editar</Button>
      </El.Header>
      <El.DataEntry>
        <b>CPF</b>: {professor?.cpf}
      </El.DataEntry>
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
    </El.Wrapper>
  )
}

export default ProfessorProfile;
