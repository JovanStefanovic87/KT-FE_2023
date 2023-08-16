import { CSSProperties } from 'react';

interface AppointmentButtonProps {
  onClick: () => void;
  time: string;
  style?: CSSProperties;
}

const AppointmentButton: React.FC<AppointmentButtonProps> = ({ onClick, time, style }) => {
  return (
    <button
      onClick={onClick}
      className="bg-ktCyan text-white rounded w-full h-full Button"
      style={style}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '1rem',
        }}
      >
        <div>
          <span className="time-text">{time}</span>
        </div>
        <div>REZERVIŠI TERMIN</div>
      </div>
    </button>
  );
};

export default AppointmentButton;
