import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  direction: 'left' | 'right';
}

const ArrowButtonLeft: React.FC<Props> = ({ onClick, disabled, direction }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-2.5 border text-sm lg:text-base rounded-lg bg-ktHeaderGray border-ktAppointmentBg placeholder-gray-400 text-ktOrange focus:ring-blue-500 focus:border-blue-500 cursor-pointer`}
      disabled={disabled}
    >
      {direction === 'right' ? (
        <>
          <span className='hidden lg:inline'>Naredna</span>
          <BsArrowRight className='arrow-icon' />
        </>
      ) : (
        <>
          <BsArrowLeft className='arrow-icon' />
          <span className='hidden lg:inline'>Prethodna</span>
        </>
      )}
    </button>
  );
};

export default ArrowButtonLeft;
