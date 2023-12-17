type Props = {
  children: React.ReactNode;
};

const WeekSelectorContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className='mb-4'>
      <label className='block text-lg font-semibold'>Izaberite Nedelju:</label>
      {children}
    </div>
  );
};

export default WeekSelectorContainer;
