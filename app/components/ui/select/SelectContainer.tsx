type ChildrenProps = {
  children: React.ReactNode;
};

const SelectContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className='flex self-center justify-center gap-x-6 w-calendar-sm md:w-calendar-lg'>
      {children}
    </div>
  );
};

export default SelectContainer;
