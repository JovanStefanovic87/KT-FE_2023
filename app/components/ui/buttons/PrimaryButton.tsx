interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  buttonText: string;
  type: 'close' | 'submit' | 'delete';
}

const PrimaryButton: React.FC<Props> = ({ onClick, isDisabled, buttonText = 'default', type }) => {
  const getButtonClassNames = (buttonType: string): string => {
    switch (buttonType) {
      case 'close':
        return 'bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold';
      case 'submit':
        return 'mt-4 bg-blue-500 text-white';
      case 'delete':
        return 'bg-blue-500 text-white py-2 px-4 rounded mt-4 ml-4 uppercase font-semibold';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const classNames = getButtonClassNames(type);

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`px-4 py-2 rounded-md ${
        isDisabled ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : classNames
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  );
};

export default PrimaryButton;
