import React, { useState } from 'react';
import {
  Shield,
  Users,
  Activity,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, loginAsDemo } = useAuth();
  const {
    contactMessages,
    updateMessageStatus,
    bookings,
    updateBookingStatus,
    conversations,
    savedCodeList,
    generatedImages,
    savedWebsites,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'bookings' | 'users'>('overview');

  // Authorization Gate
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#090f20] border border-rose-500/40 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Administrative Access Required</h2>
            <p className="text-xs text-slate-400 mt-1.5">
              This restricted area is reserved for authenticated system administrators with verified roles.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Currently logged in as: <strong className="text-white">{user?.email || 'Guest'}</strong> (Role: {user?.role || 'none'})
          </div>

          <button
            onClick={() => loginAsDemo('admin')}
            className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-rose-950/40 transition-all"
          >
            Switch to Demo Admin Account (admin@zaintech.ai)
          </button>
        </div>
      </div>
    );
  }

  const mockUsers = [
    { id: 'usr_1', name: 'Zain Founder', email: 'admin@zaintech.ai', role: 'admin', joined: '2026-01-10', prompts: 1842 },
    { id: 'usr_2', name: 'Zain Developer', email: 'zain0digitizer@gmail.com', role: 'user', joined: '2026-02-01', prompts: 620 },
    { id: 'usr_3', name: 'Elena Rostova', email: 'elena@cybernetics.io', role: 'user', joined: '2026-03-14', prompts: 340 },
    { id: 'usr_4', name: 'Marcus Vance', email: 'm.vance@vancetech.com', role: 'user', joined: '2026-04-02', prompts: 198 },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800 uppercase flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Role: System Administrator
            </span>
            <span className="text-xs text-emerald-400 font-mono">Live Audit Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            ZAIN TECH Admin Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Monitor real-time AI workloads, client inquiries, consultation bookings, and user metrics.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'messages', label: `Inquiries (${contactMessages.length})` },
            { id: 'bookings', label: `Consultations (${bookings.length})` },
            { id: 'users', label: 'Users' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Total Registered Users</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">4,892</div>
              <span className="text-[10px] text-emerald-400 font-medium">+18% this month</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>AI Inferences Processed</span>
                <Activity className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">128,490</div>
              <span className="text-[10px] text-cyan-400 font-medium">Avg latency: 32ms</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Inbound Inquiries</span>
                <Mail className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{contactMessages.length}</div>
              <span className="text-[10px] text-slate-400 font-medium">Active in inbox</span>
            </div>

            <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Advisory Sessions</span>
                <Calendar className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{bookings.length}</div>
              <span className="text-[10px] text-emerald-400 font-medium">Confirmed appointments</span>
            </div>
          </div>

          {/* Model Status & Health Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Active Model Health Status
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { model: 'gemini-3.8-flash', purpose: 'Conversational Chat & Reasoner', status: 'Optimal', latency: '24ms' },
                  { model: 'gemini-3.8-flash (Code)', purpose: 'Syntax & AST Code Generation', status: 'Optimal', latency: '28ms' },
                  { model: 'gemini-3.1-flash-lite-image', purpose: '8K Diffusion & Vector Graphics', status: 'Operational', latency: '850ms' },
                  { model: 'gemini-3.8-flash (Web Builder)', purpose: 'Single-Page Web Application Pipeline', status: 'Optimal', latency: '340ms' },
                ].map((item) => (
                  <div key={item.model} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white font-mono">{item.model}</div>
                      <div className="text-[11px] text-slate-400">{item.purpose}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {item.status}
                      </span>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.latency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                Recent System Activity Log
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { event: 'Database RLS policy verified for tenant partitions', time: '5m ago', tag: 'SECURITY' },
                  { event: 'Vite API proxy received chat generation stream', time: '12m ago', tag: 'AI_ROUTE' },
                  { event: 'Website ZIP archive generated for user', time: '28m ago', tag: 'EXPORT' },
                  { event: 'Consultation slot booked & calendar updated', time: '1h ago', tag: 'BOOKING' },
                ].map((log, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-slate-200">{log.event}</div>
                      <div className="text-[10px] text-slate-500">{log.time}</div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {log.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Client Inquiry Messages ({contactMessages.length})</h3>
            <span className="text-xs text-slate-400">Stored via Contact Page</span>
          </div>

          <div className="space-y-3">
            {contactMessages.map((msg) => (
              <div key={msg.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">{msg.fullName}</span>{' '}
                    <span className="text-xs text-cyan-400">&lt;{msg.email}&gt;</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        msg.status === 'replied'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : msg.status === 'read'
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {msg.status}
                    </span>
                    <button
                      onClick={() => updateMessageStatus(msg.id, 'replied')}
                      className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                    >
                      Mark Replied
                    </button>
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-300">{msg.subject}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{msg.message}</p>
                <div className="text-[10px] text-slate-500 font-mono pt-1">
                  Received: {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Scheduled Consultations ({bookings.length})</h3>
            <span className="text-xs text-slate-400">Managed via Booking Calendar</span>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">{b.fullName}</span>{' '}
                    <span className="text-xs text-cyan-400">&lt;{b.email}&gt;</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        b.status === 'completed'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {b.status}
                    </span>
                    <button
                      onClick={() => updateBookingStatus(b.id, 'completed')}
                      className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
                <div className="text-xs font-semibold text-indigo-400">{b.service}</div>
                <div className="text-xs text-slate-300 font-mono">
                  📅 {b.date} at {b.time}
                </div>
                {b.projectDescription && (
                  <p className="text-xs text-slate-400">{b.projectDescription}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Platform Registered Users</h3>
            <span className="text-xs text-slate-400">Total: {mockUsers.length} accounts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-mono text-slate-400 bg-slate-900 border-b border-slate-800">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Member Since</th>
                  <th className="p-3">Inferences</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mockUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white">{u.name}</td>
                    <td className="p-3 text-cyan-400 font-mono">{u.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          u.role === 'admin'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">{u.joined}</td>
                    <td className="p-3 text-slate-300 font-mono">{u.prompts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
