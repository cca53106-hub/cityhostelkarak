/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [startPoint, setStartPoint] = useState('');
  const [computedRoute, setComputedRoute] = useState<string[] | null>(null);

  const contactOptions = [
    {
      id: 'c1',
      title: 'Our Location',
      description: 'Jail Chowk, Karak, Khyber Pakhtunkhwa, Pakistan',
      detail: 'Ideally located near main transit arteries, academies, and universities.',
      icon: <MapPin className="w-6 h-6 text-gold" />,
    },
    {
      id: 'c2',
      title: 'Direct Dial Phone',
      description: '+92 333 9691856',
      detail: 'Warden helpline active from 8:00 AM till 10:00 PM for on-site assistance.',
      icon: <Phone className="w-6 h-6 text-gold" />,
    },
    {
      id: 'c3',
      title: 'WhatsApp Portal',
      description: '+92 333 9691856',
      detail: 'Message 24/7. Immediate replies for hostel fee negotiations.',
      icon: (
        <svg className="w-6 h-6 text-gold fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.019 14.07 1.002 11.47 1.002 6.033 1.003 1.61 5.372 1.606 10.801c-.001 1.654.437 3.262 1.269 4.693l-.938 3.424 3.52-.924c1.284.7 2.724 1.062 4.19 1.06zM17.433 14.3c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.724.16-.215.32-.83.1.04-1.02 1.15-.19.213-.38.16-.7-.16l-.724-1.742c-.2-.481-.406-.413-.561-.42l-.48-.01c-.16 0-.43.06-.65.3-.23.24-.86.84-.86 2.06 0 1.22.89 2.4.99 2.56.1.16 1.75 2.67 4.24 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.55-.32z" />
        </svg>
      ),
    },
    {
      id: 'c4',
      title: 'Email Communications',
      description: 'info@karakhostel.com',
      detail: 'Send official corporate proposals, internships block bookings queries.',
      icon: <Mail className="w-6 h-6 text-gold" />,
    },
  ];

  const handleDirectionsCompute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startPoint.trim()) return;

    const lower = startPoint.toLowerCase();
    
    // Simple custom routing engine for Karak landmarks
    if (lower.includes('kkkuk') || lower.includes('university') || lower.includes('khushal')) {
      setComputedRoute([
        '🚶 Start from Khushal Khan Khattak University Karak Main Gate.',
        '🚗 Take the University Road moving Southwest towards the main highway.',
        '🚦 Turn left on Highway and follow signages towards Karak city.',
        '🏫 Continue past District Government Offices.',
        '📍 Arrive at Jail Chowk intersection. Karak Hostel building is on the right-hand corner side.'
      ]);
    } else if (lower.includes('bazar') || lower.includes('bazaar') || lower.includes('market') || lower.includes('karak city')) {
      setComputedRoute([
        '🚶 Head out from Karak Main Bazar Clock area.',
        '🚗 Drive Northwest on the main Kachehri Road.',
        '🛣️ Bypass the District Sessions Courts building.',
        '📍 Arrive straight at Jail Chowk. Karak Hostel is directly next to the primary bank branch.'
      ]);
    } else if (lower.includes('bus') || lower.includes('adda') || lower.includes('transit')) {
      setComputedRoute([
        '🚶 Board from General Bus Stand / Karak Adda.',
        '🏍️ Take a local rickshaw heading towards Jail Chowk / Court road.',
        '🛣️ Travel straight for 1.5 kilometers (approx 5 minutes ride).',
        '📍 Disembark at Jail Chowk corner. Hostel block is highly visible with our Gold Star sign board!'
      ]);
    } else {
      setComputedRoute([
        `🚶 Start route from "${startPoint}".`,
        '🛣️ Move onto the primary Karak arterial road heading toward the Government Judiciary Center.',
        '📍 Follow signals straight towards Jail Chowk, Karak.',
        '🏢 Karak Hostel is located right at the Jail Chowk corner. Call +92 333 9691856 if you need guiding guide.'
      ]);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white text-slate-900 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Grid */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-gold-dark font-bold">Connect With Us</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark tracking-tight mt-1">
            We are Located in the Heart of Karak
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Easily accessible from academies, markets, and public transport nodes. Drop by for a cup of tea and a personal room tour.
          </p>
        </div>

        {/* Dual grid section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* Left info items - Col 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-1 gap-6">
              {contactOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="p-5 rounded-xl border border-slate-200/60 bg-slate-50 flex items-start gap-4 hover:border-gold/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="p-3 bg-navy-dark text-gold rounded-lg shrink-0">
                    {opt.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">{opt.title}</h4>
                    <span className="block text-sm sm:text-base font-bold text-navy-dark mt-1">
                      {opt.description}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{opt.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Gate Timing card */}
            <div className="p-5 rounded-xl bg-slate-900 text-white border border-slate-800 flex items-start gap-4">
              <div className="p-3 bg-gold/10 text-gold rounded-lg shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Office Desk & Gate Hours</h4>
                <p className="text-sm font-bold text-slate-200">Gates Closed/Locked: 10:00 PM Sharp</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Daily desk operations and student verify runs run from 8:00 AM to 10:00 PM. Gate entries past 10 PM require written permission from the Warden.
                </p>
              </div>
            </div>
          </div>

          {/* Right Map & Routing finder Col 7 */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Map Embed Frame */}
            <div className="grow rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md h-[320px] lg:h-auto min-h-[300px] relative bg-slate-100">
              <iframe
                title="Google Maps Jail Chowk Karak Khyber Pakhtunkhwa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13348.067332305596!2d71.0858169!3d32.9090623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d8f99e32d3c907%3A0xcf95cb040441df87!2sJail%20Chowk%2C%20Karak%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <a
                href="https://maps.app.goo.gl/WjG1Qy7fp1L7wwAf6"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 bg-navy-dark text-white hover:bg-gold hover:text-navy-dark text-[10px] font-mono uppercase font-bold tracking-widest px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-1.5 border border-white/10"
              >
                <span>Navigate in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* On-page Interactive Direction routing finder */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm space-y-4">
              <div>
                <h4 className="text-sm font-bold text-navy-dark">Interactive Direction Finder</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Type your starting point (try "KKKUK", "Bazar", or "Bus Stand") to compute immediate coordinates:
                </p>
              </div>

              <form onSubmit={handleDirectionsCompute} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. KKKUK University, Bazar, Bus Stand"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  className="grow px-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-gold text-slate-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-dark hover:bg-gold text-white hover:text-navy-dark transition-colors duration-300 font-bold text-xs rounded-lg cursor-pointer shrink-0"
                >
                  Find Steps
                </button>
              </form>

              {computedRoute && (
                <div className="bg-white p-4 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-2 max-h-[160px] overflow-y-auto">
                  <div className="text-[10px] font-mono text-slate-400 border-b border-slate-100 pb-1 font-bold uppercase">
                    🚩 Calculated Instructions
                  </div>
                  {computedRoute.map((step, index) => (
                    <div key={index} className="leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
