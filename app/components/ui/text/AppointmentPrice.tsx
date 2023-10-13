import { totalPrices } from '@/app/helpers/universalFunctions';
import { AppointmentServicesProps } from '@/app/helpers/interfaces';

const AppointmentPrice: React.FC<AppointmentServicesProps> = ({ appointmentServices }) => (
  <div className='text-base font-bold'>{`${totalPrices(appointmentServices)} RSD`}</div>
);

export default AppointmentPrice;
