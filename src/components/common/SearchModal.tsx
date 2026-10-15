import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Sparkles,
  Code2,
  Image,
  Mic,
  BookOpen,
  FileText,
  Globe,
  Calendar,
  Settings,
  Shield,
  X,
  ArrowRight,
  Keyboard,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onOpenShortcutsHelp?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenShortcutsHelp,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modLabel = isMac ? '⌘' : 'Ctrl';

  const items = [
    { name: 'AI Chatbot', path: '/ai-chat', icon: Sparkles, desc: 'Conversational assistant with reasoning & code', shortcut: `${modLabel}1` },
    { name: 'AI Code Generator', path: '/code-generator', icon: Code2, desc: 'Generate, debug, explain C++, Python, JS & SQL', shortcut: `${modLabel}2` },
    { name: 'AI Image Studio', path: '/image-generator', icon: Image, desc: 'Generate 8K cinematic, 3D, and artistic visuals', shortcut: `${modLabel}3` },
    { name: 'Voice AI (ZAIN AI)', path: '/voice-assistant', icon: Mic, desc: 'Real-time conversational speech assistant', shortcut: `${modLabel}4` },
    { name: 'AI Website Generator', path: '/website-builder', icon: Globe, desc: 'Prompt-to-website with sandboxed live preview', shortcut: `${modLabel}5` },
    { name: 'AI Resume Builder', path: '/resume-builder', icon: FileText, desc: 'ATS-friendly resume maker with AI polishing', shortcut: `${modLabel}6` },
    { name: 'PDF AI Summarizer', path: '/pdf-summarizer', icon: FileText, desc: 'Extract key points, study notes & ask PDF QA', shortcut: `${modLabel}7` },
    { name: 'Programming Learning Hub', path: '/tutorials', icon: BookOpen, desc: 'Learn C++, Python, Web Dev with quizzes', shortcut: `${modLabel}8` },
    { name: 'User Dashboard', path: '/dashboard', icon: Sparkles, desc: 'Overview of all your generated AI artifacts', shortcut: `${modLabel}⇧D` },
    { name: 'Book a Consultation', path: '/booking', icon: Calendar, desc: 'Schedule AI architecture & engineering review' },
    { name: 'Account Settings', path: '/settings', icon: Settings, desc: 'Manage your profile, API models & security' },
    { name: 'Admin Dashboard', path: '/admin', icon: Shield, desc: 'System analytics, bookings & messages' },
  ];

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        onNavigate(filtered[selectedIndex].path);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#090f22] border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#0d162e]">
          <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, tool, or press ↑ ↓ to navigate..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
          />
          <div className="flex items-center space-x-2 flex-shrink-0">
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of filtered tools */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/40">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No AI tools matching "{query}"</p>
            </div>
          ) : (
            filtered.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/90 via-indigo-950/60 to-transparent border border-cyan-500/40 shadow-sm'
                      : 'hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-400 scale-105'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div
                        className={`text-sm font-semibold transition-colors ${
                          isSelected ? 'text-cyan-300' : 'text-slate-200'
                        }`}
                      >
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-400">{item.desc}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.shortcut && (
                      <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-cyan-300 font-bold shadow-sm">
                        {item.shortcut}
                      </kbd>
                    )}
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#070b16] border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-3 text-[11px]">
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">↵</kbd> to select</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenShortcutsHelp?.();
            }}
            className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Shortcuts Guide (?)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
