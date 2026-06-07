/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Award, Users, Shield, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const stats = [
    {
      id: 's1',
      number: '100+',
      label: 'Residents Served',
      subtitle: 'Students & Professionals',
      icon: <Users className="w-5 h-5 text-gold" />,
    },
    {
      id: 's2',
      number: '24/7',
      label: 'Security & CCTV',
      subtitle: 'Double-tier protection',
      icon: <Shield className="w-5 h-5 text-gold" />,
    },
    {
      id: 's3',
      number: '50 Mbps',
      label: 'High-Speed Fiber',
      subtitle: 'Study & Remote Vetted',
      icon: <Award className="w-5 h-5 text-gold" />,
    },
    {
      id: 's4',
      number: 'Jail Chowk',
      label: 'Location in Karak',
      subtitle: 'Next to major utilities',
      icon: <Compass className="w-5 h-5 text-gold" />,
    },
  ];

  const benefits = [
    { title: 'Safe Environment', desc: 'Secure entry points with round-the-clock guards and gated residency boundaries.' },
    { title: 'Affordable Pricing', desc: 'Cost-friendly monthly and daily plans tailored to students and early-career hires.' },
    { title: 'Convenient Location', desc: 'Located exactly at Jail Chowk, a walking distance from transit hubs, study academies, and restaurants.' },
    { title: 'Clean Rooms', desc: 'Rigorous daily sanitation regimes for all corridors, study spots, and attached washrooms.' },
    { title: 'Friendly Management', desc: 'A compassionate, on-site warden responding 24/7 to any resident requests or emergencies.' },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white text-slate-900 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Intro Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold/10 border border-gold/20 text-gold-dark text-xs font-mono font-medium uppercase tracking-wider">
              ⭐ Premium Hospitality
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark tracking-tight leading-tight">
              Welcome to Our Hostel <br />
              <span className="text-gold-dark">Where Comfort Meets Academy Life</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Located directly at <strong>Jail Chowk, Karak, Khyber Pakhtunkhwa, Pakistan</strong>, our hostel provides comfortable, peace-vetted, and highly affordable accommodation tailored for students, remote professionals, interns, and travelers.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We focus heavily on cleanliness, comprehensive safety, instant utilities, and creating a clean, cooperative environment that supports concentrated learning and remote work careers for students and professionals.
            </p>

            {/* Core Benefits checklist in 2 cols */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
                Our Core Brand Promises
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.slice(0, 4).map((b) => (
                  <div key={b.title} className="flex gap-2.5">
                    <CheckCircle2 className="w-5.h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-navy-dark">{b.title}</h5>
                      <p className="text-xs text-slate-500 mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About Right Visual image frame */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-gold/15 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
            <div className="rounded-2xl overflow-hidden border-2 border-slate-100 shadow-xl bg-slate-50 h-[380px] sm:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80"
                alt="Karak Hostel Exterior Building"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Overlay float ribbon */}
            <div className="absolute -bottom-6 -left-6 bg-navy-dark text-white p-5 rounded-xl shadow-lg max-w-xs border border-white/10 hidden sm:block">
              <p className="text-xs font-mono uppercase text-gold tracking-widest font-bold">🎯 Student Focused</p>
              <p className="text-sm font-medium text-slate-200 mt-2">
                "Directly accessible from Khushal Khan Khattak University Karak and transit arteries."
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us: Animated Stats Counter Grid */}
        <div className="bg-slate-50 rounded-2xl p-8 lg:p-12 border border-slate-100 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Hostel Registry Overview</span>
            <h3 className="text-2xl font-display font-bold text-navy-dark mt-1">Why Choose Us? Karak Hostel at a Glance</h3>
            <p className="text-sm text-slate-500 mt-2">
              Our proven capacity and specialized setup make us the premier choice in Karak district.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-gold/30 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="p-3 rounded-full bg-gold/10 text-gold mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-display font-extrabold text-navy-dark tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
