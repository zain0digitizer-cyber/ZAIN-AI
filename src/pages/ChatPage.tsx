import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  RotateCcw,
  Bot,
  User as UserIcon,
  Search,
  MessageSquare,
  AlertCircle,
  FileCode,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatPage: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    addMessageToConversation,
    deleteConversation,
    renameConversation,
  } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [newTitleText, setNewTitleText] = useState('');
  const [chatSearch, setChatSearch] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading || !activeConv) return;

    setError('');
    const prompt = textToSend.trim();
    setInput('');

    // Add user message to state
    addMessageToConversation(activeConv.id, 'user', prompt);
    setLoading(true);

    try {
      const historyPayload = [
        ...activeConv.messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: prompt },
      ];

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          systemPrompt:
            'You are ZAIN AI, an intelligent, helpful, and highly skilled AI assistant built by ZAIN TECH. You provide clear, well-structured, modern markdown answers with syntax-highlighted code blocks where appropriate. Tagline: "Your Intelligence. Your Creativity. Your Future."',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response.');
      }

      addMessageToConversation(activeConv.id, 'assistant', data.reply);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err?.message || 'Error communicating with ZAIN AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!activeConv || activeConv.messages.length === 0 || loading) return;
    const lastUserMsg = [...activeConv.messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      await handleSend(lastUserMsg.content);
    }
  };

  const handleCopyMessage = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleStartRename = (id: string, currentTitle: string) => {
    setEditingTitleId(id);
    setNewTitleText(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    if (newTitleText.trim()) {
      renameConversation(id, newTitleText.trim());
    }
    setEditingTitleId(null);
  };

  const suggestions = [
    'Explain how C++ smart pointers prevent memory leaks with examples',
    'Design a scalable multi-tenant database schema in PostgreSQL',
    'Write an asynchronous Python queue worker using asyncio',
    'How do I optimize React 19 rendering and prevent unnecessary re-renders?',
  ];

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(chatSearch.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#050811] overflow-hidden">
      {/* Chat History Sidebar */}
      <div className="w-64 sm:w-72 bg-[#070b16] border-r border-slate-800/80 flex flex-col justify-between hidden md:flex">
        {/* Top actions */}
        <div className="p-3 space-y-3">
          <button
            onClick={() => createConversation()}
            className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Conversation</span>
          </button>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search chats..."
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredConversations.map((c) => {
            const isActive = c.id === activeConversationId;
            return (
              <div
                key={c.id}
                onClick={() => setActiveConversationId(c.id)}
                className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                  isActive
                    ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center space-x-2 max-w-[75%] truncate">
                  <MessageSquare className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  {editingTitleId === c.id ? (
                    <input
                      type="text"
                      value={newTitleText}
                      onChange={(e) => setNewTitleText(e.target.value)}
                      onBlur={() => handleSaveRename(c.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(c.id)}
                      autoFocus
                      className="bg-slate-900 text-white px-1.5 py-0.5 rounded text-xs focus:outline-none border border-cyan-400"
                    />
                  ) : (
                    <span className="truncate font-medium">{c.title}</span>
                  )}
                </div>

                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartRename(c.id, c.title);
                    }}
                    className="p-1 hover:text-cyan-400"
                    title="Rename"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  {conversations.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(c.id);
                      }}
                      className="p-1 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar model info */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Engine: Gemini 3.8 Flash</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#050811]">
        {/* Top Active Chat Header */}
        <div className="h-14 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between bg-[#080d1c]/60 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                {activeConv?.title || 'ZAIN AI Conversation'}
              </h2>
              <div className="text-[10px] text-cyan-400 font-mono">
                Model: Gemini 3.8 Flash • Real-time Neural Engine
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => createConversation()}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white md:hidden"
            >
              + New
            </button>
            <button
              onClick={handleRegenerate}
              disabled={loading || !activeConv?.messages.length}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 disabled:opacity-40 transition-colors"
              title="Regenerate last response"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {(!activeConv?.messages || activeConv.messages.length === 0) ? (
            <div className="py-12 max-w-xl mx-auto text-center space-y-6">
              <div className="inline-flex p-4 rounded-2xl bg-cyan-950/60 border border-cyan-800 text-cyan-400 shadow-xl shadow-cyan-950/40">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">How can ZAIN AI assist you?</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Ask questions, debug algorithms, brainstorm cloud architectures, or generate content.
                </p>
              </div>

              {/* Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-4">
                {suggestions.map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(sugg)}
                    className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition-all"
                  >
                    "{sugg}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            activeConv.messages.map((msg, index) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 max-w-3xl ${
                    isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse space-x-reverse'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isAssistant
                        ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`relative p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-[#0b1326] border border-slate-800 text-slate-200'
                        : 'bg-gradient-to-r from-cyan-950/90 to-indigo-950/90 border border-cyan-500/40 text-white'
                    }`}
                  >
                    {/* Message content */}
                    <div className="prose prose-invert max-w-none whitespace-pre-wrap">
                      {msg.content}
                    </div>

                    {/* Copy action for assistant response */}
                    {isAssistant && (
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleCopyMessage(msg.content, index)}
                          className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Response</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center space-x-3 mr-auto max-w-3xl">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center shadow-md animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-[#0b1326] border border-cyan-500/30 text-xs text-cyan-300 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>ZAIN AI is synthesizing response...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 max-w-lg mx-auto">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-slate-800/80 bg-[#070b16]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="max-w-4xl mx-auto relative flex items-center"
          >
            <input
              type="text"
              placeholder="Ask ZAIN AI anything (e.g. code generation, math, architecture, analysis)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[#0a1022] border border-slate-700/80 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2.5 p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:opacity-90 disabled:opacity-40 transition-all shadow-md shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-500 text-center mt-2">
            ZAIN AI utilizes server-side neural inference. Check important code before production deployment.
          </div>
        </div>
      </div>
    </div>
  );
};
