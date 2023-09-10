// pages/AppointmentPage.js
import Calendar from '../components/calendar/Calendar';
import '../../styles/globals.css';

const AppointmentPage = () => {
  return (
    <div className="flex flex-row justify-start left-0">
      <div className="block w-96 bg-white" style={{ height: 'calc(100vh - 68px)' }}></div>
      <Calendar />
    </div>
  );
};

export default AppointmentPage;
