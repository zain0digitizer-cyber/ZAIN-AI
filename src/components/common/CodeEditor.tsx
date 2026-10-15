import React, { useState } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  filename?: string;
  height?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onChange,
  readOnly = false,
  filename,
  height = '420px',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extMap: Record<string, string> = {
      python: 'py',
      'c++': 'cpp',
      cpp: 'cpp',
      javascript: 'js',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      java: 'java',
      sql: 'sql',
    };
    const ext = extMap[language.toLowerCase()] || 'txt';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `zain_code_${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const lines = (code || '').split('\n');

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-slate-700/60 bg-[#070b14] shadow-2xl font-mono text-sm">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1629] border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-300">
            {filename || `${language.toLowerCase()}_snippet.${language.toLowerCase() === 'python' ? 'py' : 'txt'}`}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 uppercase">
            {language}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            title="Copy Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            title="Download Source"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div
        className="relative flex overflow-auto bg-[#070b14]"
        style={{ maxHeight: height, minHeight: '160px' }}
      >
        {/* Line Numbers */}
        <div className="select-none py-3 pl-3 pr-2 text-right text-slate-600 bg-[#090e1a] border-r border-slate-800/60 font-mono text-xs leading-relaxed">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area / Content */}
        {readOnly ? (
          <pre className="flex-1 p-3 text-slate-200 overflow-x-auto leading-relaxed text-xs sm:text-sm font-mono whitespace-pre selection:bg-cyan-900/60">
            <code>{code}</code>
          </pre>
        ) : (
          <textarea
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            className="flex-1 p-3 bg-transparent text-slate-200 focus:outline-none resize-none overflow-x-auto leading-relaxed text-xs sm:text-sm font-mono whitespace-pre selection:bg-cyan-900/60"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
};
