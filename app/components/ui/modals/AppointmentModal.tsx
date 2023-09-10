import { AppointmentInfoType } from '../../../helpers/interfaces';
import InfoModalContainer from './InfoModalContainer';
import InfoModal from './InfoModalContainer';

interface Props {
  totalPrice: (services: string[], servicesList: any[]) => number;
  services: any[];
  setAppontmentInfo: React.Dispatch<React.SetStateAction<AppointmentInfoType>>;
  appontmentInfo: AppointmentInfoType;
}

export const AppointmentModal: React.FC<Props> = ({
  totalPrice,
  services,
  setAppontmentInfo,
  appontmentInfo,
}) => {
  const appointmentServices = appontmentInfo.appointmentData?.services || [];
  const isVisible = appontmentInfo.isVisible;
  const onClose = () => setAppontmentInfo({ ...appontmentInfo, isVisible: false });

  return (
    <InfoModalContainer isVisible={isVisible} onClose={onClose}>
      <div>
        <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-4">
          Uspešno ste zakazali termin
        </h2>
        <p className="text-sm md:text-base mb-2">
          Termin:{' '}
          {`${appontmentInfo.appointmentData?.date} u ${appontmentInfo.appointmentData?.time}h`}
        </p>
        <p className="text-sm md:text-base mb-2">
          Klijent: {appontmentInfo.appointmentData?.client}
        </p>
        <p className="text-sm md:text-base mb-2">Usluge: {appointmentServices.join(', ')}</p>
        <p className="text-sm md:text-base mb-2">
          Salon: {appontmentInfo.appointmentData?.serviceProvider}
        </p>
        <p className="text-sm md:text-base mb-2">
          Radnik: {appontmentInfo.appointmentData?.employee}
        </p>
        <p className="text-lg md:text-xl font-bold text-green-600 mb-2">
          Ukupna cena: {`${totalPrice(appointmentServices, services)} RSD`}{' '}
        </p>
      </div>
    </InfoModalContainer>
  );
};

export default AppointmentModal;
