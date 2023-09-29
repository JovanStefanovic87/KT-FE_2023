import { CloseBtnProps } from '@/app/helpers/interfaces';

const CloseBtn: React.FC<CloseBtnProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className='bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold'
      style={{ marginRight: '10px' }}
    >
      Zatvori
    </button>
  );
};

export default CloseBtn;
