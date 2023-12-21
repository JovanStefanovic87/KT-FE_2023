import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  value: string;
  isVisible?: boolean;
  onClick?: (event: React.FormEvent) => void;
  href: string;
}

const NavBtn: React.FC<Props> = ({ isVisible = true, value, href }) => {
  const pathname = usePathname();

  const isActive = () => {
    return pathname === href
      ? 'text-ktOrange font-bold border-b-2 border-ktOrange transition duration-medium'
      : 'transition duration-medium text-white hover:text-ktOrange';
  };

  return (
    <div
      className={`${
        isVisible ? 'flex' : 'hidden'
      } text-white cursor-pointer rounded-md transition duration-300 hover:bg-gray-700 hover:text-white hover:border-gray-600 active:border-white`}
    >
      <Link href={href} className={`relative block w-full py-2 px-4 ${isActive()}`}>
        {value}
      </Link>
    </div>
  );
};

export default NavBtn;
