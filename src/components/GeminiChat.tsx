/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, MessageCircle, AlertCircle, RefreshCw, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'model',
      text: "Assalam-o-Alaikum! ✨ Welcome to Karak Hostel's premium residency assistant. I can guide you through our rates, landmarks, or catering plans instantly.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: 'Suggest Room Matching 🏠', message: 'Match me a room! I study at university and need quiet study space, but also have a budget.' },
    { label: 'KKKUK Route & Landmarks 🎓', message: 'How do I reach the hostel from Khushal Khan Khattak University Karak (KKKUK)?' },
    { label: 'Weekly Dining Menu 🍛', message: 'What kind of meals are served in the hostel mess?' },
    { label: 'Backup Power & WiFi ⚡', message: 'Tell me about the fiber WiFi speeds and uninterrupted solar/UPS backup power.' },
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorStatus(null);
    const userMsgId = 'user-' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Server connection failed.');
      }

      const data = await res.json();
      const modelMsgId = 'model-' + Date.now();
      const newModelMessage: ChatMessage = {
        id: modelMsgId,
        role: 'model',
        text: data.reply || "I'm sorry, I couldn't process your question at the moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, newModelMessage]);
    } catch (err: any) {
      console.error('Gemini chat widget error:', err);
      setErrorStatus(
        err.message || 'Apologies! Our AI is undergoing scheduled tuning. Please reach out via WhatsApp for immediate room reservation guides.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSendMessage(input);
  };

  return (
    <>
      {/* CUTE iOS FLOATING LAUNCH TRIGGER */}
      <div className="fixed bottom-24 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-full bg-white/90 backdrop-blur-xl text-[#007AFF] shadow-xl flex items-center justify-center cursor-pointer border border-[#8E8E93]/20 relative group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Subtle iOS notification badge dot */}
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-[#FF3B30] border border-white" />
          
          <div className="flex items-center gap-2 px-1">
            <Smartphone className="w-5 h-5 text-[#007AFF]" />
            <span className="text-xs font-sans font-semibold tracking-tight hidden md:inline text-slate-800">
              Ask Resident AI
            </span>
          </div>
        </motion.button>
      </div>

      {/* iOS IMESSAGE STYLE DIALOG */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 sm:right-6 sm:bottom-6 sm:top-auto sm:inset-y-auto w-full sm:w-[380px] sm:max-h-[560px] h-full sm:h-[510px] bg-white/95 backdrop-blur-2xl border-0 sm:border border-[#C7C7CC]/50 shadow-2xl sm:rounded-2xl flex flex-col overflow-hidden z-50 text-slate-900"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
            initial={{ opacity: 0, y: 80, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.94 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            {/* iOS Styled Header */}
            <div className="px-4 py-3 bg-[#F2F2F7]/95 border-b border-[#C7C7CC]/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center text-white text-xs font-bold font-mono">
                  KH
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-tight text-slate-900">
                    Karak Residency Assistant
                  </h4>
                  <span className="block text-[10px] text-[#8E8E93] font-medium">
                    Typical response: Under 5 sec
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-[#E5E5EA] flex items-center justify-center text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
                aria-label="Dismiss Dialogue"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* iOS Conversation Canvas */}
            <div className="grow overflow-y-auto p-4 flex flex-col gap-3 bg-white">
              
              {/* Notice Banner */}
              <div className="p-3 bg-[#F2F2F7] rounded-xl border border-transparent text-[11px] text-[#48484A] leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#007AFF] shrink-0 mt-0.5" />
                <span>
                  Experience our <strong>Super Premium Gemini Core</strong> assistant configured directly for matching, landmarks & pricing.
                </span>
              </div>

              {messages.map((msg) => {
                const isModel = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      isModel ? 'self-start' : 'self-end items-end'
                    }`}
                  >
                    {/* iOS iMessage Bubble Shape */}
                    <div
                      className={`px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                        isModel
                          ? 'bg-[#E5E5EA] text-black rounded-tl-sm shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                          : 'bg-[#007AFF] text-white rounded-tr-sm shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                      }`}
                    >
                      <div className="whitespace-pre-line text-[13px] tracking-normal">
                        {msg.text}
                      </div>
                    </div>
                    {/* Timestamp label */}
                    <span className="text-[9px] text-[#8E8E93] font-medium mt-0.5 px-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {/* Typing simulation */}
              {isLoading && (
                <div className="flex flex-col max-w-[80%] self-start">
                  <div className="px-4 py-2.5 rounded-2xl bg-[#E5E5EA] text-slate-800 rounded-tl-sm text-xs flex items-center gap-1">
                    <span className="flex gap-1 items-center py-1">
                      <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}

              {/* Error handle inline */}
              {errorStatus && (
                <div className="p-3 bg-[#FFDBDB] text-[#FF3B30] rounded-xl flex flex-col gap-2 border border-[#FF453A]/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-medium leading-relaxed">
                      {errorStatus}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <a
                      href="https://wa.me/923339691856"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#34C759] text-white text-[10px] font-semibold rounded-md"
                    >
                      WhatsApp Support
                    </a>
                    <button
                      onClick={() => handleSendMessage(messages[messages.length - 1]?.text || 'Hello!')}
                      className="px-2.5 py-1 bg-[#E5E5EA] text-slate-800 text-[10px] font-semibold rounded-md"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* iOS quick starters list */}
            <div className="px-4 py-2.5 bg-[#F2F2F7] border-t border-[#C7C7CC]/30 shrink-0">
              <span className="text-[9px] font-semibold text-[#8E8E93] uppercase tracking-wider block mb-1.5">
                Suggested Actions
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.message)}
                    className="px-2.5 py-1.5 rounded-lg bg-white text-[#007AFF] border border-[#C7C7CC]/30 hover:bg-[#E5F1FF] text-[11px] font-medium transition-all shrink-0 cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* iOS Style Input Box */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-[#C7C7CC]/30 flex gap-2 items-center shrink-0">
              <input
                type="text"
                placeholder="iMessage Room Expert..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="grow px-3.5 py-1.5 text-sm bg-[#F2F2F7] border-0 focus:ring-1 focus:ring-[#007AFF] rounded-full focus:outline-none focus:bg-[#E5E5EA]/50 text-slate-900 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-1.5 rounded-full bg-[#007AFF] hover:bg-[#0056B3] text-white disabled:opacity-30 cursor-pointer transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
