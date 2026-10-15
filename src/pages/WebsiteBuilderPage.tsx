import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Code2,
  Eye,
  RefreshCw,
  AlertCircle,
  BookmarkPlus,
  Check,
  FileArchive,
} from 'lucide-react';
import JSZip from 'jszip';
import { useApp } from '../context/AppContext';

export const WebsiteBuilderPage: React.FC = () => {
  const { saveWebsiteItem } = useApp();

  const [prompt, setPrompt] = useState('');
  const [templateType, setTemplateType] = useState('Technology Startup');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'preview' | 'html' | 'css' | 'js'>('preview');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Generated site data
  const [siteTitle, setSiteTitle] = useState('CyberPulse AI - Autonomous Next-Gen Cloud Platform');
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CyberPulse AI - Autonomous Cloud Platform</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  <!-- Navbar -->
  <header class="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <div class="flex items-center space-x-2 font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
      ⚡ CyberPulse AI
    </div>
    <nav class="hidden md:flex space-x-6 text-sm text-slate-300">
      <a href="#features" class="hover:text-cyan-400">Features</a>
      <a href="#architecture" class="hover:text-cyan-400">Architecture</a>
      <a href="#pricing" class="hover:text-cyan-400">Pricing</a>
    </nav>
    <button onclick="alert('Welcome to CyberPulse AI Early Access!')" class="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all">
      Deploy Free Cluster
    </button>
  </header>

  <!-- Hero -->
  <section class="max-w-5xl mx-auto px-6 py-20 text-center">
    <div class="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-4">
      Autonomous Cloud Infrastructure 2026
    </div>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
      Intelligent Microservices with <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400">Zero Configuration</span>
    </h1>
    <p class="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mb-8">
      Empower your engineering squads with autonomous serverless routing, predictive scaling, and integrated AI edge agents.
    </p>
    <div class="flex justify-center gap-4">
      <button onclick="alert('Cluster spinning up...')" class="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25">
        Start Free Trial
      </button>
      <button onclick="alert('Viewing technical docs')" class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold text-sm">
        Explore Whitepaper
      </button>
    </div>
  </section>

  <!-- Feature Grid -->
  <section id="features" class="max-w-5xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div class="text-2xl mb-2">🚀</div>
        <h3 class="font-bold text-white mb-1">Sub-10ms Latency</h3>
        <p class="text-xs text-slate-400 leading-relaxed">Global edge caching and instant cold start acceleration.</p>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div class="text-2xl mb-2">🛡️</div>
        <h3 class="font-bold text-white mb-1">Zero-Trust Isolation</h3>
        <p class="text-xs text-slate-400 leading-relaxed">Cryptographic workload segregation and automatic mTLS.</p>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div class="text-2xl mb-2">🤖</div>
        <h3 class="font-bold text-white mb-1">Self-Healing Pods</h3>
        <p class="text-xs text-slate-400 leading-relaxed">AI observability detects memory leaks and remedies bottlenecks.</p>
      </div>
    </div>
  </section>

  <footer class="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
    © 2026 CyberPulse AI • Generated with ZAIN TECH AI Platform
  </footer>
</body>
</html>`);
  const [cssCode, setCssCode] = useState(`/* Custom styles applied to preview */
body {
  scroll-behavior: smooth;
}`);
  const [jsCode, setJsCode] = useState(`console.log("Generated Website initialized successfully.");`);

  const templates = [
    'Technology Startup',
    'Portfolio Website',
    'SaaS Landing Page',
    'Modern Restaurant',
    'Online Store',
    'Education & Academy',
    'Creative Agency',
  ];

  const handleGenerateWebsite = async () => {
    if (!prompt.trim()) {
      setError('Please provide a prompt describing your website.');
      return;
    }

    setError('');
    setLoading(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/gemini/website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          templateType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate website code.');
      }

      setSiteTitle(data.title || 'Generated Web Project');
      if (data.html) setHtmlCode(data.html);
      if (data.css) setCssCode(data.css);
      if (data.js) setJsCode(data.js);
      setViewMode('preview');
    } catch (err: any) {
      setError(err?.message || 'Error communicating with AI Website Generator.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    zip.file('index.html', htmlCode);
    zip.file('styles.css', cssCode);
    zip.file('script.js', jsCode);
    zip.file(
      'README.md',
      `# ${siteTitle}\nGenerated with ZAIN TECH AI Platform.\nOpen index.html in any browser to launch!`
    );

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zain_website_${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `index_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveToDashboard = () => {
    saveWebsiteItem({
      title: siteTitle,
      prompt,
      templateType,
      html: htmlCode,
      css: cssCode,
      js: jsCode,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const viewportWidthClass = {
    desktop: 'w-full',
    tablet: 'max-w-2xl mx-auto',
    mobile: 'max-w-sm mx-auto',
  }[viewport];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase">
              Feature Nine
            </span>
            <span className="text-xs text-slate-400">Prompt-to-Website with Sandboxed Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            AI Website Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Generate responsive HTML5, CSS, and JS web applications. Inspect in live sandboxed viewports and export to ZIP.
          </p>
        </div>

        {/* Export & Save Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSaveToDashboard}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-bold text-cyan-400 transition-colors"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <BookmarkPlus className="w-4 h-4" />}
            <span>{saveSuccess ? 'Saved to Dashboard' : 'Save Project'}</span>
          </button>
          <button
            onClick={handleDownloadZip}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:opacity-90 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all"
          >
            <FileArchive className="w-4 h-4" />
            <span>Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Prompt Bar & Category selector */}
      <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono mr-2">
            Category Style:
          </span>
          {templates.map((tpl) => (
            <button
              key={tpl}
              onClick={() => setTemplateType(tpl)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                templateType === tpl
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/80 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {tpl}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Describe your desired website (e.g. 'Modern luxury Japanese sushi restaurant with online reservations, dark moody neon aesthetics, and customer reviews')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={handleGenerateWebsite}
            disabled={loading}
            className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-emerald-600 hover:opacity-95 shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Synthesizing Architecture...' : 'Generate Website'}</span>
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Preview & Code Tabs Toolbar */}
      <div className="rounded-3xl border border-slate-800 bg-[#070b16] overflow-hidden flex flex-col min-h-[640px]">
        {/* Toolbar Header */}
        <div className="px-4 py-3 bg-[#0c1326] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* View mode tabs */}
          <div className="flex space-x-1">
            {[
              { id: 'preview', label: 'Live Preview', icon: Eye },
              { id: 'html', label: 'HTML', icon: Code2 },
              { id: 'css', label: 'CSS', icon: Code2 },
              { id: 'js', label: 'JavaScript', icon: Code2 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    viewMode === tab.id
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Viewport switchers (only visible in preview mode) */}
          {viewMode === 'preview' && (
            <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewport === 'desktop' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewport === 'tablet' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewport === 'mobile' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={handleDownloadHtml}
            className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export HTML</span>
          </button>
        </div>

        {/* Viewport Render Area */}
        <div className="flex-1 bg-[#04060c] p-2 flex items-center justify-center overflow-auto min-h-[580px]">
          {viewMode === 'preview' ? (
            <div
              className={`h-[580px] bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 border border-slate-800 ${viewportWidthClass}`}
            >
              <iframe
                title="Sandboxed Website Preview"
                srcDoc={htmlCode}
                sandbox="allow-scripts"
                className="w-full h-full border-none"
              />
            </div>
          ) : viewMode === 'html' ? (
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="w-full h-[580px] p-4 bg-[#070b14] text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          ) : viewMode === 'css' ? (
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              className="w-full h-[580px] p-4 bg-[#070b14] text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          ) : (
            <textarea
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
              className="w-full h-[580px] p-4 bg-[#070b14] text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};
