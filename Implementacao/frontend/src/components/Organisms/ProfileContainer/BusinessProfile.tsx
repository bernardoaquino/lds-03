import React, { useState } from 'react';

/** Types */
import { Form } from '../../../hooks/useForm';

/** Hooks */
import useBusiness from '../../../hooks/useBusiness';
import useUpdateBusiness from '../../../hooks/useUpdateBusiness';

/** Components */
import Button from '../../Atoms/Button';
import BusinessForm, { BusinessData } from '../BusinessForm';
import Modal from '../../Molecules/Modal';

/** Style */
import * as El from './ProfileContainer.style';

const BusinessProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { business, refetch } = useBusiness(); 
  const { update } = useUpdateBusiness();

  const handleSubmit = (formValues: Form) => {
    update(formValues as BusinessData).then(response => {
      if (!response.error) {
        refetch();
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Header>
        <El.Name>{business?.name}</El.Name>
        <Button color={'primary'}>editar</Button>
      </El.Header>
      <Modal
        title={'editar dados'}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        content={(
          <BusinessForm 
            editMode
            values={business} 
            onSubmit={handleSubmit} 
          />
        )}
      />
    </El.Wrapper>
  )
}

export default BusinessProfile;
