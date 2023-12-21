import { useSelector } from 'react-redux';
import { RootState } from '../../globalRedux/store';
import { useState } from 'react';
import SideBarBtn from '../ui/buttons/SideBarBtn';
import WorkingHoursModal from '../ui/containers/WorkingHoursContainer';
import WorkingHoursForm from '../workingHours/WorkingHoursForm';
import Backdrop from '../ui/Backdrop';
import NavBtn from '../ui/buttons/NavBtn';
import HamburgerButton from '../ui/buttons/HamburgerButton';
import Logo from '../ui/media/Logo';
import SidebarTitle from '../ui/text/SidebarTitle';
import SideBarDividingLine from '../ui/dividingLines/SideBarDividingLine';

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
          <div className='md:hidden w-64 py-2 px-4 space-y-2 fixed top-0 left-0 h-full z-50 flex flex-col bg-sideBarBg overflow-y-auto'>
            <div className='flex justify-end mb-0'>
              <HamburgerButton onClick={toggleMobileMenu} ariaLabel='Close Mobile Menu' />
            </div>
            <SideBarDividingLine />
            <SidebarTitle value='Navigacija' />
            <NavBtn value='Početna' href='/' />
            <NavBtn isVisible={isAdmin} value='Kalendar' href='/kalendar' />
            <NavBtn isVisible={!isAdmin} value='Kalendar' href='/klijent_kalendar' />
            <NavBtn isVisible={isAdmin} value='Klijenti' href='/klijenti' />
            <NavBtn isVisible={isAdmin} value='Usluge' href='/usluge' />
            <NavBtn isVisible={isAdmin} value='SMS' href='/sms' />
            <NavBtn value='Profil' href='/profil' />
            <NavBtn isVisible={isAdmin} value='Timovi' href='/timovi' />
            <SideBarDividingLine />
            <SidebarTitle value='Podesavanja' />
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
        <div className='md:hidden flex items-center justify-center'>
          <HamburgerButton onClick={toggleMobileMenu} ariaLabel='Toggle Mobile Menu' />
        </div>
        <Logo />
      </div>
      <WorkingHoursModal isOpen={isWorkingHoursFormOpen}>
        <WorkingHoursForm handleCloseWorkingHoursForm={handleCloseWorkingHoursForm} />
      </WorkingHoursModal>
    </header>
  );
};

export default Header;
