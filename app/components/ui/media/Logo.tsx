import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/images/logo.png';

const Logo = () => {
  return (
    <div className='h-logo w-logo relative mr-0 lg:mr-10'>
      <Link href='/'>
        <div className='absolute h-logo w-logo'>
          <Image
            src={logo}
            alt='Your Logo'
            priority
            fill
            sizes='(max-width: 600px) 200px, (max-width: 1200px) 300px, 400px'
            quality={100}
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
