interface WorkingHoursContainerProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const WorkingHoursContainer: React.FC<WorkingHoursContainerProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white w-full md:w-2/3 rounded-lg shadow-lg z-50 h-workingHoursModal overflow-auto'>
        {children}
      </div>
    </div>
  );
};

export default WorkingHoursContainer;
