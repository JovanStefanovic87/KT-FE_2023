'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi'; // Install this package if not already installed
import DropdownBtn from './DropdownBtn';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (href: string) => {
    return pathname === href
      ? 'text-ktOrange font-bold'
      : 'transition duration-medium text-white hover:text-ktOrange';
  };

  return (
    <header className="bg-ktHeaderGray p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden md:flex space-x-4">
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
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white text-xl"
            aria-label="Toggle Mobile Menu"
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white text-xl font-bold">
            <Image src={logo} alt="Your Logo" width={150} height={150} />{' '}
            {/* Set appropriate width and height */}
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ktHeaderGray py-2 px-4 space-y-2 absolute top-auto left-0 w-full z-50">
          <DropdownBtn>
            <Link href="/">Početna</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/kalendar">Kalendar</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/klijenti">Klijenti</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/usluge">Usluge</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/izvestaji">Izveštaji</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/sms">SMS</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/profil">Profil</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/timovi">Timovi</Link>
          </DropdownBtn>
          <DropdownBtn>
            <Link href="/odjava">Odjava</Link>
          </DropdownBtn>
        </div>
      )}
    </header>
  );
};

export default Header;
