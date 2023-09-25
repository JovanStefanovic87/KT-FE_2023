'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi'; // Install this package if not already installed
import SideBarBtn from '../ui/buttons/SideBarBtn';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import WorkingHoursModal from '../ui/modals/WorkingHoursModal';
import WorkingHoursForm from '../dashboard/WorkingHoursForm';
import Backdrop from '../ui/Backdrop';

const Header: React.FC = () => {
  const pathname = usePathname();
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

  const isActive = (href: string) => {
    return pathname === href
      ? 'text-ktOrange font-bold'
      : 'transition duration-medium text-white hover:text-ktOrange';
  };

  return (
    <header className="bg-ktHeaderGray px-4 py-1">
      <div className="flex justify-between items-center">
        <Backdrop onClick={toggleMobileMenu} isVisible={isMobileMenuOpen} />
        {isMobileMenuOpen ? (
          <div className="md:hidden w-64  py-2 px-4 space-y-2 fixed top-0 left-0 h-full z-50 flex flex-col bg-sideBarBg overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={toggleMobileMenu}
                className="text-white text-xl"
                aria-label="Close Mobile Menu"
              >
                <GiHamburgerMenu />
              </button>
            </div>
            <div className="p-4 border-b border-solid border-white"></div>
            <p className="text-white font-semibold mt-2 text-lg">Navigacija</p>
            <SideBarBtn>
              <Link href="/" className={`relative block w-full py-2 px-4 ${isActive('/')}`}>
                Početna
              </Link>
            </SideBarBtn>
            <SideBarBtn>
              <Link
                href="/kalendar"
                className={`relative block w-full py-2 px-4 ${isActive('/kalendar')}`}
              >
                Kalendar
              </Link>
            </SideBarBtn>
            <SideBarBtn>
              <Link
                href="/klijenti"
                className={`relative block w-full py-2 px-4 ${isActive('/klijenti')}`}
              >
                Klijenti
              </Link>
            </SideBarBtn>
            <SideBarBtn>
              <Link
                href="/usluge"
                className={`relative block w-full py-2 px-4 ${isActive('/usluge')}`}
              >
                Usluge
              </Link>
            </SideBarBtn>
            <SideBarBtn>
              <Link
                href="/izvestaji"
                className={`relative block w-full py-2 px-4 ${isActive('/izvestaji')}`}
              >
                Izveštaji
              </Link>
            </SideBarBtn>
            <SideBarBtn>
              <Link href="/sms" className={`relative block w-full py-2 px-4 ${isActive('/sms')}`}>
                SMS
              </Link>
            </SideBarBtn>
            <SideBarBtn>
              <Link
                href="/profil"
                className={`relative block w-full py-2 px-4 ${isActive('/profil')}`}
              >
                Profil
              </Link>
            </SideBarBtn>
            <SideBarBtn>
              <Link
                href="/timovi"
                className={`relative block w-full py-2 px-4 ${isActive('/timovi')}`}
              >
                Timovi
              </Link>
            </SideBarBtn>
            <hr className="border-t-8 border-solid border-ktBg"></hr>
            <p className="text-white font-semibold mt-2 text-lg">Podesavanja</p>
            <SideBarBtn onClick={handleOpenWorkingHoursForm}>
              <p className="py-2 px-4">Radno vreme</p>
            </SideBarBtn>
            <div className="flex-grow"></div>
            <div className="mt-4">
              <SideBarBtn>
                <Link href="/odjava" className="relative block w-full py-2 px-4">
                  Odjava
                </Link>
              </SideBarBtn>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex space-x-2 lg:space-x-4">
            <Link href="/" className={isActive('/')}>
              Početna
            </Link>
            <Link href="/kalendar" className={isActive('/kalendar')}>
              Kalendar
            </Link>
            <Link href="/klijenti" className={isActive('/klijenti')}>
              Klijenti
            </Link>
            <Link href="/usluge" className={isActive('/usluge')}>
              Usluge
            </Link>
            <Link href="/izvestaji" className={isActive('/izvestaji')}>
              Izveštaji
            </Link>
            <Link href="/sms" className={isActive('/sms')}>
              SMS
            </Link>
            <Link href="/profil" className={isActive('/profil')}>
              Profil
            </Link>
            <Link href="/timovi" className={isActive('/timovi')}>
              Timovi
            </Link>
            <Link href="/odjava" className={isActive('/odjava')}>
              Odjava
            </Link>
          </div>
        )}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-xl"
            aria-label="Toggle Mobile Menu"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="h-logo w-logo relative mr-0 lg:mr-10">
          <Link href="/">
            <div className="absolute h-logo w-logo">
              <Image
                src={logo}
                alt="Your Logo"
                priority
                fill
                sizes="(max-width: 600px) 200px, (max-width: 1200px) 300px, 400px"
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
