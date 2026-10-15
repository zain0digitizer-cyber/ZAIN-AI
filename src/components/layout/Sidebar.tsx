import React from 'react';
import {
  MessageSquare,
  Code2,
  Image,
  Mic,
  BookOpen,
  FileText,
  Globe,
  LayoutDashboard,
  Calendar,
  Mail,
  Settings,
  Shield,
  Home,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl+';

  const sections = [
    {
      title: 'PLATFORM',
      items: [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: 'Hub', shortcut: `${modKey}⇧D` },
      ],
    },
    {
      title: 'AI CORE TOOLS',
      items: [
        { name: 'AI Chatbot', path: '/ai-chat', icon: MessageSquare, badge: 'v3.8', shortcut: `${modKey}1` },
        { name: 'AI Code Generator', path: '/code-generator', icon: Code2, badge: '8 Langs', shortcut: `${modKey}2` },
        { name: 'AI Image Studio', path: '/image-generator', icon: Image, badge: '8K', shortcut: `${modKey}3` },
        { name: 'Voice AI (ZAIN AI)', path: '/voice-assistant', icon: Mic, badge: 'Live', shortcut: `${modKey}4` },
      ],
    },
    {
      title: 'CREATOR SUITE',
      items: [
        { name: 'AI Website Generator', path: '/website-builder', icon: Globe, badge: 'Sandboxed', shortcut: `${modKey}5` },
        { name: 'AI Resume Builder', path: '/resume-builder', icon: FileText, badge: 'ATS Pro', shortcut: `${modKey}6` },
        { name: 'PDF AI Summarizer', path: '/pdf-summarizer', icon: FileText, badge: 'Doc QA', shortcut: `${modKey}7` },
      ],
    },
    {
      title: 'ACADEMY & ADVISORY',
      items: [
        { name: 'Programming Center', path: '/tutorials', icon: BookOpen, badge: 'Quizzes', shortcut: `${modKey}8` },
        { name: 'Book Consultation', path: '/booking', icon: Calendar },
        { name: 'Contact Us', path: '/contact', icon: Mail },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4rem)] w-72 bg-[#060a14]/95 lg:bg-[#060a14]/80 backdrop-blur-xl border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800/80 lg:hidden">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-white text-base">ZAIN TECH</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400/90 font-mono">
                {section.title}
              </div>

              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;

                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        onNavigate(item.path);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-950/80 via-indigo-950/40 to-transparent text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        {item.shortcut && (
                          <kbd className="hidden group-hover:inline-block text-[9px] px-1 py-0.2 rounded bg-slate-800 text-cyan-300 font-mono border border-slate-700/80 shadow-sm">
                            {item.shortcut}
                          </kbd>
                        )}
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-tight uppercase ${
                              isActive
                                ? 'bg-cyan-900/90 text-cyan-200 border border-cyan-500/50'
                                : 'bg-slate-800/80 text-slate-400 border border-slate-700/60'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Admin Section */}
          <div className="pt-2 border-t border-slate-800/80 space-y-1">
            <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400/90 font-mono flex items-center justify-between">
              <span>ADMIN & SYSTEM</span>
              {user?.role === 'admin' && (
                <span className="text-[9px] text-rose-400 bg-rose-950/80 px-1 rounded border border-rose-800">
                  AUTHORIZED
                </span>
              )}
            </div>

            <button
              onClick={() => {
                onNavigate('/admin');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                currentPath === '/admin'
                  ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-rose-300 hover:bg-rose-950/20'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Shield
                  className={`w-4 h-4 ${
                    currentPath === '/admin' ? 'text-rose-400' : 'text-slate-500 group-hover:text-rose-400'
                  }`}
                />
                <span>Admin Dashboard</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-rose-400" />
            </button>

            <button
              onClick={() => {
                onNavigate('/settings');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                currentPath === '/settings'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Settings
                  className={`w-4 h-4 ${
                    currentPath === '/settings' ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'
                  }`}
                />
                <span>Settings & API</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar Footer info card */}
        <div className="p-3 border-t border-slate-800/80 bg-[#04070e]">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 via-cyan-950/30 to-slate-900 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                ZAIN Pro Intelligence
              </span>
              <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              Powered by Gemini 3.8 Flash Neural Engine with high-speed streaming.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
