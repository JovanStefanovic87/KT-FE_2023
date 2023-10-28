interface FormButtonProps {
  onClick: (event: React.FormEvent) => void;
}

const CloseBtn: React.FC<FormButtonProps> = ({ onClick }) => {
  return (
    <button
      className='absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center focus:outline-none focus:bg-red-600'
      onClick={onClick}
      aria-label='Close'
    >
      <svg
        className='w-6 h-6 text-white'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  );
};

export default CloseBtn;
