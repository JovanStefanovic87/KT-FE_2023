import { AppointmentModalProps } from '@/app/helpers/interfaces';
import ModalContainer from '../containers/ModalContainer';
import BlueTitle from '../text/BlueTitle';
import CommonText from '../text/CommonText';
import GreenText from '../text/GreenText';
import PrimaryButton from '../buttons/PrimaryButton';
import ButtonMtRightFloatCintainer from '../containers/ButtonMtRightFloatCintainer';

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
        <BlueTitle title='Uspešno ste zakazali termin' />
        <CommonText>
          Termin:{' '}
          {`${appontmentInfo.appointmentData?.date} u ${appontmentInfo.appointmentData?.time}h`}
        </CommonText>
        <CommonText>Klijent: {appontmentInfo.appointmentData?.client}</CommonText>
        <CommonText>Usluge: {appointmentServices.join(', ')}</CommonText>
        <CommonText>Salon: {appontmentInfo.appointmentData?.serviceProvider}</CommonText>
        <CommonText>Radnik: {appontmentInfo.appointmentData?.employee}</CommonText>
        <CommonText>Ukupna cena: {`${totalPrice(appointmentServices, services)} RSD`} </CommonText>
        <GreenText>Ukupna cena: {`${totalPrice(appointmentServices, services)} RSD`} </GreenText>
      </div>
      <ButtonMtRightFloatCintainer>
        <PrimaryButton onClick={onClose} buttonText='Zatvori' type='close' />
      </ButtonMtRightFloatCintainer>
    </ModalContainer>
  );
};

export default AppointmentModal;
