import { GiHamburgerMenu } from 'react-icons/gi';

interface Props {
  onClick: () => void;
  ariaLabel: string;
}

const HamburgerButton: React.FC<Props> = ({ onClick, ariaLabel }) => {
  return (
    <button onClick={onClick} className='text-white text-3xl' aria-label={ariaLabel}>
      <GiHamburgerMenu />
    </button>
  );
};

export default HamburgerButton;
