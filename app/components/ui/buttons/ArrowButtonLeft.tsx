import { BsArrowLeft } from 'react-icons/bs';
import { ArrowButtonsProps } from '@/app/helpers/interfaces';

const ArrowButtonLeft: React.FC<ArrowButtonsProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm lg:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer`}
      disabled={disabled}
    >
      <BsArrowLeft className='arrow-icon' />
      <span className='hidden lg:inline'>Prethodna</span>
    </button>
  );
};

export default ArrowButtonLeft;
