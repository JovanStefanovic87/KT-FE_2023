'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../globalRedux/store';
import { useState } from 'react';
import DashboardContainer from '../ui/containers/DashboardContainer';
import WorkingHoursForm from '../workingHours/WorkingHoursForm';
import WorkingHoursContainer from '../ui/containers/WorkingHoursContainer';
import SideBarBtn from '../ui/buttons/SideBarBtn';
import FlexGrow from '../ui/FlexGrow';

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
    <DashboardContainer>
      <SideBarBtn onClick={handleOpenWorkingHoursForm} isVisible={isAdmin} value='Radno vreme' />
      <FlexGrow />
      <div className='mt-4'>
        <SideBarBtn
          onClick={() => {
            alert('Bicete odjavljeni kada proradi funkcija');
          }}
          value='Odjavi se'
        />
      </div>
      <WorkingHoursContainer isOpen={isWorkingHoursFormOpen}>
        <WorkingHoursForm handleCloseWorkingHoursForm={handleCloseWorkingHoursForm} />
      </WorkingHoursContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
