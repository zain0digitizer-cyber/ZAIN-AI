import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#050811] border-t border-slate-800/80 pt-12 pb-8 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#090e1f] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                ZAIN TECH
              </span>
            </div>
            <p className="text-sm text-cyan-400 font-medium italic">
              "Your Intelligence. Your Creativity. Your Future."
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              ZAIN TECH is a unified AI ecosystem merging intelligent conversational agents, multi-language code generation, 8K creative image studios, interactive programming academies, and cloud site builders.
            </p>
            <div className="flex items-center space-x-3 text-slate-400 pt-1">
              <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 cursor-pointer transition-all">
                <Twitter className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 cursor-pointer transition-all">
                <Github className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500/50 cursor-pointer transition-all">
                <Linkedin className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Core AI Tools */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              AI Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/ai-chat')} className="hover:text-cyan-300 transition-colors">
                  AI Chatbot
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/code-generator')} className="hover:text-cyan-300 transition-colors">
                  AI Code Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/image-generator')} className="hover:text-cyan-300 transition-colors">
                  AI Image Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/voice-assistant')} className="hover:text-cyan-300 transition-colors">
                  Voice AI (ZAIN AI)
                </button>
              </li>
            </ul>
          </div>

          {/* Creator & Academy */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Creator & Academy
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/website-builder')} className="hover:text-cyan-300 transition-colors">
                  Website Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resume-builder')} className="hover:text-cyan-300 transition-colors">
                  AI Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/pdf-summarizer')} className="hover:text-cyan-300 transition-colors">
                  PDF & Doc Summarizer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tutorials')} className="hover:text-cyan-300 transition-colors">
                  Programming Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Advisory & Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/booking')} className="hover:text-cyan-300 transition-colors">
                  Book Consultation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-cyan-300 transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/dashboard')} className="hover:text-cyan-300 transition-colors">
                  User Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/settings')} className="hover:text-cyan-300 transition-colors">
                  Account Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center space-x-1">
            <span>© 2026 ZAIN TECH. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 1.3 / Enterprise RLS</span>
            </span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
