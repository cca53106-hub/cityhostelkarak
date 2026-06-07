/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // Form states for submitting new review
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Student',
    rating: 5,
    comment: '',
  });
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Load reviews from localStorage or fallback to standard config on first start
    try {
      const stored = localStorage.getItem('karak_hostel_reviews');
      if (stored) {
        setReviewsList(JSON.parse(stored));
      } else {
        setReviewsList(TESTIMONIALS);
        localStorage.setItem('karak_hostel_reviews', JSON.stringify(TESTIMONIALS));
      }
    } catch (e) {
      setReviewsList(TESTIMONIALS);
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const testimonial: Testimonial = {
      id: 'rev_' + Math.random().toString(36).substring(2, 9),
      name: newReview.name.trim(),
      role: newReview.role,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }),
    };

    const updated = [testimonial, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem('karak_hostel_reviews', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setShowThankYou(true);
    setNewReview({ name: '', role: 'Student', rating: 5, comment: '' });
    
    setTimeout(() => {
      setShowThankYou(false);
      setIsWriteOpen(false);
    }, 2500);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-slate-900 text-white scroll-mt-10 overflow-hidden relative">
      
      {/* Decorative accent glow elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-gold font-bold">Resident Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
              What Our Residents Say
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Real endorsements from students, faculty members, and working professionals who have chosen Karak Hostel near Jail Chowk.
            </p>
          </div>

          <button
            onClick={() => setIsWriteOpen(!isWriteOpen)}
            className="px-5 py-2.5 bg-white/10 hover:bg-gold hover:text-navy-dark text-slate-200 hover:-translate-y-0.5 border border-white/15 hover:border-gold/30 font-bold text-xs tracking-wider uppercase rounded-md transition-all flex items-center gap-1.5 self-start md:self-end cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write Guest Review</span>
          </button>
        </div>

        {/* Guest Write Review slide overlay */}
        <AnimatePresence>
          {isWriteOpen && (
            <motion.div
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-16 shadow-xl relative"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!showThankYou ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <h4 className="text-sm font-mono uppercase tracking-widest text-gold font-bold">
                    Share Your Resident Experience
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Asad Khattak"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-gold text-sm text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Occupation / Subtitle *</label>
                      <input
                        type="text"
                        placeholder="e.g. BS Mathematics Student"
                        value={newReview.role}
                        onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-gold text-sm text-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Star Assessment</label>
                    <div className="flex gap-1.5 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 transition-transform hover:scale-110 ${
                              star <= newReview.rating ? 'fill-gold text-gold' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Commentary Note *</label>
                    <textarea
                      placeholder="Share details about cleanliness, security guard, internet speed, study context, etc."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-gold text-sm text-white"
                      required
                    />
                  </div>

                  {/* Trigger buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsWriteOpen(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-gold text-navy-dark hover:bg-gold-dark text-xs font-bold rounded cursor-pointer"
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/40 animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Review Posted!</h4>
                  <p className="text-xs text-slate-400">
                    Thank you! Your verified resident testimony was successfully appended to the registry.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List Panel/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev, idx) => (
            <motion.div
              key={rev.id}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow hover:border-gold/30 hover:bg-white/8 transition-all duration-300"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div>
                {/* Stars List */}
                <div className="flex gap-1.5 text-gold mb-4">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-sm text-slate-300 leading-relaxed font-normal italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Verified Author detail on bottom */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-white/10 shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-sm text-gold-light select-none">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    {rev.name}
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block align-middle" title="Verified Resident Status" />
                  </h5>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
