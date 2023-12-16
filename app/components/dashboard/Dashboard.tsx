'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../globalRedux/store';
import { useState } from 'react';
import Container from './Container';
import WorkingHoursForm from './workingHours/WhForm';
import WorkingHoursModal from './workingHours/WhContainer';
import SideBarBtn from '../ui/buttons/SideBarBtn';

const Dashboard = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const userType: string = userInfo.userType;
  const isAdmin = userType === 'admin';
  const [isWorkingHoursFormOpen, setIsWorkingHoursFormOpen] = useState(false);

  const handleOpenWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(true);
  };

  const handleCloseWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(false);
  };

  return (
    <Container>
      <SideBarBtn onClick={handleOpenWorkingHoursForm} isVisible={isAdmin} value='Radno vreme' />
      <div className='flex-grow'></div>
      <div className='mt-4'>
        <SideBarBtn
          onClick={() => {
            alert('Bicete odjavljeni kada proradi funkcija');
          }}
          value='Odjavi se'
        />
      </div>
      <WorkingHoursModal isOpen={isWorkingHoursFormOpen}>
        <WorkingHoursForm handleCloseWorkingHoursForm={handleCloseWorkingHoursForm} />
      </WorkingHoursModal>
    </Container>
  );
};

export default Dashboard;
