import { SubmitBtnProps } from '@/app/helpers/interfaces';

const SubmitBtn: React.FC<SubmitBtnProps> = ({ onClick, isDisabled, buttonText }) => {
  return (
    <button
      className={`mt-4 px-4 py-2 rounded-md ${
        isDisabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

export default SubmitBtn;
