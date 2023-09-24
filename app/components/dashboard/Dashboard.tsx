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
      <button
        onClick={handleOpenWorkingHoursForm}
        className="block py-2 px-4 rounded border border-solid border-gray-600 hover:bg-gray-600"
      >
        Radno vreme
      </button>
      <WorkingHoursModal isOpen={isWorkingHoursFormOpen}>
        <WorkingHoursForm handleCloseWorkingHoursForm={handleCloseWorkingHoursForm} />
      </WorkingHoursModal>
    </Container>
  );
};

export default Dashboard;
