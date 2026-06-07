/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Shield, BedDouble } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onBookClick: () => void;
  onAdminClick: () => void;
}

export default function Header({ onBookClick, onAdminClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-sm border-b border-slate-200/50 py-2.5'
            : 'bg-white/60 backdrop-blur-lg border-b border-slate-200/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Identity */}
            <motion.a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-2 group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-9 h-9 rounded-full bg-[#007AFF] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <BedDouble className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-sans font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                  KARAK <span className="text-[#007AFF]">HOSTEL</span>
                </span>
                <span className="block text-[9px] font-sans font-semibold text-[#8E8E93] tracking-wider uppercase">
                  ✨ Jail Chowk Luxury
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#F2F2F7]/50 rounded-full p-1 border border-slate-200/40">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#007AFF] hover:bg-white rounded-full transition-all"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            {/* Header Right Action CTA Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <motion.button
                onClick={onAdminClick}
                className="px-4 py-2 text-xs font-sans font-semibold text-[#8E8E93] hover:text-[#007AFF] hover:bg-[#F2F2F7] rounded-full transition-all cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Manager Desk
              </motion.button>
              
              <motion.button
                onClick={onBookClick}
                className="px-5 py-2 rounded-full bg-[#007AFF] hover:bg-[#0056B3] text-white font-bold text-xs tracking-tight shadow-sm transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Book Your Room
              </motion.button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={onAdminClick}
                className="px-3 py-1.5 text-[11px] font-sans font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-full mr-1"
              >
                Desk
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-white/95 backdrop-blur-2xl pt-24 px-6 flex flex-col lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-1 w-full mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-3 px-4 text-base font-semibold text-slate-700 hover:text-[#007AFF] border-b border-slate-100 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3.5 rounded-full bg-[#007AFF] hover:bg-[#0056B3] text-white font-bold text-center shadow-lg hover:shadow-[#007AFF]/25 transition-all text-sm"
              >
                Book Your Room
              </button>
              
              <div className="flex justify-center gap-6 mt-8 font-sans text-xs text-[#8E8E93] font-semibold">
                <span>📞 +92 333 9691856</span>
                <span>💬 Jail Chowk, Karak</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
