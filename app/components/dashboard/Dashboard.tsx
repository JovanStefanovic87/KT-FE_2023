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
  const user = useSelector((state: RootState) => state.user);
  const userType: string = user.userType;
  const isAdmin = userType === 'admin';
  const [isWorkingHoursFormOpen, setIsWorkingHoursFormOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(true);
  };

  const handleCloseWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(false);
  };

  const handleSaveCompany = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/company/newcompany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Soxer Company' }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create company: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Company created:', data);
    } catch (error) {
      console.error('Error creating company:', error);
      setError((error as Error).message || 'Failed to create company');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardContainer>
      <SideBarBtn onClick={handleOpenWorkingHoursForm} isVisible={isAdmin} value='Radno vreme' />
      <FlexGrow />

      <button disabled={isLoading} onClick={handleSaveCompany}>
        {isLoading && 'Creating Company...'}
        {error && <p>{error}</p>}
        {!error && !isLoading && 'Create Company'}
      </button>
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
