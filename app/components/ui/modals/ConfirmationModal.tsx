import Backdrop from '../Backdrop';

type ConfirmationModalProps = {
  text: string;
  setShowConfirmation: React.Dispatch<
    React.SetStateAction<{ isVisible: boolean; delete: boolean; appointmentId: string }>
  >;
  showConfirmation: { isVisible: boolean; delete: boolean; appointmentId: string };
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  text,
  setShowConfirmation,
  showConfirmation,
}) => {
  const animationClass = showConfirmation.isVisible
    ? 'ease-out duration-300 opacity-100'
    : 'ease-in duration-200 opacity-0';

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          showConfirmation.isVisible ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`bg-white rounded-lg p-4 md:p-8 transition-all transform ${animationClass} shadow-lg`}
          onClick={handleModalClick}
        >
          <div className="font-sans text-sm md:text-base text-gray-700 leading-6 tracking-wide mb-4">
            {text}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() =>
                setShowConfirmation({ ...showConfirmation, delete: true, isVisible: false })
              }
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold"
              style={{ marginRight: '10px' }} // Add margin between buttons
            >
              Obriši
            </button>
            <button
              onClick={() => setShowConfirmation({ ...showConfirmation, isVisible: false })}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold"
            >
              Zatvori
            </button>
          </div>
        </div>
      </div>
      <Backdrop onClick={() => {}} isVisible={showConfirmation.isVisible} />
    </>
  );
};

export default ConfirmationModal;
