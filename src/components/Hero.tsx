/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Snowflake, Phone, Landmark, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onBookClick: () => void;
  onAboutClick: () => void;
}

export default function Hero({ onBookClick, onAboutClick }: HeroProps) {
  const handleWhatsAppChat = () => {
    const phoneNumber = '923339691856'; // Hostel Contact owner number
    const message = encodeURIComponent(
      'Assalam-o-Alaikum! I am visiting your Karak Hostel website and would like to inquire about room availability and booking details. Please guide me.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-navy-dark text-white overflow-hidden pt-16"
    >
      {/* Visual Background image overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555854877-abab0e564b86?auto=format&fit=crop&w=1920&q=80"
          alt="Modern Karak Hostel Room Interior"
          className="w-full h-full object-cover transform scale-105 pointer-events-none opacity-20 filter brightness-95 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Navy gradients to fuse background perfectly with design */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/90 to-navy-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-transparent to-navy-dark/95 lg:block hidden" />
      </div>

      {/* Grid Pattern overlay for tech-forward/clean feeling */}
      <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main hero panel container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        {/* Badge Indicator */}
        <motion.div
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-mono font-medium tracking-wide mb-6 uppercase"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </span>
          Premium Student & Professional Enclave
        </motion.div>

        {/* Core Big Catchy Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight max-w-4xl leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Comfortable & Secure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
            Hostel Accommodation
          </span>{' '}
          in Karak
        </motion.h1>

        {/* Subtitle / Paragraph */}
        <motion.p
          className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Affordable, fully furnished shared and private rooms with continuous backup power,
          high-speed fiber WiFi, and 24/7 CCTV safety. Conveniently located right at{' '}
          <span className="text-white font-medium underline decoration-gold/50 decoration-2 underline-offset-4">
            Jail Chowk, Karak
          </span>
          .
        </motion.p>

        {/* Action Triggers */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gold hover:bg-gold-dark text-navy-dark font-bold tracking-wide shadow-lg shadow-gold/20 hover:shadow-gold/35 hover:-translate-y-0.5 transition-all cursor-pointer text-base"
          >
            Book Your Room
          </button>
          
          <button
            onClick={handleWhatsAppChat}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/25 hover:-translate-y-0.5 transition-all cursor-pointer text-base"
          >
            {/* Simple Inline SVG for WhatsApp */}
            <svg
              className="w-5.h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.019 14.07 1.002 11.47 1.002 6.033 1.003 1.61 5.372 1.606 10.801c-.001 1.654.437 3.262 1.269 4.693l-.938 3.424 3.52-.924c1.284.7 2.724 1.062 4.19 1.06zM17.433 14.3c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.724.16-.215.32-.83.1.04-1.02 1.15-.19.213-.38.16-.7-.16l-.724-1.742c-.2-.481-.406-.413-.561-.42l-.48-.01c-.16 0-.43.06-.65.3-.23.24-.86.84-.86 2.06 0 1.22.89 2.4.99 2.56.1.16 1.75 2.67 4.24 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.55-.32z" />
            </svg>
            Contact on WhatsApp
          </button>

          <button
            onClick={onAboutClick}
            className="w-full sm:w-auto px-8 py-4 rounded-lg bg-navy-light hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:text-white transition-all cursor-pointer text-base"
          >
            About Us
          </button>
        </motion.div>

        {/* Summary horizontal badge bar (3 core high converting indicators) */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl p-6 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-800/80 text-left"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-gold/10 text-gold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Guaranteed Security</h4>
              <p className="text-xs text-slate-400 mt-1">Active security personnel and high-definition CCTV monitor.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t sm:border-t-0 sm:border-x border-slate-800/80 pt-4 sm:pt-0 sm:px-6">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
              <Snowflake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Peace of Mind</h4>
              <p className="text-xs text-slate-400 mt-1">Homely, silent, and study-vetted environments for success.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 border-t sm:border-t-0 pt-4 sm:pt-0 sm:pl-6">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Prime Location</h4>
              <p className="text-xs text-slate-400 mt-1">Situated right at Jail Chowk, Karak — close to the universities.</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator Icon */}
        <motion.div
          className="absolute bottom-6 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer hidden lg:flex"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={onAboutClick}
        >
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Discover Hostel</span>
          <ChevronDown className="w-4.h-4 text-gold" />
        </motion.div>
      </div>
    </section>
  );
}
