import { useEffect, useState, useCallback } from 'react';

export interface ShortcutToast {
  id: string;
  label: string;
  shortcut: string;
  icon?: string;
}

interface UseGlobalShortcutsOptions {
  onToggleSearch: () => void;
  onNavigate: (path: string) => void;
  isSearchOpen: boolean;
  onCloseSearch: () => void;
}

export function useGlobalShortcuts({
  onToggleSearch,
  onNavigate,
  isSearchOpen,
  onCloseSearch,
}: UseGlobalShortcutsOptions) {
  const [activeToast, setActiveToast] = useState<ShortcutToast | null>(null);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);

  const showToast = useCallback((label: string, shortcut: string) => {
    const toast: ShortcutToast = {
      id: `${Date.now()}_${Math.random()}`,
      label,
      shortcut,
    };
    setActiveToast(toast);
    const timer = setTimeout(() => {
      setActiveToast((current) => (current?.id === toast.id ? null : current));
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toLowerCase();

      // Check if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      // 1. Cmd+K or Ctrl+K -> Toggle Search Modal
      if (modKey && key === 'k') {
        e.preventDefault();
        e.stopPropagation();
        onToggleSearch();
        return;
      }

      // 2. Escape key -> Close Search or Shortcuts Modal
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          e.preventDefault();
          onCloseSearch();
        }
        if (shortcutsModalOpen) {
          e.preventDefault();
          setShortcutsModalOpen(false);
        }
        return;
      }

      // 3. Question mark "?" when not in input -> Open Shortcuts Help
      if (!isInput && e.key === '?' && !modKey) {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
        return;
      }

      // 4. Primary Tool Shortcuts (Works with Cmd/Ctrl + Number OR Alt + Number)
      if (modKey || e.altKey) {
        if (key === '1') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/ai-chat');
          showToast('AI Chatbot', isMac ? '⌘1' : 'Ctrl+1');
          return;
        }
        if (key === '2') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/code-generator');
          showToast('AI Code Generator', isMac ? '⌘2' : 'Ctrl+2');
          return;
        }
        if (key === '3') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/image-generator');
          showToast('AI Image Studio', isMac ? '⌘3' : 'Ctrl+3');
          return;
        }
        if (key === '4') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/voice-assistant');
          showToast('Voice AI (ZAIN AI)', isMac ? '⌘4' : 'Ctrl+4');
          return;
        }
        if (key === '5') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/website-builder');
          showToast('AI Website Generator', isMac ? '⌘5' : 'Ctrl+5');
          return;
        }
        if (key === '6') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/resume-builder');
          showToast('AI Resume Builder', isMac ? '⌘6' : 'Ctrl+6');
          return;
        }
        if (key === '7') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/pdf-summarizer');
          showToast('PDF AI Summarizer', isMac ? '⌘7' : 'Ctrl+7');
          return;
        }
        if (key === '8') {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/tutorials');
          showToast('Programming Academy', isMac ? '⌘8' : 'Ctrl+8');
          return;
        }
        if (key === 'd' && (e.shiftKey || e.altKey || modKey)) {
          // Avoid collision with browser bookmark (Cmd+D) by prioritizing Alt+D or Cmd+Shift+D
          if (e.shiftKey || e.altKey) {
            e.preventDefault();
            onCloseSearch();
            onNavigate('/dashboard');
            showToast('User Dashboard', isMac ? '⇧⌘D' : 'Ctrl+Shift+D');
            return;
          }
        }
        if (key === 'h' && e.altKey) {
          e.preventDefault();
          onCloseSearch();
          onNavigate('/');
          showToast('Homepage', 'Alt+H');
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [
    onToggleSearch,
    onNavigate,
    isSearchOpen,
    onCloseSearch,
    shortcutsModalOpen,
    showToast,
  ]);

  return {
    activeToast,
    shortcutsModalOpen,
    setShortcutsModalOpen,
  };
}
