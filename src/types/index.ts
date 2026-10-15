export type Role = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  title?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: string;
}

export interface GeneratedCodeItem {
  id: string;
  title: string;
  language: string;
  code: string;
  explanation: string;
  improvements?: string;
  createdAt: string;
}

export interface GeneratedImageItem {
  id: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  imageUrl: string;
  createdAt: string;
}

export interface GeneratedWebsiteItem {
  id: string;
  title: string;
  prompt: string;
  templateType: string;
  html: string;
  css: string;
  js: string;
  createdAt: string;
}

export interface ResumeData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  title: string;
  summary: string;
  template: 'modern' | 'minimal' | 'executive' | 'creative';
  experience: {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    year: string;
  }[];
  skills: string[];
  certifications: string[];
  updatedAt: string;
}

export interface DocumentSummaryItem {
  id: string;
  fileName: string;
  fileSize: string;
  content: string;
  summary: string;
  keyPoints: string[];
  notes?: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  content: string;
  codeExample?: string;
  quiz?: QuizQuestion[];
}

export interface TutorialCourse {
  id: string;
  language: 'C++' | 'Python' | 'HTML' | 'CSS' | 'JavaScript' | 'Java' | 'SQL';
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
  lessons: Lesson[];
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  service: string;
  date: string;
  time: string;
  projectDescription: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}
