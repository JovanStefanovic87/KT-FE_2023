interface PrimaryBtnProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
  buttonText: string;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ onClick, isDisabled, buttonText }) => {
  return (
    <button
      type='button'
      className={`px-4 py-2 rounded-md ${
        isDisabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

export default PrimaryBtn;
