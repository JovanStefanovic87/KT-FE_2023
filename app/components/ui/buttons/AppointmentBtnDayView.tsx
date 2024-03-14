interface Props {
  onClick: () => void;
  time: string;
}

const AppointmentBtnDayView: React.FC<Props> = ({ onClick, time }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-ktCyan text-white h-appointmentSlot select-none rounded-lg w-slotsWidth`}
    >
      <span className='text-ktAppointmentTime text-xl font-bold'>{time}</span>
      <div>REZERVIŠI TERMIN</div>
    </button>
  );
};

export default AppointmentBtnDayView;
