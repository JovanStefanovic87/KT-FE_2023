type Props = {
  children: React.ReactNode;
};

const SelectContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex self-center justify-between lg:justify-center gap-x-6 w-calendar-sm md:w-calendar-lg'>
      {children}
    </div>
  );
};

export default SelectContainer;
