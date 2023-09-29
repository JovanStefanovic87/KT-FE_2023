import { InfoModalProps } from '@/app/helpers/interfaces';
import { animationClass } from '@/app/helpers/universalFunctions';
import InfoModalContainer from './ModalContainer';

const InfoModal: React.FC<InfoModalProps> = ({ showInfoModal, setShowInfoModal }) => {
  const isVisible = showInfoModal.isVisible;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onClose = () => setShowInfoModal({ ...showInfoModal, isVisible: false });

  return (
    <InfoModalContainer isVisible={isVisible} onClose={onClose}>
      <div
        className={`bg-white rounded-lg p-4 md:p-8 transition-all transform ${animationClass(
          isVisible,
        )} shadow-lg`}
        onClick={handleModalClick}
      >
        <div className='font-sans text-sm md:text-base text-gray-700 leading-6 tracking-wide mb-4'>
          <h2 className='text-xl md:text-3xl font-bold text-blue-600 mb-4'>Obaveštenje</h2>
          <p className='text-sm md:text-base mb-2'>{showInfoModal.text}</p>
        </div>
        <button
          onClick={onClose}
          className='bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold float-right'
        >
          Zatvori
        </button>
      </div>
    </InfoModalContainer>
  );
};

export default InfoModal;
