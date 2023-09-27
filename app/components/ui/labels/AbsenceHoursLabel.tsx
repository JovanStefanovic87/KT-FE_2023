interface AbsenceHoursLabelProps {
  time: string;
  absence: string;
}

const AbsenceHoursLabel: React.FC<AbsenceHoursLabelProps> = ({ time, absence }) => {
  const colorMap: Record<string, string> = {
    'Godišnji odmor': 'bg-sky-950',
    Bolovanje: 'bg-red-950',
    Praznik: 'bg-purple-950',
  };

  return (
    <div
      className={`flex flex-col justify-center h-appointmentSlot  min-w-slotsWidth max-w-slotsWidth text-center  font-bold ${colorMap[absence]} text-white-700 cursor-not-allowed rounded-lg select-none`}
    >
      <span className='text-xl font-bold'>{time}</span>
      {absence}
    </div>
  );
};

export default AbsenceHoursLabel;
