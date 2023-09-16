'use client';
import { useState } from 'react';
import Container from './Container';
import WorkingHoursForm from './WorkingHoursForm';
import WorkingHoursModal from '../ui/modals/WorkingHoursModal';

const Dashboard = () => {
  const [isWorkingHoursFormOpen, setIsWorkingHoursFormOpen] = useState(false);

  const handleOpenWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(true);
  };

  const handleCloseWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(false);
  };

  return (
    <Container>
      <button onClick={handleOpenWorkingHoursForm}>Set Working Hours</button>
      <WorkingHoursModal onClose={handleCloseWorkingHoursForm} isOpen={isWorkingHoursFormOpen}>
        <WorkingHoursForm />
      </WorkingHoursModal>
    </Container>
  );
};

export default Dashboard;
