import { ChildrenProps } from '@/app/helpers/interfaces';

const AppointmentServicesNameContainer: React.FC<ChildrenProps> = ({ children }) => (
  <ul className='list-disc'>{children}</ul>
);

export default AppointmentServicesNameContainer;
