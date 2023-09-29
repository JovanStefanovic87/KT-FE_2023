import Backdrop from '../Backdrop';
import { animationClass } from '@/app/helpers/universalFunctions';
import { ModalContainerProps } from '@/app/helpers/interfaces';

const ModalContainer: React.FC<ModalContainerProps> = ({ isVisible, onClose, children }) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isVisible ? 'visible' : 'invisible'
        }`}
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-lg p-4 md:p-8 transition-all transform ${animationClass(
            isVisible,
          )} shadow-lg`}
          onClick={handleModalClick}
        >
          <div className='font-sans text-sm md:text-base text-gray-700 leading-6 tracking-wide mb-4'>
            {children}
          </div>
        </div>
      </div>
      <Backdrop onClick={onClose} isVisible={isVisible} />
    </>
  );
};

export default ModalContainer;
