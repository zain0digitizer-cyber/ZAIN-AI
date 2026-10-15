import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Award,
  Sparkles,
  HelpCircle,
  Play,
  Copy,
  Check,
  ChevronRight,
  Filter,
  Bot,
  Send,
} from 'lucide-react';
import { TUTORIAL_COURSES } from '../data/tutorials';
import { Lesson, TutorialCourse } from '../types';
import { useApp } from '../context/AppContext';

export const TutorialsPage: React.FC = () => {
  const {
    completedLessons,
    markLessonComplete,
    quizScores,
    recordQuizScore,
    earnedBadges,
  } = useApp();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(TUTORIAL_COURSES[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    TUTORIAL_COURSES[0].lessons[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  // Quiz state for the active lesson
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // AI Tutor Ask panel state
  const [tutorQuestion, setTutorQuestion] = useState('');
  const [tutorResponse, setTutorResponse] = useState('');
  const [tutorLoading, setTutorLoading] = useState(false);

  const activeCourse =
    TUTORIAL_COURSES.find((c) => c.id === selectedCourseId) || TUTORIAL_COURSES[0];
  const activeLesson =
    activeCourse.lessons.find((l) => l.id === selectedLessonId) || activeCourse.lessons[0];

  const filteredCourses = TUTORIAL_COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const handleQuizAnswer = (qId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    if (!activeLesson.quiz) return;
    let correct = 0;
    activeLesson.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / activeLesson.quiz.length) * 100);
    recordQuizScore(activeLesson.id, score);
    setQuizSubmitted(true);

    if (score >= 70) {
      markLessonComplete(activeLesson.id);
    }
  };

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuestion.trim() || tutorLoading) return;

    setTutorLoading(true);
    setTutorResponse('');

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Lesson Context (${activeCourse.language} - ${activeLesson.title}):\n${activeLesson.content}\n\nStudent Question: ${tutorQuestion}`,
            },
          ],
          systemPrompt:
            'You are the ZAIN TECH AI Programming Tutor. Explain computer science concepts gently, clearly, with concise code snippets if helpful. Encourage the student to think through principles.',
        }),
      });

      const data = await res.json();
      setTutorResponse(data.reply || 'Great question! Review the lesson details above.');
    } catch (err: any) {
      setTutorResponse('Sorry, tutor assistance is temporarily unreachable. Please retry.');
    } finally {
      setTutorLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-sky-950 text-sky-400 border border-sky-800 uppercase">
              Feature Five
            </span>
            <span className="text-xs text-slate-400">Interactive Courses & Quizzes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Programming Learning Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Master C++, Python, HTML/CSS, JavaScript, Java, and SQL with practical examples and graded evaluations.
          </p>
        </div>

        {/* User Badges */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800">
          <Award className="w-5 h-5 text-amber-400 ml-1" />
          <div className="text-xs">
            <span className="font-bold text-white">{earnedBadges.length} Badges Earned</span>
            <div className="flex gap-1 mt-0.5">
              {earnedBadges.map((b) => (
                <span
                  key={b}
                  className="px-1.5 py-0.5 rounded text-[9px] bg-amber-950 text-amber-300 border border-amber-800 font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search language or course topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Level Filters */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto overflow-x-auto">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedLevel === lvl
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace: Sidebar & Lesson Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Catalog (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-3xl bg-[#090f20] border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono px-2 mb-2">
              Learning Tracks
            </h3>

            <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
              {filteredCourses.map((c) => {
                const isSelected = c.id === selectedCourseId;
                const completedCount = c.lessons.filter((l) =>
                  completedLessons.includes(l.id)
                ).length;

                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCourseId(c.id);
                      setSelectedLessonId(c.lessons[0].id);
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                      setTutorResponse('');
                    }}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-500/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                        {c.language}
                      </span>
                      <span className="text-[10px] text-slate-400">{c.level}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1">{c.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{c.description}</p>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                      <span>{c.lessons.length} Lessons</span>
                      <span className="text-emerald-400 font-medium">
                        {completedCount}/{c.lessons.length} Completed
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lesson Reader & Quiz Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-[#090f20] border border-slate-800 space-y-6">
            {/* Lesson Title & Progress Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                  {activeCourse.language} • {activeLesson.duration}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-0.5">{activeLesson.title}</h2>
              </div>

              <div className="flex items-center space-x-2">
                {completedLessons.includes(activeLesson.id) ? (
                  <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <button
                    onClick={() => markLessonComplete(activeLesson.id)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <span>Mark Completed</span>
                  </button>
                )}
              </div>
            </div>

            {/* Lesson Content Markdown */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {activeLesson.content}
            </div>

            {/* Code Example Snippet */}
            {activeLesson.codeExample && (
              <div className="rounded-2xl overflow-hidden border border-slate-700/80 bg-[#070b14]">
                <div className="flex items-center justify-between px-4 py-2 bg-[#0c1326] border-b border-slate-800 text-xs font-mono text-cyan-400">
                  <span>{activeCourse.language} Practical Example</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(activeLesson.codeExample!)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{activeLesson.codeExample}</code>
                </pre>
              </div>
            )}

            {/* Graded Quiz Component */}
            {activeLesson.quiz && activeLesson.quiz.length > 0 && (
              <div className="pt-6 border-t border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    Lesson Comprehension Quiz ({activeLesson.quiz.length} Questions)
                  </h3>
                  {quizScores[activeLesson.id] !== undefined && (
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      Score: {quizScores[activeLesson.id]}%
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {activeLesson.quiz.map((q, qIndex) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="text-xs sm:text-sm font-semibold text-slate-200">
                        {qIndex + 1}. {q.question}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = quizAnswers[q.id] === optIndex;
                          const isCorrect = q.correctAnswer === optIndex;

                          let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800';
                          if (isSelected) {
                            btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-300';
                          }
                          if (quizSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-300';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-950 border-rose-500 text-rose-300';
                            }
                          }

                          return (
                            <button
                              key={optIndex}
                              type="button"
                              onClick={() => handleQuizAnswer(q.id, optIndex)}
                              disabled={quizSubmitted}
                              className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  {quizSubmitted ? (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                    >
                      Retry Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleGradeQuiz}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 shadow-md shadow-cyan-500/20"
                    >
                      Submit Quiz & Check Score
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* AI Programming Tutor Ask Box */}
            <div className="pt-6 border-t border-slate-800/80 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                Ask ZAIN AI Tutor About This Lesson
              </h3>
              <form onSubmit={handleAskTutor} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Can you explain line 4 in the code example in simpler terms?"
                  value={tutorQuestion}
                  onChange={(e) => setTutorQuestion(e.target.value)}
                  disabled={tutorLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!tutorQuestion.trim() || tutorLoading}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{tutorLoading ? 'Thinking...' : 'Ask Tutor'}</span>
                </button>
              </form>

              {tutorResponse && (
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  <div className="font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    ZAIN AI Tutor Guidance
                  </div>
                  {tutorResponse}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
