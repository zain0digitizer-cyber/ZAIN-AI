import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Check,
  Printer,
  Eye,
  RefreshCw,
  Award,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResumeData } from '../types';

export const ResumeBuilderPage: React.FC = () => {
  const { activeResume, updateResume, saveResumeAsNew } = useApp();

  const [enhancing, setEnhancing] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<'modern' | 'minimal' | 'executive' | 'creative'>('modern');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEnhanceSummary = async () => {
    if (!activeResume.summary.trim()) return;
    setEnhancing('summary');

    try {
      const res = await fetch('/api/gemini/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: activeResume.title || 'Senior Software Engineer',
          section: 'summary',
          content: activeResume.summary,
        }),
      });

      const data = await res.json();
      if (data.enhanced) {
        updateResume({ summary: data.enhanced.trim() });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(null);
    }
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp_${Date.now()}`,
      role: 'Software Engineer',
      company: 'Tech Enterprise',
      period: '2022 - Present',
      description: 'Spearheaded cloud migration and automated high-throughput microservices.',
    };
    updateResume({ experience: [...activeResume.experience, newExp] });
  };

  const handleRemoveExperience = (id: string) => {
    updateResume({
      experience: activeResume.experience.filter((e) => e.id !== id),
    });
  };

  const handleAddEducation = () => {
    const newEdu = {
      id: `edu_${Date.now()}`,
      degree: 'B.S. in Computer Science',
      institution: 'University of Technology',
      year: '2018 - 2022',
    };
    updateResume({ education: [...activeResume.education, newEdu] });
  };

  const handleRemoveEducation = (id: string) => {
    updateResume({
      education: activeResume.education.filter((e) => e.id !== id),
    });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleSave = () => {
    saveResumeAsNew({ template: activeTemplate });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-violet-950 text-violet-400 border border-violet-800 uppercase">
              Feature Seven
            </span>
            <span className="text-xs text-slate-400">ATS Optimized AI Career Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">AI Resume Builder</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Design executive resumes, enhance achievement bullets with Gemini AI, and export to PDF.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-xs font-bold text-cyan-400 transition-all"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
            <span>{saveSuccess ? 'Saved to Profile' : 'Save Resume'}</span>
          </button>
          <button
            onClick={handlePrintPdf}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF Export</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Inputs (5 cols) & Live Preview (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* Template Selector */}
          <div className="p-4 rounded-2xl bg-[#090f20] border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              Select Resume Template
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['modern', 'minimal', 'executive', 'creative'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setActiveTemplate(t);
                    updateResume({ template: t });
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    activeTemplate === t
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Contact Details */}
          <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              1. Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={activeResume.fullName}
                  onChange={(e) => updateResume({ fullName: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Professional Title</label>
                <input
                  type="text"
                  value={activeResume.title}
                  onChange={(e) => updateResume({ title: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={activeResume.email}
                  onChange={(e) => updateResume({ email: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Phone</label>
                <input
                  type="text"
                  value={activeResume.phone}
                  onChange={(e) => updateResume({ phone: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Location</label>
                <input
                  type="text"
                  value={activeResume.location}
                  onChange={(e) => updateResume({ location: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Website / Portfolio</label>
                <input
                  type="text"
                  value={activeResume.website}
                  onChange={(e) => updateResume({ website: e.target.value })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary with AI Polishing */}
          <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                2. Professional Summary
              </h3>
              <button
                type="button"
                onClick={handleEnhanceSummary}
                disabled={enhancing === 'summary'}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-bold hover:bg-cyan-900 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{enhancing === 'summary' ? 'Enhancing with AI...' : 'AI Enhance Summary'}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={activeResume.summary}
              onChange={(e) => updateResume({ summary: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
            />
          </div>

          {/* Experience Section */}
          <div className="p-5 rounded-3xl bg-[#090f20] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                3. Work Experience
              </h3>
              <button
                type="button"
                onClick={handleAddExperience}
                className="flex items-center space-x-1 text-xs text-cyan-400 font-bold hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            <div className="space-y-3">
              {activeResume.experience.map((exp, index) => (
                <div key={exp.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Position #{index + 1}</span>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = activeResume.experience.map((item) =>
                          item.id === exp.id ? { ...item, role: e.target.value } : item
                        );
                        updateResume({ experience: updated });
                      }}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = activeResume.experience.map((item) =>
                          item.id === exp.id ? { ...item, company: e.target.value } : item
                        );
                        updateResume({ experience: updated });
                      }}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Period (e.g. 2021 - Present)"
                    value={exp.period}
                    onChange={(e) => {
                      const updated = activeResume.experience.map((item) =>
                        item.id === exp.id ? { ...item, period: e.target.value } : item
                      );
                      updateResume({ experience: updated });
                    }}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                  <textarea
                    rows={2}
                    placeholder="Key impact and achievements..."
                    value={exp.description}
                    onChange={(e) => {
                      const updated = activeResume.experience.map((item) =>
                        item.id === exp.id ? { ...item, description: e.target.value } : item
                      );
                      updateResume({ experience: updated });
                    }}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Resume Sheet Preview (Printable) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              Live Interactive Preview ({activeTemplate.toUpperCase()})
            </span>
            <span className="text-xs text-slate-500 font-mono">Ready for A4 Print</span>
          </div>

          <div
            id="printable-resume"
            className="p-8 sm:p-10 rounded-2xl bg-white text-slate-900 shadow-2xl min-h-[720px] transition-all font-sans text-xs leading-relaxed"
          >
            {/* Template Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-4">
              <h2 className="text-2xl font-extrabold tracking-tight uppercase text-slate-950">
                {activeResume.fullName || 'YOUR NAME'}
              </h2>
              <div className="text-sm font-semibold text-cyan-700 tracking-wide mt-0.5">
                {activeResume.title || 'Professional Title'}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600 mt-2">
                <span>{activeResume.email}</span>
                <span>•</span>
                <span>{activeResume.phone}</span>
                <span>•</span>
                <span>{activeResume.location}</span>
                {activeResume.website && (
                  <>
                    <span>•</span>
                    <span>{activeResume.website}</span>
                  </>
                )}
              </div>
            </div>

            {/* Summary */}
            {activeResume.summary && (
              <div className="mb-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-1.5">
                  Professional Summary
                </h4>
                <p className="text-slate-700 leading-relaxed text-[11.5px]">{activeResume.summary}</p>
              </div>
            )}

            {/* Experience */}
            {activeResume.experience.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2">
                  Experience
                </h4>
                <div className="space-y-3">
                  {activeResume.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                        <span>{exp.role} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                        <span className="text-[10px] text-slate-500 font-normal">{exp.period}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {activeResume.education.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2">
                  Education
                </h4>
                <div className="space-y-2">
                  {activeResume.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline text-xs">
                      <span className="font-semibold text-slate-900">
                        {edu.degree} — <span className="text-slate-600">{edu.institution}</span>
                      </span>
                      <span className="text-[10px] text-slate-500">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {activeResume.skills.length > 0 && (
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2">
                  Core Competencies & Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeResume.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10.5px] font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
