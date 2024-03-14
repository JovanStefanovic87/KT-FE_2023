interface Props {
  onClick: () => void;
  time: string;
}

const AppointmentBtn: React.FC<Props> = ({ onClick, time }) => {
  return (
    <button
      onClick={onClick}
      className='bg-ktCyan text-white w-full h-appointmentSlot select-none rounded-lg'
    >
      <span className='text-ktAppointmentTime text-xl font-bold'>{time}</span>
      <div>REZERVIŠI TERMIN</div>
    </button>
  );
};

export default AppointmentBtn;
