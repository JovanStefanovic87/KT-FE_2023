import { animationClass } from '@/app/helpers/universalFunctions';
import ModalContainer from './ModalContainer';

interface InfoModalType {
  isVisible: boolean;
  text: string;
}

interface ErrorModalType extends InfoModalType {} //showInfoModal: InfoModalType; setShowInfoModal: React.Dispatch<React.SetStateAction<InfoModalType>>;

interface ErrorModalProps {
  errorModal: ErrorModalType; // isVisible: boolean; text: string;
  setErrorModal: React.Dispatch<React.SetStateAction<ErrorModalType>>; // isVisible: boolean; text: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errorModal, setErrorModal }) => {
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
          <h2 className='text-xl md:text-3xl font-bold text-blue-600 mb-4'>Greška</h2>
          <p className='text-sm md:text-base mb-2'>{errorModal.text}</p>
        </div>
        <button
          onClick={onClose}
          className='bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold float-right'
        >
          Zatvori
        </button>
      </div>
    </ModalContainer>
  );
};

export default ErrorModal;
