// pages/AppointmentPage.js
import Calendar from '../components/calendar/Calendar';
import '../../styles/globals.css';
import Dashboard from '../components/dashboard/Dashboard';

const AppointmentPage = () => {
  return (
    <div className="flex flex-row justify-start left-0">
      <Dashboard />
      <Calendar />
    </div>
  );
};

export default AppointmentPage;
