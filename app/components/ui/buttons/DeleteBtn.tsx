import { DeleteBtnProps } from '@/app/helpers/interfaces';

const DeleteBtn: React.FC<DeleteBtnProps> = ({ onDelete }) => {
  return (
    <button
      onClick={onDelete}
      className='bg-blue-500 text-white py-2 px-4 rounded mt-4 uppercase font-semibold'
      style={{ marginRight: '10px' }}
    >
      Obriši
    </button>
  );
};

export default DeleteBtn;
