import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Upload,
  BookOpen,
  ListOrdered,
  HelpCircle,
  Trash2,
  Download,
  AlertCircle,
  Copy,
  Check,
  Send,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PdfSummarizerPage: React.FC = () => {
  const { savedDocuments, saveDocumentSummary, deleteDocumentSummary } = useApp();

  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [mode, setMode] = useState<'short' | 'detailed' | 'keypoints' | 'notes' | 'qa'>('short');
  const [qaQuestion, setQaQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const sampleDocument = `Enterprise Cloud Architecture & Distributed AI Systems 2026
Author: Zain Engineering Research Division

1. Executive Summary
Modern enterprise web applications are shifting toward hybrid edge-cloud topologies. By collocating generative AI inference pipelines with low-latency streaming proxies, teams achieve sub-50ms token time-to-first-byte (TTFB).

2. Memory Safety & Concurrency
Systems implemented in C++20 and modern Rust provide zero-cost abstractions and deterministic destructors (RAII). Concurrently, asynchronous runtimes in Python (asyncio) and Node.js handle high-throughput network orchestration without thread starvation.

3. Security & Zero-Trust Verification
Client-side direct API key communication is explicitly deprecated across tier-one architectures. All third-party neural model requests must flow through authenticated server-side endpoints with Row Level Security (RLS) enforcement at the PostgreSQL database layer.

4. Performance Benchmarks
- TTFB Streaming: 24ms average
- Document vectorization throughput: 4,500 words/second
- Memory footprint reduction: 38% vs legacy container architectures`;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputText(text || '');
    };
    reader.readAsText(file);
  };

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setError('Please provide document text or upload a document to analyze.');
      return;
    }

    if (mode === 'qa' && !qaQuestion.trim()) {
      setError('Please enter a question to ask about the document.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/pdf-summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          mode,
          question: qaQuestion,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to process document.');
      }

      const summaryText = data.summary || 'Summary generated.';
      setResult(summaryText);

      // Save document to history
      saveDocumentSummary({
        fileName: fileName || 'Uploaded Document',
        fileSize: fileSize || `${(inputText.length / 1024).toFixed(1)} KB`,
        content: inputText.slice(0, 500) + '...',
        summary: summaryText,
        keyPoints: [
          'Enterprise hybrid edge-cloud topology',
          'Sub-50ms TTFB streaming response',
          'Server-side zero-trust security',
        ],
      });
    } catch (err: any) {
      setError(err?.message || 'Error analyzing document.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800 uppercase">
              Feature Eight
            </span>
            <span className="text-xs text-slate-400">Deep Document Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            AI PDF & Document Summarizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Upload documents, extract executive summaries, generate Cornell study notes, and ask specific questions.
          </p>
        </div>
      </div>

      {/* Main Grid: Upload & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-5">
            {/* File Upload Box */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Upload Document (.txt, .md, .pdf text)
              </label>
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700/80 hover:border-cyan-500/60 rounded-2xl cursor-pointer bg-slate-900/60 hover:bg-slate-900 transition-all text-center">
                <Upload className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-xs font-semibold text-slate-200">
                  {fileName ? fileName : 'Click to select or drop document here'}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  {fileSize ? `Size: ${fileSize}` : 'Supports plain text, markdown, or pasted notes'}
                </span>
                <input
                  type="file"
                  accept=".txt,.md,.pdf,.csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Document Text Area with sample loader */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Or Paste Document Text Directly
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setInputText(sampleDocument);
                    setFileName('enterprise_cloud_ai_2026.md');
                    setFileSize('2.4 KB');
                  }}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Load Sample Document
                </button>
              </div>
              <textarea
                rows={7}
                placeholder="Paste contract, research paper, lecture notes, or technical specification..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#060a14] border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
              />
            </div>

            {/* Analysis Mode Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Intelligence Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'short', label: 'Executive Summary', icon: Sparkles },
                  { id: 'detailed', label: 'In-Depth Analysis', icon: BookOpen },
                  { id: 'keypoints', label: 'Key Action Points', icon: ListOrdered },
                  { id: 'notes', label: 'Cornell Study Notes', icon: FileCheck },
                  { id: 'qa', label: 'Ask Document QA', icon: HelpCircle },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMode(item.id as any)}
                      className={`flex items-center space-x-1.5 p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                        isSelected
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-500/80 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QA Question input if QA mode */}
            {mode === 'qa' && (
              <div className="animate-in fade-in duration-200">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specific Question About This Document
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. What is the average TTFB streaming latency stated in the document?"
                    value={qaQuestion}
                    onChange={(e) => setQaQuestion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-amber-500 via-rose-600 to-indigo-600 hover:opacity-90 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Synthesizing Document Insights...' : 'Analyze Document with ZAIN AI'}</span>
            </button>
          </div>
        </div>

        {/* Right: Output & History (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
                <FileText className="w-4 h-4" />
                AI Document Synthesis
              </h3>
              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <div className="flex-1">
              {!result && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                    <FileText className="w-8 h-8 text-amber-400/60" />
                  </div>
                  <div className="font-semibold text-slate-300 text-sm">No Document Analyzed Yet</div>
                  <p className="text-xs max-w-sm">
                    Upload a file or paste text on the left to extract summaries, study notes, or query answers.
                  </p>
                </div>
              )}

              {loading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-amber-400 space-y-3">
                  <Sparkles className="w-8 h-8 animate-spin" />
                  <div className="text-sm font-semibold text-white">Reading & Synthesizing Text...</div>
                  <p className="text-xs text-slate-400">
                    Structuring bullet points, extracting findings, and calculating conceptual clarity.
                  </p>
                </div>
              )}

              {result && !loading && (
                <div className="p-4 rounded-2xl bg-[#060a14] border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed max-h-[520px] overflow-y-auto whitespace-pre-wrap">
                  {result}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* History of analyzed documents */}
      {savedDocuments.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">
            Analyzed Document History ({savedDocuments.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedDocuments.map((doc) => (
              <div key={doc.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">{doc.fileName}</span>
                  </div>
                  <button
                    onClick={() => deleteDocumentSummary(doc.id)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{doc.summary}</p>
                <div className="text-[10px] text-slate-500 font-mono">Size: {doc.fileSize}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
