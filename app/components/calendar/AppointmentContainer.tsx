import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AppointmentContainer: React.FC<Props> = ({ children }) => (
  <div className='flex justify-center relative w-slotsWidth min-w-slotsWidth rounded-lg'>
    {children}
  </div>
);

export default AppointmentContainer;
