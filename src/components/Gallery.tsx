/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'All' | 'Rooms' | 'Amenities' | 'Lobby' | 'Dining'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items by active category
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  // Handle keyboard events inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredItems.length;
    });
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-slate-900 text-white scroll-mt-10 relative">
      
      {/* Background patterns */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-gold font-bold">Virtual Photographic Tour</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
              Explore Our Living Space
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Take a high-resolution glance at our clean shared dorms, silent study areas, hygienic canteen, and reliable building protection systems.
            </p>
          </div>

          {/* Tab Categories */}
          <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-lg border border-white/10 self-start md:self-end">
            {([
              { id: 'All', name: 'All Photos' },
              { id: 'Rooms', name: 'Our Rooms' },
              { id: 'Amenities', name: 'Study & Amenities' },
              { id: 'Dining', name: 'Dining Hall' },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setLightboxIndex(null);
                }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gold text-navy-dark shadow-md shadow-gold/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative rounded-xl overflow-hidden aspect-4/3 bg-slate-800 cursor-pointer border border-white/10 shadow-sm"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Real image with referer protection */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-gold tracking-widest font-bold">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{item.title}</h4>
                    </div>
                    <div className="p-2 rounded-full bg-gold/15 text-gold border border-gold/30">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Simple category tag (visible consistently on mobile) */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-navy-dark/80 backdrop-blur border border-white/10 text-[9px] font-mono text-slate-300 tracking-wider uppercase group-hover:hidden">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal overlay */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Top control bar */}
              <div className="absolute top-4 inset-x-0 px-6 flex items-center justify-between text-white z-50">
                <div className="text-xs font-mono text-slate-400">
                  📷 Photo {lightboxIndex + 1} of {filteredItems.length} | {filteredItems[lightboxIndex].category}
                </div>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 hover:text-gold transition-colors focus:outline-none cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Left */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:text-gold transition-colors focus:outline-none z-50 cursor-pointer hidden sm:block"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Image Frame container (fades in on switch) */}
              <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center overflow-hidden">
                <motion.img
                  key={lightboxIndex}
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 select-none shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Navigation Right */}
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:text-gold transition-colors focus:outline-none z-50 cursor-pointer hidden sm:block"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Bottom description bar */}
              <div className="text-center max-w-xl mt-6 px-4">
                <h3 className="text-lg font-display font-bold text-gold">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                  {filteredItems[lightboxIndex].description}
                </p>
                <div className="flex gap-4 justify-center items-center mt-4 sm:hidden">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 bg-white/5 text-xs text-white rounded font-medium cursor-pointer"
                  >
                    ◀ Prev
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-white/5 text-xs text-white rounded font-medium cursor-pointer"
                  >
                    Next ▶
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
