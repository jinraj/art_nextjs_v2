'use client';

import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const navLinks: { text: string; href: string }[] = [
  { text: 'Home', href: '/' },
  { text: 'Paintings', href: '/paintings' },
  { text: 'Photography', href: '/photography' },
  { text: 'Decors', href: '/decors' },
];

interface NavLinkProps {
  text: string;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href }) => (
  <a
    href={href}
    className="text-custom-paynes-gray hover:text-custom-paynes-gray transition-colors duration-300 font-medium tracking-wide relative group text-sm"
  >
    {text}
    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-custom-paynes-gray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </a>
);

export default function NavBar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const cartItemCount: number = 3;

  return (
    <header className="fixed w-full z-50 backdrop-blur-md py-4 font-[Poppins] transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <a href="/">
          <div className="relative h-12 w-[40px]">
            <Image
              src="/resources/application/logo.png"
              alt="My Art"
              fill
              className="object-contain"
            />
          </div>
        </a>

        {/* Mobile-only Cart Icon */}
        <div className="flex items-center space-x-4 md:hidden">
          <a href="/cart" className="relative">
            <ShoppingCart size={28} className="text-custom-paynes-gray" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-custom-amber text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden custom-paynes-gray focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <Menu size={32} className="text-custom-paynes-gray" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 relative">
          {navLinks.map((link) => (
            <NavLink key={link.text} text={link.text} href={link.href} />
          ))}

          {/* Cart Icon (Desktop) */}
          <a href="/cart" className="relative">
            <ShoppingCart size={24} className="text-custom-paynes-gray hover:text-custom-amber transition-colors" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-custom-amber text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </a>

          {/* Login or Profile Dropdown */}
          {!session ? (
            <button
              onClick={() => router.push("/auth/login")}
              className="px-6 py-2 cursor-pointer rounded-full text-sm font-semibold bg-custom-amber text-custom-white transition-all duration-300 transform hover:scale-105"
              style={{ boxShadow: `0 4px 6px -1px var(--custom-silver)` }}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="p-2 rounded-full border border-gray-300 hover:border-custom-amber transition"
              >
                <User size={24} className="text-custom-paynes-gray" />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 z-50 text-center">
                  <p className="text-sm font-semibold mb-4">{session.user?.name}</p>
                  <NavLink text="My Account" href="/account/home" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="mt-4 w-full px-4 py-2 rounded-full text-sm font-semibold bg-custom-amber text-white hover:bg-red-600 transition-all"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 w-full h-screen bg-white bg-opacity-95 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-6 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 custom-paynes-gray focus:outline-none"
            aria-label="Close navigation menu"
          >
            <X size={32} className="text-custom-paynes-gray" />
          </button>

          {navLinks.map((link) => (
            <NavLink key={link.text} text={link.text} href={link.href} />
          ))}

          {!session ? (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                router.push("/auth/login");
              }}
              className="mt-8 px-6 py-2 cursor-pointer rounded-full text-lg font-semibold bg-custom-amber text-custom-white transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col space-y-4 items-center">
              <NavLink text="My Account" href="/account/home" />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-6 py-2 rounded-full text-lg mt-5 font-semibold bg-custom-amber text-white hover:bg-red-600 transition-all"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
