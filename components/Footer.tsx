/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BedDouble, MessageSquare, Phone, ArrowUp, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const seoKeywords = [
    'Hostel in Karak',
    'Student Hostel Karak',
    'Accommodation in Karak',
    'Hostel near Jail Chowk Karak',
    'Furnished Hostel Karak',
    'Hostel for Students in Karak',
    'Secure Hostel in Karak',
  ];

  return (
    <footer className="bg-navy-dark text-slate-300 border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          
          {/* Brand description Col 4 */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded bg-gold flex items-center justify-center font-black text-navy-dark shadow shadow-gold/20">
                <BedDouble className="w-5 h-5 text-navy-dark" />
              </div>
              <span className="text-lg font-display font-extrabold text-white tracking-tight uppercase">
                Karak <span className="text-gold">Hostel</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Karak's finest residency located at Jail Chowk, Khyber Pakhtunkhwa. We provide secure, comfortable and homely co-living solutions supporting students of Khushal Khan Khattak University and remote career professional hires.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://maps.app.goo.gl/WjG1Qy7fp1L7wwAf6"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:bg-white/10 transition-colors"
                title="Find on Google Maps"
              >
                📍
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:bg-white/10 transition-colors"
                title="Follow on Facebook"
              >
                f
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:bg-white/10 transition-colors"
                title="Watch on YouTube"
              >
                ▶
              </a>
            </div>
          </div>

          {/* Quick links Col 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Sitemap Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { name: 'Welcome Home', href: '#home' },
                { name: 'About History', href: '#about' },
                { name: 'Rooms Rates', href: '#rooms' },
                { name: 'Facilities Grid', href: '#facilities' },
                { name: 'Media Gallery', href: '#gallery' },
                { name: 'Testimonies', href: '#reviews' },
                { name: 'Contact Map', href: '#contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-gold flex items-center gap-1 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-gold transition-colors" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Perks Col 3 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Vetted Core Utilities
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>🛡️ Double tier security & lockups</li>
              <li>⚡ UPS continuous power backup</li>
              <li>📶 Unlimited 50 Mbps fiber WiFi</li>
              <li>🍛 Homestyle twice-daily catering</li>
              <li>🧼 Daily sanitation cleanup checks</li>
              <li>📚 Dedicated Silent study-lounges</li>
            </ul>
          </div>

          {/* District Contacts Col 3 */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              Helpline Registry
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex gap-2.5">
                <span className="text-slate-500">📍</span>
                <p className="leading-relaxed text-slate-400">
                  <strong>Karak Hostel Address:</strong><br />
                  Jail Chowk, Karak Tehsil, Khyber Pakhtunkhwa, Pakistan.
                </p>
              </div>

              <div className="flex gap-2.5">
                <span className="text-slate-500 font-mono">📱</span>
                <div>
                  <a href="tel:+923339691856" className="font-bold hover:text-gold transition-colors block text-white text-sm">
                    +92 333 9691856
                  </a>
                  <span className="text-[10px] text-slate-500">Direct dialing for warden support</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <span className="text-slate-500 font-mono">📨</span>
                <p className="text-slate-400">
                  <strong>Email:</strong><br />
                  info@karakhostel.com
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic SEO Tags Cloud Row */}
        <div className="border-t border-slate-800 py-6 mb-8">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono uppercase text-gold font-bold mr-2 tracking-widest">
              SEO Tag Cloud:
            </span>
            {seoKeywords.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-slate-500 border border-slate-800/80 px-2 py-0.5 rounded shadow-sm hover:text-slate-400 transition-colors"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>

        {/* Absolute bottom copyrights line */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div className="text-center sm:text-left space-y-1">
            <p>© {new Date().getFullYear()} Karak Hostel. All rights reserved.</p>
            <p>Designed and deployed with high-contrast precision at Jail Chowk, Karak District, Pakistan.</p>
          </div>

          <div className="flex gap-4 items-center">
            {/* Call Admin Link */}
            <button
              onClick={onAdminClick}
              className="text-[10px] font-mono border border-slate-800 uppercase tracking-widest px-3 py-1.5 rounded hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
            >
              Warden Portal
            </button>

            <button
              onClick={handleScrollTop}
              className="p-2 rounded bg-white/5 border border-slate-800 hover:bg-gold hover:text-navy-dark duration-300 flex items-center gap-1 cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
