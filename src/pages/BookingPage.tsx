import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Video,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BookingPage: React.FC = () => {
  const { addBooking, bookings } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('AI Architecture & Systems Review');
  const [date, setDate] = useState('2026-10-22');
  const [time, setTime] = useState('14:00');
  const [projectDescription, setProjectDescription] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [error, setError] = useState('');

  const services = [
    {
      name: 'AI Architecture & Systems Review',
      duration: '45 mins',
      desc: 'Deep architectural evaluation of your LLM pipelines, security, and edge hosting.',
    },
    {
      name: 'Full-Stack SaaS Advisory',
      duration: '60 mins',
      desc: 'Technical guidance on React 19, TypeScript, PostgreSQL schemas, and RLS policies.',
    },
    {
      name: 'Autonomous AI Agent Engineering',
      duration: '45 mins',
      desc: 'Design of background worker agents, tool-calling frameworks, and memory stores.',
    },
    {
      name: 'Executive AI Strategy Consultation',
      duration: '30 mins',
      desc: 'Product roadmap advisory and cost-optimization for enterprise AI models.',
    },
  ];

  const availableTimes = ['10:00', '11:00', '13:00', '14:00', '15:30', '17:00'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !date || !time) {
      setError('Please fill in all booking fields.');
      return;
    }

    setError('');

    const success = addBooking({
      fullName,
      email,
      service,
      date,
      time,
      projectDescription: projectDescription || 'General Consultation',
    });

    if (!success) {
      setError(`Slot on ${date} at ${time} is already reserved. Please select another slot.`);
      return;
    }

    setConfirmedBooking({
      fullName,
      email,
      service,
      date,
      time,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pb-4 border-b border-slate-800">
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-violet-950 text-violet-400 border border-violet-800 uppercase">
          Engineering Advisory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          Book an AI Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Schedule a direct technical consultation with ZAIN TECH AI architects and senior cloud engineers.
        </p>
      </div>

      {confirmedBooking ? (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#090f20] border border-cyan-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-white">Consultation Confirmed!</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Your appointment has been registered in the ZAIN TECH calendar.
            </p>
          </div>

          {/* Ticket preview */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Consultation Service:</span>
              <span className="text-cyan-400 font-bold">{confirmedBooking.service}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Reserved Date:</span>
              <span className="text-white font-bold">{confirmedBooking.date}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Time & Timezone:</span>
              <span className="text-white font-bold">{confirmedBooking.time} ({confirmedBooking.timeZone})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Attendee:</span>
              <span className="text-slate-200">{confirmedBooking.fullName} &lt;{confirmedBooking.email}&gt;</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800 text-xs text-cyan-300 flex items-center justify-center gap-2">
            <Video className="w-4 h-4 text-cyan-400" />
            <span>A secure encrypted video conference link has been dispatched to your email.</span>
          </div>

          <button
            onClick={() => setConfirmedBooking(null)}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Book Another Session
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Picker (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                1. Select Advisory Service
              </h3>

              <div className="space-y-2.5">
                {services.map((s) => {
                  const isSelected = service === s.name;
                  return (
                    <div
                      key={s.name}
                      onClick={() => setService(s.name)}
                      className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-500/80 shadow-md'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{s.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {s.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{s.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Timezone: <strong>{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong></span>
              </div>
            </div>
          </div>

          {/* Date, Time & Attendee Details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                2. Scheduling & Project Scope
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>
                        {t} ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zain Developer"
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
                    placeholder="zain0digitizer@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Brief Technical Objective / Project Scope
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline the main challenges, tech stack, or objectives you want to address during the consultation..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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
                className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Confirm & Reserve Consultation Slot</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
