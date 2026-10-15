import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Image as ImageIcon,
  Mic,
  BookOpen,
  Globe,
  FileText,
  Shield,
  Cpu,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Terminal,
  Play,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedLangTab, setSelectedLangTab] = useState<'cpp' | 'python' | 'js' | 'sql'>('python');

  const tools = [
    {
      title: 'AI Chatbot',
      desc: 'Context-aware neural conversations with streaming markdown, syntax highlighting, and deep reasoning.',
      path: '/ai-chat',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Gemini 3.8 Flash',
    },
    {
      title: 'AI Code Generator',
      desc: 'Generate, debug, explain, and refactor production code in C++, Python, JavaScript, Java, and SQL.',
      path: '/code-generator',
      icon: Code2,
      color: 'from-blue-500 to-indigo-600',
      badge: '8 Languages',
    },
    {
      title: 'AI Image Studio',
      desc: 'Create 8K photorealistic concepts, 3D renders, anime styles, and logo artwork from text prompts.',
      path: '/image-generator',
      icon: ImageIcon,
      color: 'from-indigo-500 to-violet-600',
      badge: 'Ultra HD',
    },
    {
      title: 'Voice AI (ZAIN AI)',
      desc: 'Hands-free voice recognition with real-time animated waveform synthesis and audio conversation.',
      path: '/voice-assistant',
      icon: Mic,
      color: 'from-cyan-400 to-teal-500',
      badge: 'Interactive Waveform',
    },
    {
      title: 'AI Website Generator',
      desc: 'Turn ideas into complete responsive web pages with live sandboxed previews and ZIP export.',
      path: '/website-builder',
      icon: Globe,
      color: 'from-emerald-500 to-cyan-600',
      badge: 'Sandboxed Preview',
    },
    {
      title: 'AI Resume Builder',
      desc: 'ATS-optimized executive resumes with AI bullet enhancement and instant print-to-PDF formatting.',
      path: '/resume-builder',
      icon: FileText,
      color: 'from-violet-500 to-purple-600',
      badge: 'ATS Scoring',
    },
    {
      title: 'PDF & Doc Summarizer',
      desc: 'Extract key points, study notes, and ask questions to uploaded documents with page citations.',
      path: '/pdf-summarizer',
      icon: FileText,
      color: 'from-amber-500 to-rose-500',
      badge: 'Doc QA',
    },
    {
      title: 'Programming Learning Hub',
      desc: 'Master C++, Python, Web Dev, and SQL with structured lessons, interactive quizzes, and badges.',
      path: '/tutorials',
      icon: BookOpen,
      color: 'from-sky-500 to-blue-700',
      badge: 'Certifications',
    },
  ];

  const codeSnippets: Record<string, string> = {
    python: `# Python AI Data Pipeline\nimport asyncio\nfrom google import genai\n\nasync def analyze_stream(prompt: str):\n    ai = genai.Client()\n    response = await ai.models.generate_content_stream(\n        model="gemini-3.8-flash",\n        contents=prompt\n    )\n    async for chunk in response:\n        yield chunk.text`,
    cpp: `// Modern C++20 Memory Safety & Concurrency\n#include <iostream>\n#include <memory>\n#include <future>\n\nauto compute_neural_weights() -> std::future<double> {\n    return std::async(std::launch::async, []() {\n        return 0.9984; // High confidence inference\n    });\n}`,
    js: `// Modern React 19 Server Action & Reactive State\nexport async function generateArchitecture(brief: string) {\n  'use server';\n  const res = await fetch('/api/gemini/website', {\n    method: 'POST',\n    body: JSON.stringify({ prompt: brief }),\n  });\n  return await res.json();\n}`,
    sql: `-- High-Speed Analytics with PostgreSQL Window Functions\nSELECT \n  user_id,\n  COUNT(*) OVER(PARTITION BY user_id) as total_prompts,\n  AVG(latency_ms) OVER() as global_avg_latency\nFROM ai_usage_events\nWHERE timestamp >= NOW() - INTERVAL '24 hours';`,
  };

  const faqs = [
    {
      q: 'What is ZAIN TECH and what makes it unique?',
      a: 'ZAIN TECH is a unified AI ecosystem combining conversational intelligence, multi-language code generation, 8K image rendering, interactive voice interaction, an educational programming academy, and a sandboxed website generator under a single, seamless platform.',
    },
    {
      q: 'How are AI operations secured and processed?',
      a: 'All model interactions are processed server-side through secure proxy pipelines using the latest Google GenAI SDK with zero browser API key exposure, strict rate limiting, and input validation.',
    },
    {
      q: 'Can I export the websites and code generated in ZAIN TECH?',
      a: 'Yes! The AI Website Generator allows you to preview projects live in sandboxed desktop, tablet, and mobile frames, and download full source code as a ZIP archive or standalone HTML. The Code Generator allows instant copy and source file download for C++, Python, JavaScript, and more.',
    },
    {
      q: 'How does the Programming Learning Center work?',
      a: 'The Learning Center features step-by-step curricula for C++, Python, HTML/CSS, JavaScript, SQL, and Java with clear architectural explanations, practical code examples, and interactive quizzes that test your comprehension and save your progress.',
    },
    {
      q: 'Can I book a consultation with the ZAIN TECH engineering team?',
      a: 'Yes! Visit our Consultation Booking section to schedule dedicated architecture reviews, custom AI workflow integrations, or enterprise SaaS engineering advisory.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#05070e] text-slate-100">
      {/* SECTION 1: HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-cyber-grid">
        {/* Glowing Orbs Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute -top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-8 shadow-lg shadow-cyan-950/40">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Next-Generation Neural AI Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-400 font-normal">v3.8 Flash Online</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            WELCOME TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 text-glow-cyan">
              ZAIN TECH
            </span>
          </h1>

          {/* Subheading */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200 mb-4 tracking-tight">
            One Platform. Unlimited AI Possibilities.
          </h2>

          {/* Tagline & Description */}
          <p className="text-base sm:text-lg text-cyan-400 font-semibold mb-4 italic">
            "Your Intelligence. Your Creativity. Your Future."
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mb-10 leading-relaxed">
            Chat with AI, generate code, create stunning images, build websites, learn programming, and unlock the future of technology.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => onNavigate('/signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore AI Tools</span>
            </button>
          </div>

          {/* Hero Interactive Terminal Preview */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-cyan-500/30 bg-[#070b16]/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/50 overflow-hidden text-left">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0c1326] border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">zain-core-agent ~ v3.8</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
                <span>Latency: 28ms</span>
              </div>
            </div>

            <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-3 bg-[#070b16]">
              <div className="text-cyan-400 font-semibold flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>$ zain-ai generate --intent="Build Next-Gen Web Application" --lang=TypeScript</span>
              </div>
              <div className="text-slate-400 pl-6 border-l-2 border-cyan-500/40 space-y-1">
                <p className="text-emerald-300">✔ Initialized ZAIN Neural Agent</p>
                <p>✔ Synthesized C++, Python & React Microservices</p>
                <p>✔ Sandboxed website live preview operational</p>
                <p className="text-cyan-300 font-bold">🚀 Output: High-Performance Production Ready System</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AI TOOLS SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
            INTELLIGENT SUITE
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built for Engineers, Creators & Learners
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Everything you need to ideate, write code, create graphics, generate web apps, and advance your engineering career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.title}
                onClick={() => onNavigate(t.path)}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#0c1428]/80 to-[#080d1c]/90 border border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-950/40 backdrop-blur-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${t.color} p-[1.5px] shadow-lg group-hover:scale-105 transition-transform`}
                    >
                      <div className="w-full h-full bg-[#080e22] rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {t.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {t.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {t.desc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="py-20 px-4 sm:px-6 bg-[#070b16] border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
              SEAMLESS WORKFLOW
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              How ZAIN TECH Operates
            </h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto mt-2">
              From natural language idea to deployed production artifact in four intuitive stages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Your Tool', desc: 'Select from AI Chat, Code Assistant, Image Studio, Voice AI, or Website Generator.' },
              { step: '02', title: 'Prompt with Context', desc: 'Describe what you need in plain English. Add code snippets or upload PDF files.' },
              { step: '03', title: 'Neural Generation', desc: 'Server-side Gemini models analyze, reason, and generate production outputs with zero browser latency.' },
              { step: '04', title: 'Preview & Export', desc: 'Inspect live sandboxed previews, test quizzes, copy code, or download ZIP archives.' },
            ].map((s) => (
              <div key={s.step} className="p-6 rounded-2xl bg-[#0b1224] border border-slate-800 relative">
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 font-mono mb-3">
                  {s.step}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROGRAMMING LEARNING CENTER PREVIEW */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-semibold text-cyan-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ZAIN TECH Academy</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Master Modern Programming with Interactive Quizzes
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Step-by-step curricula covering systems languages (C++), cloud & AI essentials (Python), modern web technologies (HTML, CSS, JavaScript), enterprise backends (Java), and relational data architecture (SQL).
            </p>

            <div className="space-y-3">
              {[
                'Real beginner to advanced learning tracks',
                'Practical code examples ready for inspection',
                'Interactive multiple-choice quizzes with instant grading',
                'Personal progress tracking and achievement badges',
              ].map((feat) => (
                <div key={feat} className="flex items-center space-x-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('/tutorials')}
              className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all flex items-center space-x-2"
            >
              <span>Explore All Tutorials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Code Preview Box */}
          <div className="lg:w-1/2 w-full">
            <div className="rounded-2xl border border-slate-700/80 bg-[#070b16] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d152c] border-b border-slate-800">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                {/* Tabs */}
                <div className="flex space-x-1">
                  {(['python', 'cpp', 'js', 'sql'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLangTab(lang)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                        selectedLangTab === lang
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#070b16] font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto min-h-[220px]">
                <pre>
                  <code>{codeSnippets[selectedLangTab]}</code>
                </pre>
              </div>

              <div className="p-3 bg-[#0a1020] border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                  <Play className="w-3.5 h-3.5 fill-cyan-400" />
                  Interactive Lesson Snippet
                </span>
                <button
                  onClick={() => onNavigate('/tutorials')}
                  className="text-xs text-cyan-300 hover:underline"
                >
                  Take Quiz & Earn Badge →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE ZAIN TECH */}
      <section className="py-20 px-4 sm:px-6 bg-[#070b16] border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
              ARCHITECTURAL ADVANTAGE
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Choose ZAIN TECH
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#0b1224] border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800 flex items-center justify-center text-cyan-400 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Zero-Leak Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Server-side authenticated proxying ensures client keys never touch the browser. Role-based access control protects sensitive records.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b1224] border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800 flex items-center justify-center text-indigo-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">State-of-the-Art Models</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrated with Gemini 3.8 Flash, Gemini Code Assist, and high-fidelity vision models for sub-second responses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b1224] border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-800 flex items-center justify-center text-violet-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Creator Independence</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download your generated websites in a single ZIP, copy source code in 8 languages, and export ATS-ready resumes to PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-14">
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono mb-2">
            QUESTIONS & ANSWERS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#0a1020] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm sm:text-base text-slate-200 hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0 ml-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-cyan-950/60 via-indigo-950/80 to-[#0b1224] border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Unlock the Future of AI?
          </h3>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join thousands of developers, researchers, and creators using ZAIN TECH to amplify their intelligence and output.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-90 shadow-xl shadow-cyan-500/30 transition-all"
            >
              Get Started Free Now
            </button>
            <button
              onClick={() => onNavigate('/booking')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-all"
            >
              Book an Advisory Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
