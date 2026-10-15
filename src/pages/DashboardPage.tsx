import React from 'react';
import {
  Sparkles,
  Code2,
  Image as ImageIcon,
  Mic,
  BookOpen,
  FileText,
  Globe,
  ArrowRight,
  Clock,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const {
    conversations,
    savedCodeList,
    generatedImages,
    savedWebsites,
    completedLessons,
    earnedBadges,
    resumes,
    createConversation,
  } = useApp();

  const handleStartChat = () => {
    createConversation();
    onNavigate('/ai-chat');
  };

  const quickTools = [
    { title: 'AI Chat', path: '/ai-chat', icon: Sparkles, desc: 'Chat with neural assistant', color: 'from-cyan-500 to-blue-600' },
    { title: 'Code Studio', path: '/code-generator', icon: Code2, desc: 'Generate & debug 8 langs', color: 'from-blue-500 to-indigo-600' },
    { title: 'Image Studio', path: '/image-generator', icon: ImageIcon, desc: 'Generate 8K visuals', color: 'from-indigo-500 to-violet-600' },
    { title: 'Voice AI', path: '/voice-assistant', icon: Mic, desc: 'Real-time conversational AI', color: 'from-teal-500 to-cyan-500' },
    { title: 'Website Builder', path: '/website-builder', icon: Globe, desc: 'Prompt to live website', color: 'from-emerald-500 to-cyan-600' },
    { title: 'Resume Builder', path: '/resume-builder', icon: FileText, desc: 'AI ATS resume polisher', color: 'from-violet-500 to-purple-600' },
    { title: 'PDF Summarizer', path: '/pdf-summarizer', icon: FileText, desc: 'Document Q&A engine', color: 'from-amber-500 to-rose-500' },
    { title: 'Learning Center', path: '/tutorials', icon: BookOpen, desc: 'Programming courses & quizzes', color: 'from-sky-500 to-blue-700' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0c1633] via-[#091126] to-[#070b18] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {user?.role === 'admin' ? 'SYSTEM ADMINISTRATOR' : 'PRO MEMBER'}
              </span>
              <span className="text-xs text-slate-400">Personal Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name || 'Explorer'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium">
              "Your Intelligence. Your Creativity. Your Future."
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartChat}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg shadow-cyan-500/25 transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New AI Conversation</span>
            </button>
            <button
              onClick={() => onNavigate('/code-generator')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-300 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center space-x-1.5"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>New Code Task</span>
            </button>
          </div>
        </div>

        {/* Metric summary counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Conversations</div>
            <div className="text-xl font-extrabold text-white mt-1">{conversations.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Saved Code</div>
            <div className="text-xl font-extrabold text-cyan-400 mt-1">{savedCodeList.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">AI Images</div>
            <div className="text-xl font-extrabold text-indigo-400 mt-1">{generatedImages.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Created Sites</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">{savedWebsites.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Lessons Done</div>
            <div className="text-xl font-extrabold text-violet-400 mt-1">{completedLessons.length}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Badges Earned</div>
            <div className="text-xl font-extrabold text-amber-400 mt-1">{earnedBadges.length}</div>
          </div>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Quick AI Launchpad
          </h2>
          <span className="text-xs text-slate-400">8 Integrated Production Tools</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.title}
                onClick={() => onNavigate(tool.path)}
                className="group p-4 rounded-2xl bg-[#0a1022] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0c142b] transition-all text-left flex flex-col justify-between h-32"
              >
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${tool.color} p-[1.5px] group-hover:scale-110 transition-transform`}
                >
                  <div className="w-full h-full bg-[#090f22] rounded-[10px] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tool.title}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{tool.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Recent Conversations & Saved Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Conversations */}
        <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Recent AI Conversations
              </h3>
              <button
                onClick={() => onNavigate('/ai-chat')}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {conversations.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => onNavigate('/ai-chat')}
                  className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="space-y-0.5 max-w-[80%]">
                    <div className="text-xs font-semibold text-slate-200 truncate">{c.title}</div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {c.messages[c.messages.length - 1]?.content || 'Empty chat'}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {c.messages.length} msgs
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartChat}
            className="w-full mt-4 py-2 rounded-xl text-xs font-bold text-cyan-400 bg-cyan-950/60 hover:bg-cyan-950 border border-cyan-800/60 transition-colors"
          >
            + Start Another Discussion
          </button>
        </div>

        {/* Saved Code Snippets */}
        <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Saved Code & Algorithms
              </h3>
              <button
                onClick={() => onNavigate('/code-generator')}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {savedCodeList.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  No saved code snippets yet. Generate code in the AI Code Studio to save them here.
                </div>
              ) : (
                savedCodeList.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigate('/code-generator')}
                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="space-y-0.5 max-w-[80%]">
                      <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">{item.explanation}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                      {item.language}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigate('/code-generator')}
            className="w-full mt-4 py-2 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-950 border border-indigo-800/60 transition-colors"
          >
            Launch Code Generator
          </button>
        </div>
      </div>

      {/* Generated Images Carousel Preview */}
      <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            AI Image Studio Gallery
          </h3>
          <button
            onClick={() => onNavigate('/image-generator')}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Open Studio</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {generatedImages.map((img) => (
            <div
              key={img.id}
              onClick={() => onNavigate('/image-generator')}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 cursor-pointer aspect-video bg-slate-900 transition-all"
            >
              <img
                src={img.imageUrl}
                alt={img.prompt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-xs text-white font-medium line-clamp-1">{img.prompt}</span>
                <span className="text-[10px] text-cyan-400">{img.style} • {img.aspectRatio}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
