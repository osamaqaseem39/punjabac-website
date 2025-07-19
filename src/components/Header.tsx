'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MenuNav from './MenuNav';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 md:py-4 px-2 md:px-4">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Punjab AC Logo"
            width={scrolled ? 48 : 100}
            height={20}
            className={`transition-all duration-300 ${scrolled ? 'w-12' : 'w-24'} h-auto`}
          />
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <MenuNav />
        </div>
        {/* Contact Info (Desktop only) */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700 font-medium">92-345-8428889</span>
          </div>
          <Link 
            href="/contact" 
            className="bg-punjabac-brand text-white px-6 py-2 rounded-lg font-medium hover:bg-punjabac-brand-light transition-colors"
          >
            Contact Us
          </Link>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-punjabac-brand rounded"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav
          className={`absolute top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <img src="/images/logo.png" alt="Punjab AC Logo" width={48} height={20} className="w-12 h-auto" />
            <button
              className="p-2 focus:outline-none focus:ring-2 focus:ring-punjabac-brand rounded"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-6 py-6">
            <Link href="/" className="text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/services" className="text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link href="/products" className="text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            {/* About Us Section */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-[#171717] font-semibold mb-2">About Us</h3>
              <div className="ml-4 space-y-2">
                <Link href="/our-brands" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Our Brands
                </Link>
                <Link href="/our-team" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Our Team
                </Link>
                <Link href="/our-clients" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Our Clients
                </Link>
                <Link href="/company-profile" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Company Profile
                </Link>
                <Link href="/sub-dealers" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                  Sub Dealers
                </Link>
              </div>
            </div>
            <Link href="/contact" className="text-[#171717] hover:text-[#444444] font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-5 h-5 text-punjabac-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-700 font-medium">92-345-8428889</span>
              </div>
              <Link 
                href="/contact" 
                className="block bg-punjabac-brand text-white px-6 py-2 rounded-lg font-medium hover:bg-punjabac-brand-light transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Message Us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
} 