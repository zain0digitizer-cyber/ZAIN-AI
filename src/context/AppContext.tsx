import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Conversation,
  GeneratedCodeItem,
  GeneratedImageItem,
  GeneratedWebsiteItem,
  ResumeData,
  DocumentSummaryItem,
  ContactMessage,
  ConsultationBooking,
} from '../types';

interface AppContextType {
  // Chat
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  createConversation: (initialMessage?: string) => string;
  addMessageToConversation: (id: string, role: 'user' | 'assistant', content: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;

  // Code
  savedCodeList: GeneratedCodeItem[];
  saveCodeItem: (item: Omit<GeneratedCodeItem, 'id' | 'createdAt'>) => void;
  deleteCodeItem: (id: string) => void;

  // Images
  generatedImages: GeneratedImageItem[];
  saveImageItem: (item: Omit<GeneratedImageItem, 'id' | 'createdAt'>) => void;
  deleteImageItem: (id: string) => void;

  // Websites
  savedWebsites: GeneratedWebsiteItem[];
  saveWebsiteItem: (item: Omit<GeneratedWebsiteItem, 'id' | 'createdAt'>) => void;
  deleteWebsiteItem: (id: string) => void;

  // Resumes
  resumes: ResumeData[];
  activeResume: ResumeData;
  updateResume: (data: Partial<ResumeData>) => void;
  saveResumeAsNew: (data: Partial<ResumeData>) => void;

  // Documents / PDF
  savedDocuments: DocumentSummaryItem[];
  saveDocumentSummary: (item: Omit<DocumentSummaryItem, 'id' | 'createdAt'>) => void;
  deleteDocumentSummary: (id: string) => void;

  // Tutorial Progress
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  quizScores: Record<string, number>;
  recordQuizScore: (lessonId: string, score: number) => void;
  earnedBadges: string[];

  // Contact & Booking
  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => void;
  updateMessageStatus: (id: string, status: 'new' | 'read' | 'replied') => void;
  bookings: ConsultationBooking[];
  addBooking: (booking: Omit<ConsultationBooking, 'id' | 'status' | 'createdAt'>) => boolean;
  updateBookingStatus: (id: string, status: 'confirmed' | 'pending' | 'completed') => void;
}

const DEFAULT_RESUME: ResumeData = {
  id: 'res_default',
  fullName: 'Zain Developer',
  email: 'zain0digitizer@gmail.com',
  phone: '+1 (555) 234-8900',
  location: 'San Francisco, CA',
  website: 'https://zaintech.ai',
  title: 'Senior Full Stack & AI Systems Engineer',
  template: 'modern',
  summary:
    'Innovative Software Engineer with 6+ years of experience architecting high-scale SaaS web platforms, distributed AI agents, and responsive cloud interfaces. Specialized in React, TypeScript, Next.js, Node.js, and generative AI integrations.',
  experience: [
    {
      id: 'exp_1',
      role: 'Lead Full-Stack AI Engineer',
      company: 'Nexus Innovations',
      period: '2023 - Present',
      description:
        'Architected real-time AI workflows serving 200k+ daily queries. Optimized latency by 45% using streaming LLM pipelines and automated CI/CD microservices.',
    },
    {
      id: 'exp_2',
      role: 'Senior Frontend Developer',
      company: 'Quantum Tech Labs',
      period: '2021 - 2023',
      description:
        'Built interactive data visualization dashboards using React, Tailwind CSS, and WebGL. Spearheaded modular component system adopted by 14 product squads.',
    },
  ],
  education: [
    {
      id: 'edu_1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Technology',
      year: '2017 - 2021',
    },
  ],
  skills: ['TypeScript', 'React', 'Python', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Gemini AI API', 'Next.js'],
  certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional Cloud Architect'],
  updatedAt: new Date().toISOString(),
};

const INITIAL_CONVERSATION: Conversation = {
  id: 'conv_welcome',
  title: 'Welcome to ZAIN AI',
  messages: [
    {
      id: 'msg_welcome',
      role: 'assistant',
      content:
        'Welcome to **ZAIN TECH AI Assistant**! ⚡\n\nI am your intelligent partner powered by advanced neural models. I can help you with:\n- **Architecting & Debugging Code** in C++, Python, JavaScript, and more.\n- **Brainstorming System Architectures** and database schemas.\n- **Crafting High-Conversion Copy** and full-stack software development.\n\nHow can I help you accelerate your projects today?',
      timestamp: new Date().toISOString(),
    },
  ],
  updatedAt: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('zain_conversations');
      return saved ? JSON.parse(saved) : [INITIAL_CONVERSATION];
    } catch {
      return [INITIAL_CONVERSATION];
    }
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(
    conversations[0]?.id || INITIAL_CONVERSATION.id
  );

  useEffect(() => {
    localStorage.setItem('zain_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const createConversation = (initialMessage?: string) => {
    const newId = `conv_${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: initialMessage ? (initialMessage.slice(0, 32) + '...') : 'New Conversation',
      messages: initialMessage
        ? [{ id: `msg_${Date.now()}`, role: 'user', content: initialMessage, timestamp: new Date().toISOString() }]
        : [],
      updatedAt: new Date().toISOString(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    return newId;
  };

  const addMessageToConversation = (id: string, role: 'user' | 'assistant', content: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updatedMessages = [
            ...c.messages,
            { id: `msg_${Date.now()}_${Math.random()}`, role, content, timestamp: new Date().toISOString() },
          ];
          const newTitle =
            c.title === 'New Conversation' && role === 'user'
              ? content.slice(0, 30) + '...'
              : c.title;
          return {
            ...c,
            title: newTitle,
            messages: updatedMessages,
            updatedAt: new Date().toISOString(),
          };
        }
        return c;
      })
    );
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        return [INITIAL_CONVERSATION];
      }
      return filtered;
    });
    if (activeConversationId === id) {
      setActiveConversationId(conversations[0]?.id || INITIAL_CONVERSATION.id);
    }
  };

  const renameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle, updatedAt: new Date().toISOString() } : c))
    );
  };

  // Code Items
  const [savedCodeList, setSavedCodeList] = useState<GeneratedCodeItem[]>(() => {
    try {
      const saved = localStorage.getItem('zain_saved_code');
      return saved ? JSON.parse(saved) : [
        {
          id: 'code_init_1',
          title: 'High-Concurrency Worker Pool',
          language: 'Python',
          code: `import asyncio\nimport aiohttp\n\nasync def fetch_worker(queue, session):\n    while True:\n        url = await queue.get()\n        try:\n            async with session.get(url, timeout=5) as resp:\n                print(f"Status {resp.status} for {url}")\n        except Exception as e:\n            print(f"Error fetching {url}: {e}")\n        finally:\n            queue.task_done()\n\nasync def main():\n    queue = asyncio.Queue()\n    urls = ["https://api.github.com", "https://zaintech.ai"]\n    for u in urls:\n        await queue.put(u)\n    async with aiohttp.ClientSession() as session:\n        tasks = [asyncio.create_task(fetch_worker(queue, session)) for _ in range(3)]\n        await queue.join()\n        for t in tasks:\n            t.cancel()`,
          explanation: 'Demonstrates an asynchronous queue worker pattern using asyncio in Python.',
          improvements: 'Add exponential backoff retries and structured logging.',
          createdAt: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zain_saved_code', JSON.stringify(savedCodeList));
  }, [savedCodeList]);

  const saveCodeItem = (item: Omit<GeneratedCodeItem, 'id' | 'createdAt'>) => {
    const newItem: GeneratedCodeItem = {
      ...item,
      id: `code_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSavedCodeList((prev) => [newItem, ...prev]);
  };

  const deleteCodeItem = (id: string) => {
    setSavedCodeList((prev) => prev.filter((item) => item.id !== id));
  };

  // Images
  const [generatedImages, setGeneratedImages] = useState<GeneratedImageItem[]>(() => {
    try {
      const saved = localStorage.getItem('zain_saved_images');
      return saved ? JSON.parse(saved) : [
        {
          id: 'img_sample_1',
          prompt: 'Futuristic AI neural core with glowing cyan fiber optic connections in deep space',
          style: 'Cinematic',
          aspectRatio: '16:9',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'img_sample_2',
          prompt: 'Cyberpunk developer workspace with multiple holographic screens and neon violet lighting',
          style: '3D Render',
          aspectRatio: '1:1',
          imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
          createdAt: new Date().toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zain_saved_images', JSON.stringify(generatedImages));
  }, [generatedImages]);

  const saveImageItem = (item: Omit<GeneratedImageItem, 'id' | 'createdAt'>) => {
    const newItem: GeneratedImageItem = {
      ...item,
      id: `img_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setGeneratedImages((prev) => [newItem, ...prev]);
  };

  const deleteImageItem = (id: string) => {
    setGeneratedImages((prev) => prev.filter((item) => item.id !== id));
  };

  // Websites
  const [savedWebsites, setSavedWebsites] = useState<GeneratedWebsiteItem[]>(() => {
    try {
      const saved = localStorage.getItem('zain_saved_websites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zain_saved_websites', JSON.stringify(savedWebsites));
  }, [savedWebsites]);

  const saveWebsiteItem = (item: Omit<GeneratedWebsiteItem, 'id' | 'createdAt'>) => {
    const newItem: GeneratedWebsiteItem = {
      ...item,
      id: `web_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSavedWebsites((prev) => [newItem, ...prev]);
  };

  const deleteWebsiteItem = (id: string) => {
    setSavedWebsites((prev) => prev.filter((item) => item.id !== id));
  };

  // Resume
  const [activeResume, setActiveResume] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('zain_active_resume');
      return saved ? JSON.parse(saved) : DEFAULT_RESUME;
    } catch {
      return DEFAULT_RESUME;
    }
  });

  const [resumes, setResumes] = useState<ResumeData[]>([DEFAULT_RESUME]);

  useEffect(() => {
    localStorage.setItem('zain_active_resume', JSON.stringify(activeResume));
  }, [activeResume]);

  const updateResume = (data: Partial<ResumeData>) => {
    setActiveResume((prev) => ({
      ...prev,
      ...data,
      updatedAt: new Date().toISOString(),
    }));
  };

  const saveResumeAsNew = (data: Partial<ResumeData>) => {
    const newResume: ResumeData = {
      ...activeResume,
      ...data,
      id: `res_${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    setResumes((prev) => [newResume, ...prev]);
    setActiveResume(newResume);
  };

  // Documents
  const [savedDocuments, setSavedDocuments] = useState<DocumentSummaryItem[]>(() => {
    try {
      const saved = localStorage.getItem('zain_saved_docs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zain_saved_docs', JSON.stringify(savedDocuments));
  }, [savedDocuments]);

  const saveDocumentSummary = (item: Omit<DocumentSummaryItem, 'id' | 'createdAt'>) => {
    const newItem: DocumentSummaryItem = {
      ...item,
      id: `doc_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSavedDocuments((prev) => [newItem, ...prev]);
  };

  const deleteDocumentSummary = (id: string) => {
    setSavedDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // Tutorial Progress
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zain_completed_lessons');
      return saved ? JSON.parse(saved) : ['cpp_intro', 'py_intro'];
    } catch {
      return ['cpp_intro', 'py_intro'];
    }
  });

  const [quizScores, setQuizScores] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('zain_quiz_scores');
      return saved ? JSON.parse(saved) : { cpp_intro: 100, py_intro: 100 };
    } catch {
      return { cpp_intro: 100, py_intro: 100 };
    }
  });

  const [earnedBadges, setEarnedBadges] = useState<string[]>(['First Step Coder', 'Fast Learner']);

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem('zain_completed_lessons', JSON.stringify(updated));

      if (updated.length >= 3 && !earnedBadges.includes('Code Explorer')) {
        setEarnedBadges((b) => [...b, 'Code Explorer']);
      }
      if (updated.length >= 6 && !earnedBadges.includes('Polyglot Pioneer')) {
        setEarnedBadges((b) => [...b, 'Polyglot Pioneer']);
      }
    }
  };

  const recordQuizScore = (lessonId: string, score: number) => {
    const updated = { ...quizScores, [lessonId]: score };
    setQuizScores(updated);
    localStorage.setItem('zain_quiz_scores', JSON.stringify(updated));
  };

  // Contact Messages & Bookings
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('zain_contact_messages');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'msg_1',
              fullName: 'Elena Rostova',
              email: 'elena@cybernetics.io',
              subject: 'AI Agent Fleet Integration for Fintech',
              message: 'We are looking to implement autonomous coding and PDF verification agents across our team.',
              status: 'new',
              createdAt: '2026-10-12T09:15:00Z',
            },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zain_contact_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg_${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: 'new' | 'read' | 'replied') => {
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const [bookings, setBookings] = useState<ConsultationBooking[]>(() => {
    try {
      const saved = localStorage.getItem('zain_bookings');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'book_1',
              fullName: 'Marcus Vance',
              email: 'm.vance@vancetech.com',
              service: 'AI Architecture Review',
              date: '2026-10-20',
              time: '14:00',
              projectDescription: 'Architecting custom LLM pipelines with high throughput and data privacy.',
              status: 'confirmed',
              createdAt: '2026-10-10T16:00:00Z',
            },
          ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zain_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Omit<ConsultationBooking, 'id' | 'status' | 'createdAt'>) => {
    // Check duplicate reservation
    const duplicate = bookings.some(
      (b) => b.date === booking.date && b.time === booking.time && b.status !== 'completed'
    );
    if (duplicate) {
      return false;
    }
    const newBooking: ConsultationBooking = {
      ...booking,
      id: `book_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return true;
  };

  const updateBookingStatus = (id: string, status: 'confirmed' | 'pending' | 'completed') => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  return (
    <AppContext.Provider
      value={{
        conversations,
        activeConversationId,
        setActiveConversationId,
        createConversation,
        addMessageToConversation,
        deleteConversation,
        renameConversation,
        savedCodeList,
        saveCodeItem,
        deleteCodeItem,
        generatedImages,
        saveImageItem,
        deleteImageItem,
        savedWebsites,
        saveWebsiteItem,
        deleteWebsiteItem,
        resumes,
        activeResume,
        updateResume,
        saveResumeAsNew,
        savedDocuments,
        saveDocumentSummary,
        deleteDocumentSummary,
        completedLessons,
        markLessonComplete,
        quizScores,
        recordQuizScore,
        earnedBadges,
        contactMessages,
        addContactMessage,
        updateMessageStatus,
        bookings,
        addBooking,
        updateBookingStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
