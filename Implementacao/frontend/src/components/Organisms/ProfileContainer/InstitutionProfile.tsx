import React, { useState } from 'react';

/** Types */
import { Form } from '../../../hooks/useForm';

/** Hooks */
import useInstitution from '../../../hooks/useInstitution';
import useUpdateInstitution from '../../../hooks/useUpdateInstitution';

/** Components */
import Button from '../../Atoms/Button';
import InstitutionForm, { InstitutionData } from '../InstitutionForm';
import Modal from '../../Molecules/Modal';

/** Style */
import * as El from './ProfileContainer.style';

const InstitutionProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { institution, refetch } = useInstitution(); 
  const { update } = useUpdateInstitution();

  const handleSubmit = (formValues: Form) => {
    update(formValues as InstitutionData).then(response => {
      if (!response.error) {
        refetch();
        setIsModalOpen(false);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Header>
        <El.Name>{institution?.nome}</El.Name>
        <Button onClick={() => setIsModalOpen(true)} color={'primary'}>editar</Button>
      </El.Header>
      <Modal
        title={'editar dados'}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        content={(
          <InstitutionForm 
            editMode
            values={institution} 
            onSubmit={handleSubmit} 
          />
        )}
      />
    </El.Wrapper>
  )
}

export default InstitutionProfile;
