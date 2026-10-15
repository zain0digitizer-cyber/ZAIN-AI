/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import { Zap } from 'lucide-react';

// Pages
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { CodeGeneratorPage } from './pages/CodeGeneratorPage';
import { ImageGeneratorPage } from './pages/ImageGeneratorPage';
import { VoiceAssistantPage } from './pages/VoiceAssistantPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { PdfSummarizerPage } from './pages/PdfSummarizerPage';
import { WebsiteBuilderPage } from './pages/WebsiteBuilderPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

function MainApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Global Keyboard Shortcuts Listener Hook
  const {
    activeToast,
    shortcutsModalOpen,
    setShortcutsModalOpen,
  } = useGlobalShortcuts({
    onToggleSearch: () => setSearchOpen((prev) => !prev),
    onNavigate: navigateTo,
    isSearchOpen: searchOpen,
    onCloseSearch: () => setSearchOpen(false),
  });

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigateTo} />;
      case '/login':
        return <AuthPage initialMode="login" onNavigate={navigateTo} />;
      case '/signup':
        return <AuthPage initialMode="signup" onNavigate={navigateTo} />;
      case '/dashboard':
        return <DashboardPage onNavigate={navigateTo} />;
      case '/ai-chat':
        return <ChatPage />;
      case '/code-generator':
        return <CodeGeneratorPage />;
      case '/image-generator':
        return <ImageGeneratorPage />;
      case '/voice-assistant':
        return <VoiceAssistantPage />;
      case '/tutorials':
        return <TutorialsPage />;
      case '/resume-builder':
        return <ResumeBuilderPage />;
      case '/pdf-summarizer':
        return <PdfSummarizerPage />;
      case '/website-builder':
        return <WebsiteBuilderPage />;
      case '/contact':
        return <ContactPage />;
      case '/booking':
        return <BookingPage />;
      case '/settings':
        return <SettingsPage />;
      case '/admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  const isFullscreenTool = ['/ai-chat'].includes(currentPath);

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenShortcuts={() => setShortcutsModalOpen(true)}
      />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex w-full">
        <Sidebar
          currentPath={currentPath}
          onNavigate={navigateTo}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          {renderCurrentPage()}
          {!isFullscreenTool && <Footer onNavigate={navigateTo} />}
        </main>
      </div>

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigateTo}
        onOpenShortcutsHelp={() => setShortcutsModalOpen(true)}
      />

      {/* Full Keyboard Shortcuts Cheat Sheet Modal */}
      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
        onNavigate={navigateTo}
      />

      {/* HUD Floating Toast when keyboard shortcut is pressed */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl bg-[#090f22]/95 border border-cyan-500/60 shadow-2xl shadow-cyan-950/80 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" />
          </div>
          <div className="text-xs">
            <span className="text-slate-400 font-medium">Hotkeyed to: </span>
            <span className="font-bold text-white">{activeToast.label}</span>
          </div>
          <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
            {activeToast.shortcut}
          </kbd>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}
