/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bed,
  Wifi,
  ShowerHead,
  Sparkles,
  Shirt,
  Shield,
  Zap,
  Droplet,
  BedDouble,
  BookOpen,
  SquareParking,
  Utensils,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { FACILITIES } from '../data';
import { Facility } from '../types';

// Robust Icon Map
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed: Bed,
  Wifi: Wifi,
  ShowerHead: ShowerHead,
  Sparkles: Sparkles,
  Shirt: Shirt,
  Shield: Shield,
  Zap: Zap,
  Droplet: Droplet,
  BedDouble: BedDouble,
  BookOpen: BookOpen,
  SquareParking: SquareParking,
  Utensils: Utensils,
};

export default function Facilities() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Featured' | 'Daily'>('All');

  const filteredFacilities = FACILITIES.filter((f) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return f.isFeatured;
    // 'Daily' means items like washing laundry, daily cleaning, water supply, comfortable bed, parking
    if (activeFilter === 'Daily') return !f.isFeatured;
    return true;
  });

  return (
    <section id="facilities" className="py-20 lg:py-28 bg-slate-50 text-slate-900 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-gold-dark font-bold">Comprehensive Amenities</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark tracking-tight mt-1">
              Outstanding Facilities Vetted For Quality Living
            </h2>
            <p className="text-slate-500 mt-2">
              Every detail is tailored to provide students and working professionals with a hassle-free, secure, and highly productive academic residency.
            </p>
          </div>

          {/* Filter options tabs */}
          <div className="flex bg-white/80 p-1 rounded-lg border border-slate-200/60 shadow-sm shrink-0 self-start md:self-end">
            {(['All', 'Featured', 'Daily'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all uppercase tracking-wider cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-navy-dark text-white shadow-sm'
                    : 'text-slate-500 hover:text-navy-dark'
                }`}
              >
                {filter === 'All' ? 'All Services' : filter === 'Featured' ? 'Featured Core' : 'Utility Perks'}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFacilities.map((facility, idx) => {
            const IconComponent = ICON_MAP[facility.iconName] || Bed;
            return (
              <motion.div
                key={facility.id}
                className="bg-white p-6 rounded-xl border border-slate-200/50 shadow-sm hover:border-gold/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div>
                  {/* Top line mapping icon & status indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-navy-dark/95 text-gold shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {facility.isFeatured && (
                      <span className="text-[10px] font-mono uppercase bg-gold/15 border border-gold/40 text-gold-dark px-2 py-0.5 rounded font-bold">
                        ★ Critical Care
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-navy-dark tracking-tight mb-2">
                    {facility.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                {/* Small indicator tag */}
                <div className="flex items-center gap-1.5 mt-5 text-[10px] text-emerald-600 font-mono font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Fully operational & active</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small informational board underneath */}
        <div className="mt-12 p-5 bg-gradient-to-r from-navy-dark to-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between border border-white/5 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-xs text-slate-300">
              <strong>Need a special facility?</strong> We accommodate special requirements (e.g. customized study tables, specific food diets, or medical isolation rooms) within pre-agreed limits. Contact we now!
            </p>
          </div>
          <a
            href="#contact"
            className="text-xs font-bold font-mono text-gold hover:text-white transition-colors underline hover:no-underline shrink-0"
          >
            Ask Management →
          </a>
        </div>

      </div>
    </section>
  );
}
