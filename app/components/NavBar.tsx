'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

// Define the navigation links in a reusable array
const navLinks = [
    { text: 'Paintings', href: '/paintings' },
    { text: 'Photography', href: '/photography' },
    { text: 'Decors', href: '/decors' },
    { text: 'Contact', href: '/contact' }
];

/**
 * A reusable navigation link component.
 * @param {object} props
 * @param {string} props.text - The display text for the link.
 * @param {string} props.href - The URL path for the link to redirect to.
 */
const NavLink = ({ text, href }) => (
    <a href={href} className="text-custom-paynes-gray hover:text-custom-paynes-gray transition-colors duration-300 font-medium tracking-wide relative group text-sm">
        {text}
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-custom-paynes-gray transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
);

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed w-full z-50 bg-transparent py-4 font-[Poppins] transition-all duration-300">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    {/* The logo is now a clickable link */}
                    <a href="/" className="relative h-12 w-auto">
                        <div className="relative h-12 w-[120px]"> {/* set width manually */}
                            <Image
                                src="/resources/application/logo.png"
                                alt="My Art"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <NavLink key={link.text} text={link.text} href={link.href} />
                    ))}
                    <button
                        className="px-6 py-2 rounded-full text-sm font-semibold bg-custom-amber text-custom-white transition-all duration-300 transform hover:scale-105"
                        style={{ boxShadow: `0 4px 6px -1px #BDC8CC` }}
                    >
                        Login
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden custom-paynes-gray focus:outline-none"
                    aria-label="Toggle navigation menu"
                >
                    <Menu size={32} className='text-custom-paynes-gray' />
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-6 md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-6 right-6 custom-paynes-gray focus:outline-none"
                        aria-label="Close navigation menu"
                    >
                        <X size={32} className='text-custom-paynes-gray' />
                    </button>
                    {navLinks.map((link) => (
                        <NavLink key={link.text} text={link.text} href={link.href} />
                    ))}
                    <button className="mt-8 px-6 py-2 rounded-full text-lg font-semibold bg-custom-amber text-custom-white transition-all duration-300 transform hover:scale-105">
                        Login
                    </button>
                </div>
            )}
        </header>
    );
}
