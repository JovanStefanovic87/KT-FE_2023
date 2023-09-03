import { ModalInfoType } from '../../helpers/interfaces';

interface Props {
  modalInfo: ModalInfoType;
  totalPrice: (services: string[], servicesList: any[]) => number;
  services: any[];
}

export const AppointmentModal: React.FC<Props> = ({ modalInfo, totalPrice, services }) => {
  const appointmentServices = modalInfo.appointmentData?.services || [];

  return (
    <div>
      <h2 className="text-xl md:text-3xl font-bold text-blue-600 mb-4">
        Uspešno ste zakazali termin
      </h2>
      <p className="text-sm md:text-base mb-2">
        Termin: {`${modalInfo.appointmentData?.date} u ${modalInfo.appointmentData?.time}h`}
      </p>
      <p className="text-sm md:text-base mb-2">Klijent: {modalInfo.appointmentData?.client}</p>
      <p className="text-sm md:text-base mb-2">Usluge: {appointmentServices.join(', ')}</p>
      <p className="text-sm md:text-base mb-2">
        Salon: {modalInfo.appointmentData?.serviceProvider}
      </p>
      <p className="text-sm md:text-base mb-2">Radnik: {modalInfo.appointmentData?.employee}</p>
      <p className="text-lg md:text-xl font-bold text-green-600 mb-2">
        Ukupna cena: {`${totalPrice(appointmentServices, services)} RSD`}{' '}
      </p>
    </div>
  );
};

export default AppointmentModal;
