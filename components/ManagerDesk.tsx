/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lock, X, ClipboardList, RefreshCw, MessageCircle, FileDown, CheckCircle2, Archive, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingInquiry } from '../types';

interface ManagerDeskProps {
  isOpen: boolean;
  onClose: () => void;
  lastUpdateEpoch: number; // For refreshing data
}

export default function ManagerDesk({ isOpen, onClose, lastUpdateEpoch }: ManagerDeskProps) {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Archived'>('All');

  // Load inquiries
  const loadInquiriesFromRegistry = () => {
    try {
      const stored = localStorage.getItem('karak_hostel_bookings');
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        setInquiries([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen && isAdminUnlocked) {
      loadInquiriesFromRegistry();
    }
  }, [isOpen, isAdminUnlocked, lastUpdateEpoch]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    // Standard secure pin is admin123
    if (pinInput.trim() === 'admin123') {
      setIsAdminUnlocked(true);
      loadInquiriesFromRegistry();
    } else {
      setPinError('Invalid Manager Passcode. Please try "admin123".');
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: 'Pending' | 'Confirmed' | 'Archived') => {
    const updated = inquiries.map((item) => {
      if (item.id === id) {
        return { ...item, status: nextStatus };
      }
      return item;
    });
    setInquiries(updated);
    localStorage.setItem('karak_hostel_bookings', JSON.stringify(updated));
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking registry permanently?')) {
      const updated = inquiries.filter((item) => item.id !== id);
      setInquiries(updated);
      localStorage.setItem('karak_hostel_bookings', JSON.stringify(updated));
    }
  };

  const handleClearAllInquiries = () => {
    if (window.confirm('WARNING: Are you sure you want to purge All booked records permanently? This cannot be undone.')) {
      localStorage.removeItem('karak_hostel_bookings');
      setInquiries([]);
    }
  };

  const handleLoadDemoData = () => {
    const demo: BookingInquiry[] = [
      {
        id: 'bk_demo1',
        fullName: 'Hammad Afridi',
        phone: '0303 9876543',
        email: 'hammad.afridi@kkkuk.edu.pk',
        roomType: 'Shared Room (Triple Sharing)',
        checkInDate: '2026-06-15',
        duration: '5 Months (Full Semester block)',
        message: 'Looking for high-speed internet. I am a BS Computer Science student at KKKUK.',
        status: 'Pending',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'bk_demo2',
        fullName: 'Dr. Shah Jehan',
        phone: '0312 9012345',
        email: 'jehan.chem@gmail.com',
        roomType: 'Private Premium Room',
        checkInDate: '2026-06-12',
        duration: '1 Year (Annual Saver)',
        message: 'I am a newly appointed lecturer at the Chemistry department. Require a quiet private balcony space.',
        status: 'Confirmed',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ];
    localStorage.setItem('karak_hostel_bookings', JSON.stringify(demo));
    setInquiries(demo);
  };

  // Filter lists
  const filteredInquiries = inquiries.filter((i) => {
    if (activeFilter === 'All') return true;
    return i.status === activeFilter;
  });

  const getStats = () => {
    return {
      total: inquiries.length,
      pending: inquiries.filter((x) => x.status === 'Pending').length,
      confirmed: inquiries.filter((x) => x.status === 'Confirmed').length,
      archived: inquiries.filter((x) => x.status === 'Archived').length,
    };
  };

  const stats = getStats();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden border border-slate-200 shadow-2xl flex flex-col justify-between"
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
          >
            {/* Header top bar */}
            <div className="bg-navy-dark text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-gold" />
                <span className="font-display font-bold uppercase tracking-wider text-sm sm:text-base">
                  Manager Desk: Booking Registry
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-gold transition-colors cursor-pointer"
                aria-label="Close Manager Desk"
              >
                <X className="w-5.h-5" />
              </button>
            </div>

            {/* Main content body (Scrollable) */}
            <div className="grow overflow-y-auto p-6 bg-slate-5 w-full">
              {!isAdminUnlocked ? (
                /* Passcode Lock state container */
                <div className="max-w-md mx-auto my-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-navy-dark">Secure Administrative Access</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Provide the Karak Hostel warden pin-code to manage resident registrations and check status.
                    </p>
                  </div>

                  {pinError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded border border-red-100">
                      ⚠️ {pinError}
                    </div>
                  )}

                  <form onSubmit={handleUnlockSubmit} className="space-y-4">
                    <input
                      type="password"
                      placeholder="Enter Warden Passcode (e.g. admin123)"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-center font-mono font-bold tracking-widest text-slate-800 focus:outline-none focus:border-gold focus:bg-white"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-gold hover:bg-gold-dark text-navy-dark font-extrabold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                      Unlock Desk Records
                    </button>
                  </form>
                  <p className="text-[10px] text-slate-400 font-mono">
                    💡 HINT: The default administrative passcode key is "<span className="text-slate-600 font-bold">admin123</span>"
                  </p>
                </div>
              ) : (
                /* Unlocked Desk details panel */
                <div className="space-y-6">
                  {/* Stats Horizontal Counters */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Registered Inquiries</span>
                      <strong className="text-2xl font-display font-black text-gold">{stats.total}</strong>
                    </div>
                    <div className="bg-amber-500 text-white p-4 rounded-xl">
                      <span className="text-[10px] font-mono text-amber-100 block uppercase font-bold">Pending Review</span>
                      <strong className="text-2xl font-display font-black text-white">{stats.pending}</strong>
                    </div>
                    <div className="bg-emerald-600/90 text-white p-4 rounded-xl">
                      <span className="text-[10px] font-mono text-emerald-100 block uppercase font-bold">Confirmed Residents</span>
                      <strong className="text-2xl font-display font-black text-white">{stats.confirmed}</strong>
                    </div>
                    <div className="bg-slate-500 text-white p-4 rounded-xl">
                      <span className="text-[10px] font-mono text-slate-100 block uppercase font-bold">Archived Bookings</span>
                      <strong className="text-2xl font-display font-black text-white">{stats.archived}</strong>
                    </div>
                  </div>

                  {/* Actions Header Bar */}
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-y border-slate-200 py-4 bg-white px-4 rounded-xl">
                    {/* Status filter tabs */}
                    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                      {(['All', 'Pending', 'Confirmed', 'Archived'] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer ${
                            activeFilter === filter
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>

                    {/* Registry Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={loadInquiriesFromRegistry}
                        className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-navy-dark hover:bg-slate-50 cursor-pointer text-xs flex items-center gap-1.5"
                        title="Reload registry"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh</span>
                      </button>

                      <button
                        onClick={handleLoadDemoData}
                        className="p-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-100 cursor-pointer text-xs font-semibold flex items-center gap-1"
                      >
                        ⚡ Demo Board Setup
                      </button>

                      <button
                        onClick={handleClearAllInquiries}
                        className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 cursor-pointer text-xs font-semibold"
                        title="Purge all"
                      >
                        Purge All
                      </button>
                    </div>
                  </div>

                  {/* Registered Rows Grid */}
                  {filteredInquiries.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-xl border border-dashed border-slate-200">
                      <p className="text-sm text-slate-400">No booking registrations match your filter selection.</p>
                      <button
                        onClick={handleLoadDemoData}
                        className="mt-4 px-4 py-2 bg-navy-dark text-white border border-slate-700 hover:bg-gold hover:text-navy-dark text-xs font-bold rounded-lg cursor-pointer"
                      >
                        Initialize Demo Submissions (Warden Playground)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 shadow-sm hover:shadow transition-shadow"
                        >
                          {/* Resident description */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {inq.id}
                              </span>
                              <h4 className="text-base font-bold text-navy-dark">{inq.fullName}</h4>
                              
                              {/* Status indicators */}
                              {inq.status === 'Pending' && (
                                <span className="bg-amber-100 text-amber-800 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                                  Pending Review
                                </span>
                              )}
                              {inq.status === 'Confirmed' && (
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                                  Confirmed
                                </span>
                              )}
                              {inq.status === 'Archived' && (
                                <span className="bg-slate-100 text-slate-700 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                                  Archived
                                </span>
                              )}
                            </div>

                            {/* Multi parameters */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1 text-xs text-slate-500">
                              <div>📞 Phone: <strong>{inq.phone}</strong></div>
                              <div>📧 Email: <strong>{inq.email}</strong></div>
                              <div>🏠 Room: <strong>{inq.roomType}</strong></div>
                              <div>📅 Date CheckIn: <strong>{inq.checkInDate}</strong></div>
                            </div>

                            {/* Message or preference notes */}
                            <p className="text-xs text-slate-400 bg-slate-50 p-2.5 rounded border border-slate-100 max-w-2xl leading-relaxed">
                              📝 <span className="italic">Notes:</span> "{inq.message}"
                            </p>
                          </div>

                          {/* Controls column */}
                          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 w-full md:w-auto shrink-0 self-end md:self-center">
                            {/* Call to direct chat WhatsApp */}
                            <a
                              href={`https://wa.me/${inq.phone.replace(/\s+/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-2 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] font-mono flex items-center justify-center gap-1.5 border border-emerald-200 cursor-pointer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Warden Chat</span>
                            </a>

                            {/* Update states */}
                            <div className="flex gap-1.5 justify-center">
                              {inq.status !== 'Confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(inq.id, 'Confirmed')}
                                  className="p-2 rounded hover:bg-emerald-50 text-emerald-600 bg-slate-50 border border-slate-200 cursor-pointer"
                                  title="Approve confirmation"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              {inq.status !== 'Archived' && (
                                <button
                                  onClick={() => handleUpdateStatus(inq.id, 'Archived')}
                                  className="p-2 rounded hover:bg-indigo-50 text-indigo-600 bg-slate-50 border border-slate-200 cursor-pointer"
                                  title="Archive booking"
                                >
                                  <Archive className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-2 rounded hover:bg-red-50 text-red-600 bg-slate-50 border border-slate-200 cursor-pointer"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom bar */}
            <div className="bg-slate-100 px-6 py-3.5 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 shrink-0 select-none">
              <span>Warden Registry Playground: local storage scope</span>
              <span>Passcode: admin123</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
