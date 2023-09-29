import { ChildrenProps } from '@/app/helpers/interfaces';

const AppointmentContainer: React.FC<ChildrenProps> = ({ children }) => (
  <div className='flex justify-center relative w-slotsWidth min-w-slotsWidth rounded-lg'>
    {children}
  </div>
);

export default AppointmentContainer;
