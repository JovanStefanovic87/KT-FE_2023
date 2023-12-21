import { animationClass } from '@/app/helpers/universalFunctions';
import ModalContainer from '../containers/ModalContainer';
import BlueTitle from '../text/BlueTitle';
import PrimaryButton from '../buttons/PrimaryButton';
import ButtonMtRightFloatCintainer from '../containers/ButtonMtRightFloatCintainer';
import CommonText from '../text/CommonText';

interface InfoModalType {
  isVisible: boolean;
  text: string;
}

interface ErrorModalType extends InfoModalType {}

interface Props {
  errorModal: ErrorModalType;
  setErrorModal: React.Dispatch<React.SetStateAction<ErrorModalType>>;
}

const ErrorModal: React.FC<Props> = ({ errorModal, setErrorModal }) => {
  const isVisible = errorModal.isVisible;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onClose = () => setErrorModal({ ...errorModal, isVisible: false });

  return (
    <ModalContainer isVisible={isVisible} onClose={onClose}>
      <div
        className={`bg-white border-solid border-red-700 rounded-lg p-4 md:p-8 transition-all transform ${animationClass(
          isVisible,
        )} shadow-lg`}
        onClick={handleModalClick}
      >
        <div className='font-sans text-sm md:text-base text-gray-700 leading-6 tracking-wide mb-4'>
          <BlueTitle title='Greška' />
          <CommonText>{errorModal.text}</CommonText>
        </div>
        <ButtonMtRightFloatCintainer>
          <PrimaryButton onClick={onClose} buttonText='Zatvori' type='close' />
        </ButtonMtRightFloatCintainer>
      </div>
    </ModalContainer>
  );
};

export default ErrorModal;
