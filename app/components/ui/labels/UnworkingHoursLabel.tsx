interface Props {
  time: string;
}

const UnworkingHoursLabel: React.FC<Props> = ({ time }) => {
  return (
    <div className='flex flex-col justify-center h-appointmentSlot min-w-slotsWidth max-w-slotsWidth text-center font-bold bg-black text-white-700 cursor-not-allowed rounded-lg select-none'>
      <span className='text-white-700 text-xl font-bold'>{time}</span>
      Zatvoreno
    </div>
  );
};

export default UnworkingHoursLabel;
