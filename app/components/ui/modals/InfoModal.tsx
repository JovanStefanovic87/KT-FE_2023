import React from 'react';
import Backdrop from '../Backdrop';

type InfoModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Add children prop
};

const InfoModal: React.FC<InfoModalProps> = ({ isVisible, onClose, children }) => {
  const animationClass = isVisible
    ? 'ease-out duration-300 opacity-100'
    : 'ease-in duration-200 opacity-0';

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // stop event from bubbling up
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isVisible ? 'visible' : 'invisible'
        }`}
        onClick={onClose} // click on this will close the modal
      >
        <div
          className={`bg-white rounded-lg p-5 transition-all transform ${animationClass}`}
          onClick={handleModalClick} // stop event from bubbling up when modal content is clicked
        >
          {children} {/* Render children */}
          <button onClick={onClose} className="bg-blue-500 text-white py-1 px-4 rounded">
            Close
          </button>
        </div>
      </div>
      <Backdrop onClick={onClose} isVisible={isVisible} />
    </>
  );
};

export default InfoModal;
