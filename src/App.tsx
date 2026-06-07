/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Facilities from './components/Facilities';
import RoomOptions from './components/RoomOptions';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import BookingForm from './components/BookingForm';
import ManagerDesk from './components/ManagerDesk';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GeminiChat from './components/GeminiChat';

import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [lastUpdateEpoch, setLastUpdateEpoch] = useState<number>(Date.now());

  // Handle trigger to prefill room and scroll to booking form
  const handleBookRoomTrigger = (roomName: string) => {
    setSelectedRoom(roomName);
    
    const targetElement = document.getElementById('book-now');
    if (targetElement) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleBookingSubmitted = () => {
    setLastUpdateEpoch(Date.now()); // Force refresh bookings inside manager panel
  };

  const handleDialHelpline = () => {
    window.open('tel:+923339691856', '_self');
  };

  const handleWhatsAppInstantChat = () => {
    const managerPhone = '923339691856';
    const message = encodeURIComponent(
      'Assalam-o-Alaikum! I am visiting your Karak Hostel website and would like to ask some questions regarding price listings and vacant seats. Please guide me.'
    );
    window.open(`https://wa.me/${managerPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden flex flex-col justify-between select-none font-sans antialiased">
      
      {/* Header Sticky Component */}
      <Header
        onBookClick={() => handleBookRoomTrigger('')}
        onAdminClick={() => setIsManagerOpen(true)}
      />

      {/* Main Core View Modules */}
      <main className="grow">
        {/* Hero Entry Section */}
        <Hero
          onBookClick={() => handleBookRoomTrigger('')}
          onAboutClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              const offset = 80;
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = aboutSection.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }}
        />

        {/* Detailed About Welcomer Statistics */}
        <About />

        {/* Room Selections & Pricing display cards */}
        <RoomOptions onBookRoom={handleBookRoomTrigger} />

        {/* Amenities Facilities 12 item Grid with Group Filter */}
        <Facilities />

        {/* High Resolution Tour Gallery Masonry with MultiLightbox Overlay */}
        <Gallery />

        {/* Verified Star Reviews Slider & Guest Submit Forms */}
        <Reviews />

        {/* Instant Memory & WhatsApp Booking Flow */}
        <BookingForm
          selectedRoom={selectedRoom}
          onBookingSubmitted={handleBookingSubmitted}
        />

        {/* Location cards and Waypoint computing steps indicator */}
        <Contact />
      </main>

      {/* Footer structure */}
      <Footer onAdminClick={() => setIsManagerOpen(true)} />

      {/* SECURE WARDEN MANAGER MODAL SHELL */}
      <ManagerDesk
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        lastUpdateEpoch={lastUpdateEpoch}
      />

      {/* MOBILE STICKY BOTTOM EMERGENCY CTA BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur border-t border-white/10 p-3 flex sm:hidden justify-between items-center z-30 shadow-2xl">
        <button
          onClick={handleDialHelpline}
          className="flex-1 mr-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border border-white/5 active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-gold" />
          <span>Call Hostels</span>
        </button>
        
        <button
          onClick={handleWhatsAppInstantChat}
          className="flex-1 ml-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow active:scale-95 transition-all animate-pulse"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span>WhatsApp Chat</span>
        </button>
      </div>

      {/* DESKTOP FLOATING WHATSAPP BUTTON (Pings subtly for click) */}
      <div className="fixed bottom-6 right-6 hidden sm:flex flex-col gap-3 z-30">
        {/* Floating Chat */}
        <motion.button
          onClick={handleWhatsAppInstantChat}
          className="p-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center justify-center cursor-pointer border border-emerald-500/30 group relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          whileHover={{ scale: 1.08 }}
        >
          {/* Subtle radar ripple effect */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/45 animate-ping -z-10 group-hover:block" />
          
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.019 14.07 1.002 11.47 1.002 6.033 1.003 1.61 5.372 1.606 10.801c-.001 1.654.437 3.262 1.269 4.693l-.938 3.424 3.52-.924c1.284.7 2.724 1.062 4.19 1.06zM17.433 14.3c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.724.16-.215.32-.83.1.04-1.02 1.15-.19.213-.38.16-.7-.16l-.724-1.742c-.2-.481-.406-.413-.561-.42l-.48-.01c-.16 0-.43.06-.65.3-.23.24-.86.84-.86 2.06 0 1.22.89 2.4.99 2.56.1.16 1.75 2.67 4.24 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.55-.32z" />
          </svg>
          
          {/* Tooltip on hover */}
          <span className="absolute right-14 bg-slate-900 border border-slate-800 text-gold text-[10px] font-mono tracking-wider font-semibold uppercase px-2.5 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </motion.button>
      </div>

      {/* GEMINI SMART LIVE AI WIDGET */}
      <GeminiChat />

    </div>
  );
}
