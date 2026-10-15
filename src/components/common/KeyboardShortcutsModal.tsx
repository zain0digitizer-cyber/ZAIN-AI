import React from 'react';
import { X, Keyboard, Sparkles, Command } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modLabel = isMac ? '⌘' : 'Ctrl';

  const shortcutGroups = [
    {
      title: 'Global Navigation & Tools',
      shortcuts: [
        { key: `${modLabel} + K`, desc: 'Toggle Command Palette & Search' },
        { key: `${modLabel} + 1`, desc: 'Launch AI Chatbot', path: '/ai-chat' },
        { key: `${modLabel} + 2`, desc: 'Launch AI Code Generator', path: '/code-generator' },
        { key: `${modLabel} + 3`, desc: 'Launch AI Image Studio', path: '/image-generator' },
        { key: `${modLabel} + 4`, desc: 'Launch Voice AI (ZAIN AI)', path: '/voice-assistant' },
        { key: `${modLabel} + 5`, desc: 'Launch AI Website Generator', path: '/website-builder' },
      ],
    },
    {
      title: 'Productivity & Workspace',
      shortcuts: [
        { key: `${modLabel} + 6`, desc: 'Open AI Resume Builder', path: '/resume-builder' },
        { key: `${modLabel} + 7`, desc: 'Open PDF AI Summarizer', path: '/pdf-summarizer' },
        { key: `${modLabel} + 8`, desc: 'Open Programming Learning Hub', path: '/tutorials' },
        { key: `${modLabel} + Shift + D`, desc: 'Go to User Dashboard', path: '/dashboard' },
        { key: `Alt + H`, desc: 'Return to Homepage', path: '/' },
        { key: '?', desc: 'Show/Hide Keyboard Shortcuts' },
        { key: 'Esc', desc: 'Close open dialogs & menus' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#090f20] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl shadow-cyan-950/60 overflow-hidden relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400">Accelerate your workflow with instant hotkeys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-6 max-h-[65vh] overflow-y-auto pr-1">
          {shortcutGroups.map((group) => (
            <div key={group.title} className="space-y-2.5">
              <h4 className="text-[11px] font-bold uppercase font-mono tracking-wider text-cyan-400">
                {group.title}
              </h4>
              <div className="space-y-1.5">
                {group.shortcuts.map((sc, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (sc.path) {
                        onNavigate(sc.path);
                        onClose();
                      }
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs transition-colors ${
                      sc.path ? 'hover:bg-slate-800 hover:border-cyan-500/40 cursor-pointer' : ''
                    }`}
                  >
                    <span className="text-slate-300 font-medium">{sc.desc}</span>
                    <div className="flex items-center space-x-1">
                      {sc.key.split('+').map((k, kidx) => (
                        <kbd
                          key={kidx}
                          className="px-2 py-1 rounded bg-[#0e1629] border border-slate-700/80 text-[11px] font-mono text-cyan-300 shadow-sm"
                        >
                          {k.trim()}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]">?</kbd> anywhere to toggle this guide</span>
          <span className="text-cyan-400">ZAIN TECH Workflow</span>
        </div>
      </div>
    </div>
  );
};
