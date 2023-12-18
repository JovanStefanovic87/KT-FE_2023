import { useSelector } from 'react-redux';
import { RootState } from '../../globalRedux/store';
import { useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import SideBarBtn from '../ui/buttons/SideBarBtn';
import Image from 'next/image';
import logo from '@/public/images/logo.png';
import WorkingHoursModal from '../ui/containers/WorkingHoursContainer';
import WorkingHoursForm from '../workingHours/WorkingHoursForm';
import Backdrop from '../ui/Backdrop';
import NavBtn from '../ui/buttons/NavBtn';

const Header: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const userType: string = userInfo.userType;
  const isAdmin = userType === 'admin';
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWorkingHoursFormOpen, setIsWorkingHoursFormOpen] = useState(false);
  const handleOpenWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(true);
  };

  const handleCloseWorkingHoursForm = () => {
    setIsWorkingHoursFormOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='bg-ktHeaderGray px-4 py-1 fixed h-header w-screen z-10'>
      <div className='flex justify-between items-center'>
        <Backdrop onClick={toggleMobileMenu} isVisible={isMobileMenuOpen} />
        {isMobileMenuOpen ? (
          <div className='md:hidden w-64  py-2 px-4 space-y-2 fixed top-0 left-0 h-full z-50 flex flex-col bg-sideBarBg overflow-y-auto'>
            <div className='flex justify-end'>
              <button
                onClick={toggleMobileMenu}
                className='text-white text-xl'
                aria-label='Close Mobile Menu'
              >
                <GiHamburgerMenu />
              </button>
            </div>
            <div className='p-4 border-b border-solid border-white'></div>
            <p className='text-white font-semibold mt-2 text-lg'>Navigacija</p>
            <NavBtn value='Početna' href='/' />
            <NavBtn isVisible={isAdmin} value='Kalendar' href='/kalendar' />
            <NavBtn isVisible={!isAdmin} value='Kalendar' href='/klijent_kalendar' />
            <NavBtn isVisible={isAdmin} value='Klijenti' href='/klijenti' />
            <NavBtn isVisible={isAdmin} value='Usluge' href='/usluge' />
            <NavBtn isVisible={isAdmin} value='SMS' href='/sms' />
            <NavBtn value='Profil' href='/profil' />
            <NavBtn isVisible={isAdmin} value='Timovi' href='/timovi' />
            <hr className='border-t-8 border-solid border-ktBg'></hr>
            <p className='text-white font-semibold mt-2 text-lg'>Podesavanja</p>
            <SideBarBtn onClick={handleOpenWorkingHoursForm} value='Radno vreme' />
            <div className='flex-grow'></div>
          </div>
        ) : (
          <div className='hidden md:flex space-x-2 lg:space-x-4'>
            <NavBtn value='Početna' href='/' />
            <NavBtn isVisible={isAdmin} value='Kalendar' href='/kalendar' />
            <NavBtn isVisible={!isAdmin} value='Kalendar' href='/klijent_kalendar' />
            <NavBtn isVisible={isAdmin} value='Klijenti' href='/klijenti' />
            <NavBtn isVisible={isAdmin} value='Usluge' href='/usluge' />
            <NavBtn isVisible={isAdmin} value='SMS' href='/sms' />
            <NavBtn value='Profil' href='/profil' />
            <NavBtn isVisible={isAdmin} value='Timovi' href='/timovi' />
          </div>
        )}
        <div className='md:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='text-white text-xl'
            aria-label='Toggle Mobile Menu'
          >
            <GiHamburgerMenu />
          </button>
        </div>
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
      </div>
      <WorkingHoursModal isOpen={isWorkingHoursFormOpen}>
        <WorkingHoursForm handleCloseWorkingHoursForm={handleCloseWorkingHoursForm} />
      </WorkingHoursModal>
    </header>
  );
};

export default Header;
