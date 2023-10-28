const SpinnerSmall: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-appointmentSlot w-slotsWidth bg-ktCyan'>
      <div className='relative animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid'></div>
    </div>
  );
};

export default SpinnerSmall;
