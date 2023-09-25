'use client';
import { useState } from 'react';
import Container from './Container';
import WorkingHoursForm from './WorkingHoursForm';
import WorkingHoursModal from '../ui/modals/WorkingHoursModal';
import SideBarBtn from '../ui/buttons/SideBarBtn';

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
      <SideBarBtn onClick={handleOpenWorkingHoursForm}>
        <p className="py-2 px-4">Radno vreme</p>
      </SideBarBtn>
      <div className="flex-grow"></div>
      <div className="mt-4">
        <SideBarBtn>
          <p className="py-2 px-4">Odjava</p>
        </SideBarBtn>
      </div>
      <WorkingHoursModal isOpen={isWorkingHoursFormOpen}>
        <WorkingHoursForm handleCloseWorkingHoursForm={handleCloseWorkingHoursForm} />
      </WorkingHoursModal>
    </Container>
  );
};

export default Dashboard;
