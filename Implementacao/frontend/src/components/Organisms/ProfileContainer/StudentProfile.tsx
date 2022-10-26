import React, { useState } from 'react';

/** Types */
import { Form } from '../../../hooks/useForm';

/** Hooks */
import useStudent from '../../../hooks/useStudent';
import useUpdateStudent from '../../../hooks/useUpdateStudent';

/** Components */
import Button from '../../Atoms/Button';
import Modal from '../../Molecules/Modal';
import StudentForm, { StudentData } from '../StudentForm';

/** Style */
import * as El from './ProfileContainer.style';

const StudentProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
