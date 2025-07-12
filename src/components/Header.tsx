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
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Punjab AC Logo"
            width={scrolled ? 64 : 140}
            height={20}
            className={`transition-all duration-300 ${scrolled ? 'w-16' : 'w-36'} h-auto`}
          />
        </div>
        <MenuNav />

        {/* Contact Info */}
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
            Get Quote
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-[#171717] hover:text-[#444444] font-medium transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-[#171717] hover:text-[#444444] font-medium transition-colors">
              Services
            </Link>
            <Link href="/products" className="text-[#171717] hover:text-[#444444] font-medium transition-colors">
              Products
            </Link>
            
            {/* About Us Section */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-[#171717] font-semibold mb-2">About Us</h3>
              <div className="ml-4 space-y-2">
                <Link href="/our-brands" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors">
                  Our Brands
                </Link>
                <Link href="/our-team" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors">
                  Our Team
                </Link>
                <Link href="/our-clients" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors">
                  Our Clients
                </Link>
                <Link href="/company-profile" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors">
                  Company Profile
                </Link>
                <Link href="/sub-dealers" className="block text-[#171717] hover:text-[#444444] font-medium transition-colors">
                  Sub Dealers
                </Link>
              </div>
            </div>
            
            <Link href="/contact" className="text-[#171717] hover:text-[#444444] font-medium transition-colors">
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
              >
                Get Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 