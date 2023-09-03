import { CSSProperties } from 'react';

interface AppointmentBtnProps {
  onClick: () => void;
  time: string;
  style?: CSSProperties;
}

const AppointmentBtn: React.FC<AppointmentBtnProps> = ({ onClick, time }) => {
  return (
    <button onClick={onClick} className="bg-ktCyan text-white w-full h-appointmentSlot rounded-lg">
      <span className="text-ktAppointmentTime text-xl font-bold">{time}</span>
      <div>REZERVIŠI TERMIN</div>
    </button>
  );
};

export default AppointmentBtn;
