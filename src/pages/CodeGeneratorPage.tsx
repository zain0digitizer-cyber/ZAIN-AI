import React, { useState } from 'react';
import {
  Code2,
  Sparkles,
  Bug,
  HelpCircle,
  RefreshCw,
  Repeat,
  Copy,
  Download,
  BookmarkPlus,
  Check,
  AlertCircle,
  FileCode,
} from 'lucide-react';
import { CodeEditor } from '../components/common/CodeEditor';
import { useApp } from '../context/AppContext';

export const CodeGeneratorPage: React.FC = () => {
  const { saveCodeItem } = useApp();

  const [action, setAction] = useState<'generate' | 'explain' | 'debug' | 'refactor' | 'convert'>('generate');
  const [language, setLanguage] = useState('Python');
  const [targetLanguage, setTargetLanguage] = useState('C++');
  const [prompt, setPrompt] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Result state
  const [activeTab, setActiveTab] = useState<'code' | 'explanation' | 'improvements'>('code');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [improvements, setImprovements] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const languages = ['Python', 'C++', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'SQL'];

  const handleExecute = async () => {
    if (!prompt.trim() && !inputCode.trim()) {
      setError('Please provide a prompt instruction or code to process.');
      return;
    }

    setError('');
    setLoading(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/gemini/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          language,
          targetLanguage,
          prompt,
          code: inputCode,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to process code request.');
      }

      const rawResult = data.result || '';

      // Parse code block and text sections if present
      let extractedCode = rawResult;
      let extractedExplanation = 'Code generated successfully with production standards.';
      let extractedImprovements = 'Consider adding comprehensive unit test suites and CI linting.';

      const codeMatch = rawResult.match(/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/);
      if (codeMatch) {
        extractedCode = codeMatch[1].trim();
        const parts = rawResult.split(/```[\s\S]*?```/);
        const commentary = parts.join('\n\n').trim();
        if (commentary) {
          extractedExplanation = commentary;
        }
      } else {
        extractedCode = rawResult;
      }

      if (action === 'explain') {
        extractedExplanation = rawResult;
      }

      setGeneratedCode(extractedCode);
      setExplanation(extractedExplanation);
      setImprovements(extractedImprovements);
      setActiveTab('code');
    } catch (err: any) {
      setError(err?.message || 'Error communicating with AI Code Assistant.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDashboard = () => {
    if (!generatedCode) return;
    saveCodeItem({
      title: `${language} ${action.toUpperCase()}: ${prompt.slice(0, 30) || 'Task'}`,
      language: action === 'convert' ? targetLanguage : language,
      code: generatedCode,
      explanation,
      improvements,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800 uppercase">
              Feature Two
            </span>
            <span className="text-xs text-slate-400">8 Supported Languages</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">AI Code Studio</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Generate, explain, debug, optimize, and convert code with deep architectural reasoning.
          </p>
        </div>

        {/* Action Type Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { id: 'generate', label: 'Generate', icon: Sparkles },
            { id: 'explain', label: 'Explain', icon: HelpCircle },
            { id: 'debug', label: 'Debug & Fix', icon: Bug },
            { id: 'refactor', label: 'Refactor', icon: RefreshCw },
            { id: 'convert', label: 'Convert', icon: Repeat },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = action === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setAction(item.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Settings & Prompt (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              Task Configuration
            </h3>

            {/* Language Select */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {action === 'convert' ? 'Source Language' : 'Primary Language'}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {action === 'convert' ? (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Language</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    {languages.filter((l) => l !== language).map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Engine</label>
                  <div className="py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-cyan-400 font-mono">
                    Gemini 3.8 Flash
                  </div>
                </div>
              )}
            </div>

            {/* Prompt description */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {action === 'generate'
                  ? 'Describe what you want to build'
                  : action === 'debug'
                  ? 'Describe the issue or bug'
                  : 'Instructions & requirements'}
              </label>
              <textarea
                rows={3}
                placeholder={
                  action === 'generate'
                    ? 'e.g. Write a thread-safe LRU Cache in C++ with O(1) get and put operations...'
                    : 'e.g. This code throws a segmentation fault on empty input vector...'
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Input Code (For Explain, Debug, Refactor, Convert) */}
            {action !== 'generate' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Existing {language} Code
                </label>
                <textarea
                  rows={8}
                  placeholder={`// Paste your ${language} code here...`}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#060a14] font-mono border border-slate-700/80 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  spellCheck={false}
                />
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleExecute}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Synthesizing Solution...' : `Run ${action.toUpperCase()}`}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Monaco Code Output & Tabs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 flex flex-col h-full min-h-[540px]">
            {/* Output Tabs & Save Button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex space-x-1">
                {(['code', 'explanation', 'improvements'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab === 'improvements' ? 'Suggested Improvements' : tab}
                  </button>
                ))}
              </div>

              {generatedCode && (
                <button
                  onClick={handleSaveToDashboard}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Saved to Dashboard!</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-3.5 h-3.5" />
                      <span>Save Project</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Content area */}
            <div className="flex-1">
              {!generatedCode && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <Code2 className="w-8 h-8 text-cyan-400/60" />
                  </div>
                  <div className="font-semibold text-slate-300 text-sm">Editor Ready</div>
                  <p className="text-xs max-w-sm">
                    Select your language and prompt instructions on the left to generate clean, production-grade code.
                  </p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-cyan-400 space-y-4">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                  <div className="text-sm font-semibold text-white">Analyzing AST & Generating Code...</div>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Synthesizing idiomatic {action === 'convert' ? targetLanguage : language} with performance optimizations.
                  </p>
                </div>
              )}

              {generatedCode && !loading && (
                <>
                  {activeTab === 'code' && (
                    <CodeEditor
                      code={generatedCode}
                      language={action === 'convert' ? targetLanguage : language}
                      readOnly={false}
                      onChange={(newVal) => setGeneratedCode(newVal)}
                      height="460px"
                    />
                  )}

                  {activeTab === 'explanation' && (
                    <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[460px] whitespace-pre-wrap">
                      <h4 className="text-sm font-bold text-cyan-400 mb-2">Technical Analysis</h4>
                      {explanation}
                    </div>
                  )}

                  {activeTab === 'improvements' && (
                    <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[460px] whitespace-pre-wrap">
                      <h4 className="text-sm font-bold text-amber-400 mb-2">Recommended Enhancements</h4>
                      {improvements}
                      <div className="mt-4 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
                        💡 <strong>Security Note:</strong> Always run untrusted code in an isolated Docker container or WebAssembly sandbox before running in production.
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
