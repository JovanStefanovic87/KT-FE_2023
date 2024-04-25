import { useRouter } from 'next/navigation';

const PasswordRecoveryButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/zaboravljena_lozinka');
  };

  return (
    <div className='text-center cursor-pointer' onClick={handleClick}>
      <a className='text-blue-500 hover:underline'>Zaboravili ste lozinku?</a>
    </div>
  );
};

export default PasswordRecoveryButton;
