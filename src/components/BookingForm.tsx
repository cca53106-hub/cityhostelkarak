/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Mail, User, Info, CheckCircle2, Bookmark, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingInquiry } from '../types';

interface BookingFormProps {
  selectedRoom: string;
  onBookingSubmitted: () => void;
}

export default function BookingForm({ selectedRoom, onBookingSubmitted }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    roomType: 'Shared Room (Triple Sharing)',
    checkInDate: '',
    duration: '3 Months (Standard Semester)',
    message: '',
  });

  const [formError, setFormError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingInquiry | null>(null);

  // Sync with selectedRoom prop from parent
  useEffect(() => {
    if (selectedRoom) {
      setFormData((prev) => ({
        ...prev,
        roomType: selectedRoom,
      }));
    }
  }, [selectedRoom]);

  const durationOptions = [
    'Short Term (1-15 Days)',
    '1 Month trial',
    '3 Months (Standard Semester)',
    '5 Months (Full Semester block)',
    '1 Year (Annual Saver)',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Basic Validation checks
    if (!formData.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    
    // Pakistani Phone validation (accepting standard format, typically starting with +92 or 03)
    const phoneTrimmed = formData.phone.replace(/\s+/g, '');
    if (!phoneTrimmed || phoneTrimmed.length < 10) {
      setFormError('Please enter a valid Pakistani phone or mobile number (example: 03339691856).');
      return;
    }

    if (!formData.checkInDate) {
      setFormError('Please select a preferred check-in date.');
      return;
    }

    // Capture booking object
    const newInquiry: BookingInquiry = {
      id: 'bk_' + Math.random().toString(36).substring(2, 9),
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || 'Not Provided',
      roomType: formData.roomType,
      checkInDate: formData.checkInDate,
      duration: formData.duration,
      message: formData.message.trim() || 'No additional notes provided.',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    try {
      // Load current bookings list from localStorage
      const existingInquiriesJson = localStorage.getItem('karak_hostel_bookings');
      const inquiriesList: BookingInquiry[] = existingInquiriesJson ? JSON.parse(existingInquiriesJson) : [];
      
      // Store new inquiry
      inquiriesList.unshift(newInquiry);
      localStorage.setItem('karak_hostel_bookings', JSON.stringify(inquiriesList));

      setSubmittedData(newInquiry);
      setIsSuccess(true);
      onBookingSubmitted(); // Notify parent state if needed
    } catch (err) {
      console.error('Storage quota issue: ', err);
      // Fallback display success even if storage locks
      setIsSuccess(true);
    }
  };

  // Helper to open WhatsApp pre-filled with beautiful text format
  const handleWhatsAppSend = () => {
    if (!submittedData) return;

    const managerPhone = '923339691856'; // Owner WhatsApp
    const waText = 
`⚡ *KARAK HOSTEL BOOKING INQUIRY* ⚡
-----------------------------------------
👤 *Resident:* ${submittedData.fullName}
📞 *Phone Number:* ${submittedData.phone}
📧 *Email:* ${submittedData.email}
🏠 *Room Selected:* ${submittedData.roomType}
📅 *Check-In Date:* ${submittedData.checkInDate}
⏳ *Stay Duration:* ${submittedData.duration}
💬 *Resident Note:* ${submittedData.message}
-----------------------------------------
_Please confirm room availability and outline security fees._`;

    const encodedText = encodeURIComponent(waText);
    window.open(`https://wa.me/${managerPhone}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      roomType: 'Shared Room (Triple Sharing)',
      checkInDate: '',
      duration: '3 Months (Standard Semester)',
      message: '',
    });
    setIsSuccess(false);
    setSubmittedData(null);
  };

  return (
    <section id="book-now" className="py-20 lg:py-28 bg-slate-50 text-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Double Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Text Detail Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <span className="text-xs font-mono uppercase text-gold-dark font-bold">Fast Lane Inquiry</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-dark tracking-tight leading-tight">
              Reserve Your Premium Space Today
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Fill out this instant booking form. After submission, you can immediately send the structured receipt directly to our Warden via WhatsApp for instant processing.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                Our Verification Flow
              </h4>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-amber-50 text-gold-dark shrink-0">
                  <span className="text-xs font-bold font-mono">01</span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-navy-dark">Submit the Form</h5>
                  <p className="text-xs text-slate-500">Provide verified contact details and selection preferences here.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 shrink-0">
                  <span className="text-xs font-bold font-mono">02</span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-navy-dark">Send Receipt over WhatsApp</h5>
                  <p className="text-xs text-slate-500">Redirect instantly to wardens chat box using our automated template generator.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-blue-50 text-blue-600 shrink-0">
                  <span className="text-xs font-bold font-mono">03</span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-navy-dark">Secure Confirmation</h5>
                  <p className="text-xs text-slate-500">The warden will crossverify seats on site at Jail Chowk and lock your reserve spot!</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-3 text-xs text-orange-800">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <span>We advise Khushal Khan Khattak university students to book at least 7 days before exams/semester dates to lock budget spots.</span>
            </div>
          </div>

          {/* Right Form Card Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/50 shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="booking-form"
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-display font-bold text-navy-dark">Online Inquiry Form</h3>
                    <p className="text-xs text-slate-400">Guaranteed response within 4 hours during desk times.</p>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 text-xs text-red-700 font-medium">
                      ⚠️ {formError}
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Hammad Khattak"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white transition-all text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone and Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Phone / Mobile No *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 0333 9691856"
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white transition-all text-slate-800"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. user@gmail.com"
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white transition-all text-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room selection and Checkin Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Room Option *</label>
                      <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white transition-all text-slate-800 cursor-pointer"
                        required
                      >
                        <option value="Shared Room (Triple Sharing)">Shared Room (Triple Sharing)</option>
                        <option value="Double Sharing Room">Double Sharing Room</option>
                        <option value="Private Premium Room">Private Premium Room (Single)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Expected Check-In Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          name="checkInDate"
                          value={formData.checkInDate}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white transition-all text-slate-800 cursor-pointer"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Duration option */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Duration of Stay *</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white transition-all text-slate-800 cursor-pointer"
                      required
                    >
                      {durationOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Notes message */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Notes or Special Requirements</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g. Dietary details, room preference, study requirements, etc."
                      rows={3}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-gold focus:bg-white transition-all text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold hover:bg-gold-dark text-navy-dark font-extrabold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-gold/15 hover:shadow-gold/30 mt-6"
                  >
                    Reserve Your Room Now
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  className="space-y-6 text-center py-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-extrabold text-navy-dark">Inquiry Registered Offline!</h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                      Thank you, <strong className="text-slate-800">{submittedData?.fullName}</strong>! Your inquiry is safely persisted inside the local browser registry.
                    </p>
                  </div>

                  {/* Reciept Preview Summary Details */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left text-sm max-w-md mx-auto space-y-2.5">
                    <div className="text-xs font-mono text-slate-400 border-b border-slate-200/60 pb-1.5 uppercase font-bold tracking-wider">
                      🔖 Local Receipt: {submittedData?.id}
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block">Resident Selected</span>
                      <strong className="text-navy-dark">{submittedData?.roomType}</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400 text-xs block">Check In Date</span>
                        <strong className="text-navy-dark">{submittedData?.checkInDate}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-xs block">Expected Stay</span>
                        <strong className="text-navy-dark">{submittedData?.duration}</strong>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-xs block">Emergency Dial</span>
                      <strong className="text-navy-dark">{submittedData?.phone}</strong>
                    </div>
                  </div>

                  {/* Immediate Action Row */}
                  <div className="space-y-3 pt-4 max-w-md mx-auto">
                    <button
                      onClick={handleWhatsAppSend}
                      className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2.5 shadow-md shadow-emerald-950/15 cursor-pointer text-sm animate-pulse hover:animate-none"
                    >
                      {/* Simple custom inline WhatsApp SVG icon */}
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.019 14.07 1.002 11.47 1.002 6.033 1.003 1.61 5.372 1.606 10.801c-.001 1.654.437 3.262 1.269 4.693l-.938 3.424 3.52-.924c1.284.7 2.724 1.062 4.19 1.06zM17.433 14.3c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.724.16-.215.32-.83.1.04-1.02 1.15-.19.213-.38.16-.7-.16l-.724-1.742c-.2-.481-.406-.413-.561-.42l-.48-.01c-.16 0-.43.06-.65.3-.23.24-.86.84-.86 2.06 0 1.22.89 2.4.99 2.56.1.16 1.75 2.67 4.24 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.55-.32z" />
                      </svg>
                      Express Proceed on WhatsApp (Instant)
                    </button>

                    <button
                      onClick={handleResetForm}
                      className="w-full py-3.5 rounded-xl border border-slate-300 font-bold text-slate-500 hover:text-navy-dark hover:bg-slate-50 transition-colors cursor-pointer text-xs uppercase"
                    >
                      Fill New Inquiry Form
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
