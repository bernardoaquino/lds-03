import React, { useState } from 'react';

/** Types */
import { Form } from '../../../hooks/useForm';

/** Hooks */
import { useAdvantages, useCreateAdvantage } from '../../../hooks/useAdvantage';
import useBusiness from '../../../hooks/useBusiness';
import useUpdateBusiness from '../../../hooks/useUpdateBusiness';

/** Components */
import AdvantageForm from '../AdvantageForm';
import Button from '../../Atoms/Button';
import BusinessForm, { BusinessData } from '../BusinessForm';
import Modal from '../../Molecules/Modal';

/** Style */
import * as El from './ProfileContainer.style';
import List from '../../Atoms/List';

const BusinessProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateAdvantageModalOpen, setIsCreateAdvantageModalOpen] = useState(false);
  const { business, refetch } = useBusiness(); 
  const { update } = useUpdateBusiness();
  const { createAdvantage } = useCreateAdvantage();
  const { advantages, refetch: refetchAdvantages } = useAdvantages(true);

  const handleSubmit = (formValues: Form) => {
    update(formValues as BusinessData).then(response => {
      if (!response.error) {
        refetch();
        setIsModalOpen(false);
      }
    });
  }

  const handleSubmitCreateAdvantage = (advantage: Form) => {
    createAdvantage(advantage).then((response: any) => {
      if (!response.error) {
        refetchAdvantages();
        setIsCreateAdvantageModalOpen(false);
      }
    });
  }

  return (
    <El.Wrapper>
      <El.Header>
        <El.Name>{business?.nome}</El.Name>
        <Button onClick={() => setIsModalOpen(true)} color={'primary'}>editar</Button>
      </El.Header>
      <El.ButtonWrapper>
        <Button onClick={() => setIsCreateAdvantageModalOpen(true)} color={'primary'}>criar vantagem</Button>
      </El.ButtonWrapper>
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
          </El.Card>
        )}
      />
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
      <Modal
        title={'criar vantagem'}
        open={isCreateAdvantageModalOpen}
        onClose={() => setIsCreateAdvantageModalOpen(false)} 
        content={(
          <AdvantageForm
            onSubmit={handleSubmitCreateAdvantage} 
          />
        )}
      />
    </El.Wrapper>
  )
}

export default BusinessProfile;
