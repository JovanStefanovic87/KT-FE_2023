const Spinner: React.FC = () => {
  return (
    <div className='absolute inset-0 flex items-center justify-center z-50 opacity-75'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid'></div>
    </div>
  );
};

export default Spinner;
