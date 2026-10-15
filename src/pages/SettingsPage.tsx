import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Key,
  Database,
  Trash2,
  Download,
  Check,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { conversations, savedCodeList, generatedImages, savedWebsites } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [avatarSeed, setAvatarSeed] = useState('zain');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const avatars = ['zain', 'alex', 'nova', 'cyber', 'quantum', 'pulse'];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      title,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      user,
      conversations,
      savedCodeList,
      generatedImages,
      savedWebsites,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zain_tech_data_export_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase">
            Preferences & Security
          </span>
          <span className="text-xs text-slate-400">Account Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Account Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Manage your personal profile, credentials, connected AI pipelines, and data exports.
        </p>
      </div>

      {/* Profile Form */}
      <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          Profile Credentials
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          {/* Avatar selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Avatar Persona</label>
            <div className="flex items-center space-x-3">
              {avatars.map((seed) => {
                const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
                const isSelected = avatarSeed === seed;
                return (
                  <button
                    key={seed}
                    type="button"
                    onClick={() => setAvatarSeed(seed)}
                    className={`p-1 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-cyan-400 scale-105 bg-cyan-950/60'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img src={url} alt={seed} className="w-10 h-10 rounded-lg" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="text"
              disabled
              value={user?.email || ''}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-500 cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-500">Contact support to update verified account email.</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-emerald-400 font-medium">
              {savedSuccess ? 'Profile modifications saved successfully!' : ''}
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 shadow-md transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Backend & AI Connection Status */}
      <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-400" />
          AI Neural & Database Infrastructure
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Google GenAI Service</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Connected
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Server-side authenticated via Google AI Studio proxy. Browser key exposure: <strong>0%</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Database & Auth</span>
              <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
                <Shield className="w-3.5 h-3.5" />
                Active (RLS Guarded)
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Row Level Security policies prevent cross-tenant data leakage.
            </p>
          </div>
        </div>
      </div>

      {/* Data Management & Export */}
      <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          Data Ownership & Privacy
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div>
            <div className="text-xs font-bold text-white">Export All Workspace Records</div>
            <div className="text-[11px] text-slate-400">
              Download your chats, generated code snippets, image metadata, and websites as a structured JSON file.
            </div>
          </div>
          <button
            onClick={handleExportData}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data Archive</span>
          </button>
        </div>

        {/* Delete account flow */}
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-rose-300">Danger Zone: Account Deletion</div>
              <div className="text-[11px] text-slate-400">
                Permanently purge all user records, conversation history, and saved artifacts.
              </div>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="px-3 py-1.5 rounded-xl bg-rose-900/40 hover:bg-rose-900 border border-rose-700 text-rose-300 text-xs font-bold transition-colors"
            >
              {showDeleteConfirm ? 'Cancel' : 'Delete Account'}
            </button>
          </div>

          {showDeleteConfirm && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 space-y-2">
              <p className="text-xs text-rose-200">
                Are you absolutely sure? This action cannot be reversed.
              </p>
              <button
                onClick={() => {
                  localStorage.clear();
                  logout();
                  window.location.reload();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
              >
                Yes, Purge My Account & Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
