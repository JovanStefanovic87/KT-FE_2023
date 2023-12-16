import '../../styles/globals.css';
import Dashboard from '../components/dashboard/Dashboard';
import ClientCalendar from '../components/calendar/ClientCalendar';
import Main from '../components/layout/Main';

const AppointmentPage = () => {
  return (
    <div className='flex flex-row justify-start left-0 h-main'>
      <Dashboard />
      <Main>
        <ClientCalendar />
      </Main>
    </div>
  );
};

export default AppointmentPage;
