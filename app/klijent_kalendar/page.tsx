import '../../styles/globals.css';
import Dashboard from '../components/dashboard/Dashboard';
import Main from '../components/layout/Main';
import ClientCalendarContainer from '../components/ui/containers/ClientCalendarContainer';

const AppointmentPage = () => {
  return (
    <div className='flex flex-row justify-start left-0 h-main'>
      <Main>
        <ClientCalendarContainer />
      </Main>
      <Dashboard />
    </div>
  );
};

export default AppointmentPage;
