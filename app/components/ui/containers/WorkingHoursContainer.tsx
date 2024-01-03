import { useSelector } from 'react-redux';
import { RootState } from '../../../globalRedux/store';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const WorkingHoursContainer: React.FC<Props> = ({ isOpen, children }) => {
  const user = useSelector((state: RootState) => state.user);
  const isAdmin = user.userType === 'admin';

  if (!isOpen || !isAdmin) return null;

  return (
    <div className='fixed inset-0 h-list top-header flex justify-center z-3'>
      <div className='bg-white w-full md:w-2/3 rounded-lg shadow-lg overflow-auto'>{children}</div>
    </div>
  );
};

export default WorkingHoursContainer;
