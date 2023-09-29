import { AppointmentModalProps } from '@/app/helpers/interfaces';
import ModalContainer from './ModalContainer';

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  totalPrice,
  services,
  setAppontmentInfo,
  appontmentInfo,
}) => {
  const appointmentServices = appontmentInfo.appointmentData?.services || [];
  const isVisible = appontmentInfo.isVisible;
  const animationClass = isVisible
    ? 'ease-out duration-300 opacity-100'
    : 'ease-in duration-200 opacity-0';

  const onClose = () => setAppontmentInfo({ ...appontmentInfo, isVisible: false });

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalContainer isVisible={isVisible} onClose={onClose}>
      <div
        className={`bg-white rounded-lg p-4 md:p-8 transition-all transform ${animationClass} shadow-lg`}
        onClick={handleModalClick}
      >
        <div className='font-sans text-sm md:text-base text-gray-700 leading-6 tracking-wide mb-4'></div>
        <div>
          <h2 className='text-xl md:text-3xl font-bold text-blue-600 mb-4'>
            Uspešno ste zakazali termin
          </h2>
          <p className='text-sm md:text-base mb-2'>
            Termin:{' '}
            {`${appontmentInfo.appointmentData?.date} u ${appontmentInfo.appointmentData?.time}h`}
          </p>
          <p className='text-sm md:text-base mb-2'>
            Klijent: {appontmentInfo.appointmentData?.client}
          </p>
          <p className='text-sm md:text-base mb-2'>Usluge: {appointmentServices.join(', ')}</p>
          <p className='text-sm md:text-base mb-2'>
            Salon: {appontmentInfo.appointmentData?.serviceProvider}
          </p>
          <p className='text-sm md:text-base mb-2'>
            Radnik: {appontmentInfo.appointmentData?.employee}
          </p>
          <p className='text-lg md:text-xl font-bold text-green-600 mb-2'>
            Ukupna cena: {`${totalPrice(appointmentServices, services)} RSD`}{' '}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className='bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold float-right'
      >
        Zatvori
      </button>
    </ModalContainer>
  );
};

export default AppointmentModal;
