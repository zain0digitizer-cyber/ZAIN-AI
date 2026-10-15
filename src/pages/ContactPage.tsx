import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare, MapPin, Phone, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { addContactMessage } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const subjects = [
    'General Inquiry',
    'Enterprise AI Solutions',
    'Custom AI Agent Development',
    'Educational Partnerships',
    'Security & Compliance Review',
    'Feedback & Suggestions',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    setError('');
    addContactMessage({
      fullName,
      email,
      subject,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 text-center max-w-2xl mx-auto">
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
          Communication & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Get in Touch</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Have a question about ZAIN TECH platform capabilities, enterprise integrations, or custom AI development?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Direct Channels
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Direct Email</div>
                  <div className="text-xs text-cyan-400">zain0digitizer@gmail.com</div>
                  <div className="text-[11px] text-slate-500">Fast response within 24 hours</div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Global Headquarters</div>
                  <div className="text-xs text-slate-300">San Francisco, California</div>
                  <div className="text-[11px] text-slate-500">Distributed Global AI Architecture Team</div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-violet-950 text-violet-400 border border-violet-800 flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Consultation Booking</div>
                  <div className="text-xs text-slate-300">Interactive Calendar Available</div>
                  <div className="text-[11px] text-slate-500">Book direct engineering reviews</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900 border border-cyan-500/30">
              <span className="text-xs font-bold text-cyan-300 block mb-1">
                🔒 Enterprise Security SLA
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All client messages and technical inquiries are stored securely with Row Level Security.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#090f20] border border-slate-800">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Transmitted Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{fullName}</strong>. Your inquiry has been routed to our lead engineering team. We will reply to <span className="text-cyan-400">{email}</span> promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">
                  Send Us an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell us about your project, timeline, architecture needs, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to ZAIN TECH</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
