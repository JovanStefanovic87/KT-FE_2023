import Backdrop from '../Backdrop';

type InfoModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const InfoModal: React.FC<InfoModalProps> = ({ isVisible, onClose, children }) => {
  const animationClass = isVisible
    ? 'ease-out duration-300 opacity-100'
    : 'ease-in duration-200 opacity-0';

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
          className={`bg-white rounded-lg p-4 md:p-8 transition-all transform ${animationClass} shadow-lg`}
          onClick={handleModalClick}
        >
          <div className="font-sans text-sm md:text-base text-gray-700 leading-6 tracking-wide mb-4">
            {children}
          </div>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold float-right"
          >
            Zatvori
          </button>
        </div>
      </div>
      <Backdrop onClick={onClose} isVisible={isVisible} />
    </>
  );
};

export default InfoModal;
