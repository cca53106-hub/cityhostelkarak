/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, Wifi, ShieldCheck, Check, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ROOM_OPTIONS } from '../data';

interface RoomOptionsProps {
  onBookRoom: (roomName: string) => void;
}

export default function RoomOptions({ onBookRoom }: RoomOptionsProps) {
  // Toggle between 'monthly' and 'daily' plans
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'daily'>('monthly');

  const formatPrice = (pkrAmount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0,
    }).format(pkrAmount);
  };

  return (
    <section id="rooms" className="py-20 lg:py-28 bg-white text-slate-900 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Monthly vs Daily Toggle */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-gold-dark font-bold">Select Your Residence</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark tracking-tight mt-1">
            Premium Tailored Living Plans
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Whether you are a student attending classes, a civil servant preparing for competitive exams, or a traveling business professional, we have the ideal space for you.
          </p>

          {/* Toggle Button */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200/60 shadow-inner">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                billingPeriod === 'monthly'
                  ? 'bg-navy-dark text-white shadow-md'
                  : 'text-slate-500 hover:text-navy-dark'
              }`}
            >
              🗓️ Monthly Basis
            </button>
            <button
              onClick={() => setBillingPeriod('daily')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                billingPeriod === 'daily'
                  ? 'bg-navy-dark text-white shadow-md'
                  : 'text-slate-500 hover:text-navy-dark'
              }`}
            >
              ☀️ Daily Basis
            </button>
          </div>
        </div>

        {/* Room Options Grid Card Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ROOM_OPTIONS.map((room, idx) => {
            const price = billingPeriod === 'monthly' ? room.priceMonthly : room.priceDaily;
            const priceSuffix = billingPeriod === 'monthly' ? '/ Month' : '/ Day';
            
            return (
              <motion.div
                key={room.id}
                className="group relative bg-white rounded-2xl border-2 border-slate-100 overflow-hidden shadow-sm hover:border-gold/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Status Overlay Band */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-navy-dark/90 text-white border border-white/10 shadow">
                      👤 Capacity: {room.capacity}
                    </span>
                    
                    {room.availabilityStatus === 'Available' ? (
                      <span className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase bg-emerald-600/90 text-white shadow">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded text-[10px] font-mono font-bold uppercase bg-amber-600/95 text-white shadow">
                        Filling Fast
                      </span>
                    )}
                  </div>

                  {/* Pricing Badge Bar over image */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-12">
                    <div className="flex items-end justify-between">
                      <span className="text-white/80 text-xs font-mono tracking-widest uppercase font-semibold">
                        {room.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info and pricing section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-navy-dark tracking-tight mb-2 group-hover:text-gold-dark transition-colors">
                      {room.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      {room.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2.5 mb-8">
                      {room.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and booking triggers */}
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Pricing Rate</div>
                        <div className="text-2xl font-display font-extrabold text-navy-dark mt-1 flex items-baseline gap-1">
                          {formatPrice(price)}
                          <span className="text-xs text-slate-400 font-sans font-medium">{priceSuffix}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">
                        ★ Tax Inclusive
                      </span>
                    </div>

                    <button
                      onClick={() => onBookRoom(room.name)}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 group-hover:bg-gold hover:!bg-gold-dark text-white group-hover:text-navy-dark font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      Book This Room
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Small warning about security deposit */}
        <p className="text-center font-mono text-[10px] text-slate-400 mt-12 uppercase tracking-wider">
          💡 Note: Refundable safety deposit applies for monthly bookings. No extra hidden charges.
        </p>

      </div>
    </section>
  );
}
