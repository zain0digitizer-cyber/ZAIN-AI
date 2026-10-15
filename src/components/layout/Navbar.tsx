import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Bell,
  User as UserIcon,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Keyboard } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenShortcuts?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onToggleSidebar,
  onOpenSearch,
  onOpenShortcuts,
}) => {
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'AI Engine Upgraded', desc: 'Gemini 3.8 Flash & Lite Image pipelines operational.', time: 'Just now' },
    { id: 2, title: 'New Tutorial Available', desc: 'Asynchronous concurrency in Python and C++.', time: '2h ago' },
    { id: 3, title: 'Consultation Confirmed', desc: 'Next architecture review booked for Oct 20.', time: '1d ago' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#070b16]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 lg:hidden transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => onNavigate('/')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#090e1f] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 text-lg sm:text-xl">
                ZAIN TECH
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold tracking-widest bg-cyan-950/90 text-cyan-400 border border-cyan-800/60 uppercase">
                AI CORE
              </span>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:block tracking-tight font-medium">
              Your Intelligence. Your Creativity. Your Future.
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Quick Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-xs"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search AI tools, tutorials, code...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Status Pill, Notifications & User */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Status chip */}
        <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 text-[11px] font-medium">Gemini 3.8 Flash • Online</span>
        </div>

        {/* Search icon on mobile */}
        <button
          onClick={onOpenSearch}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 md:hidden transition-colors"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Keyboard Shortcuts Trigger Button */}
        {onOpenShortcuts && (
          <button
            onClick={onOpenShortcuts}
            className="hidden sm:flex items-center space-x-1.5 p-2 px-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors text-xs font-mono"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-semibold text-slate-300 hidden lg:inline">Shortcuts</span>
            <kbd className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] text-cyan-400 border border-slate-700">
              ?
            </kbd>
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0c1326] border border-slate-700/80 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-semibold text-xs text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-cyan-400">3 new</span>
              </div>
              <div className="divide-y divide-slate-800/60 mt-2">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5">
                    <div className="text-xs font-medium text-slate-200">{n.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{n.desc}</div>
                    <div className="text-[9px] text-slate-500 mt-1">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Account / Profile */}
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 transition-all"
            >
              <img
                src={user.avatarUrl || 'https://api.dicebear.com/7.x/bottts/svg?seed=zain'}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover border border-cyan-500/40"
              />
              <span className="text-xs font-semibold text-slate-200 max-w-[90px] truncate hidden sm:inline-block">
                {user.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#0c1326] border border-slate-700/80 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-2 border-b border-slate-800">
                  <div className="font-semibold text-sm text-white truncate">{user.name}</div>
                  <div className="text-xs text-slate-400 truncate">{user.email}</div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin'
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                          : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800'
                      }`}
                    >
                      {user.role} role
                    </span>
                  </div>
                </div>

                {/* Role Switcher Demo for quick testing */}
                <div className="my-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-medium mb-1">Testing Role Toggle:</div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => loginAsDemo('user')}
                      className={`flex-1 py-1 text-[11px] rounded font-medium transition-colors ${
                        user.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      User View
                    </button>
                    <button
                      onClick={() => loginAsDemo('admin')}
                      className={`flex-1 py-1 text-[11px] rounded font-medium transition-colors ${
                        user.role === 'admin' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Admin View
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      onNavigate('/dashboard');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    Dashboard
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        onNavigate('/admin');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/30 transition-colors flex items-center justify-between"
                    >
                      <span>Admin Center</span>
                      <Shield className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onNavigate('/settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    Settings & Keys
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/40 transition-colors flex items-center space-x-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate('/login')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('/signup')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-90 shadow-md shadow-cyan-500/20 transition-all"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
