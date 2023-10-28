import { ReactNode } from 'react';

type ChildrenProps = {
  children: ReactNode;
};

const AppointmentContainer: React.FC<ChildrenProps> = ({ children }) => (
  <div className='flex justify-center relative w-slotsWidth min-w-slotsWidth rounded-lg'>
    {children}
  </div>
);

export default AppointmentContainer;
