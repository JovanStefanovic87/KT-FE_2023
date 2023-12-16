import { BsArrowLeft } from 'react-icons/bs';

interface ArrowButtonsProps {
  onClick: () => void;
  disabled?: boolean;
}

const ArrowButtonLeft: React.FC<ArrowButtonsProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-2.5 border text-sm lg:text-base rounded-lg bg-ktHeaderGray border-ktAppointmentBg placeholder-gray-400 text-ktOrange focus:ring-blue-500 focus:border-blue-500 cursor-pointer`}
      disabled={disabled}
    >
      <BsArrowLeft className='arrow-icon' />
      <span className='hidden lg:inline'>Prethodna</span>
    </button>
  );
};

export default ArrowButtonLeft;
