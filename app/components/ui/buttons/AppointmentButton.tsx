import { CSSProperties } from 'react';

interface AppointmentButtonProps {
  onClick: () => void;
  time: string;
  style?: CSSProperties;
}

const AppointmentButton: React.FC<AppointmentButtonProps> = ({ onClick, time }) => {
  return (
    <button onClick={onClick} className="bg-ktCyan text-white w-full h-appointmentSlot">
      <span className="text-ktAppointmentTime text-xl font-bold">{time}</span>
      <div>REZERVIŠI TERMIN</div>
    </button>
  );
};

export default AppointmentButton;
