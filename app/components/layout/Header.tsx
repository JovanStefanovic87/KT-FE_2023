'use client';
import { useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi'; // Install this package if not already installed
import DropdownBtn from './DropdownBtn';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-ktHeaderGray p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="hidden md:flex space-x-4">
          <Link href="/home">Home</Link>
          <Link href="/kalendar">Kalendar</Link>
          <Link href="/klijenti">Klijenti</Link>
          <Link href="/usluge">Usluge</Link>
          <Link href="/izvestaji">Izveštaji</Link>
          <Link href="/sms">SMS</Link>
          <Link href="/profil">Profil</Link>
          <Link href="/timovi">Timovi</Link>
          <Link href="/odjava">Odjava</Link>
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
            Your Logo
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-orange-500 py-2 px-4 space-y-2 absolute top-auto left-0 w-full z-50">
          <DropdownBtn>
            <Link href="/home">Home</Link>
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
