import Calendar from '../components/calendar/Calendar';
import '../../styles/globals.css';
import Dashboard from '../components/dashboard/Dashboard';
import Main from '../components/layout/Main';

const AppointmentPage = () => {
  return (
    <div className='flex flex-row justify-start left-0 h-main'>
      <Main>
        <Calendar />
      </Main>
      <Dashboard />
    </div>
  );
};

export default AppointmentPage;
