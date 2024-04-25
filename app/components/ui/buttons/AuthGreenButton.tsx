interface Props {
  value?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AuthGreenButton: React.FC<Props> = ({ value = 'Registruj se', onClick }) => {
  return (
    <button
      type='button'
      className='w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition duration-300 ease-in-out'
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default AuthGreenButton;
