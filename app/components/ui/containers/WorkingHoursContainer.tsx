interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const WorkingHoursContainer: React.FC<Props> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 h-workingHoursModal top-header flex justify-center z-50'>
      <div className='bg-white w-full md:w-2/3 rounded-lg shadow-lg z-50 overflow-auto'>
        {children}
      </div>
    </div>
  );
};

export default WorkingHoursContainer;
