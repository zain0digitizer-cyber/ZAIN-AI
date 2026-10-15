import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  loginAsDemo: (role: Role) => void;
}

const STORAGE_KEY = 'zain_tech_auth_user';

const DEMO_USERS: Record<Role, User> = {
  admin: {
    id: 'usr_admin_01',
    email: 'admin@zaintech.ai',
    name: 'Zain Admin',
    role: 'admin',
    title: 'Lead AI Architect & Founder',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    createdAt: '2026-01-15T10:00:00Z',
  },
  user: {
    id: 'usr_demo_02',
    email: 'zain0digitizer@gmail.com',
    name: 'Zain Developer',
    role: 'user',
    title: 'Full Stack Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    createdAt: '2026-02-01T14:30:00Z',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved user', e);
    }
    // Default to the user account matching the request's user email for immediate accessibility
    return DEMO_USERS.user;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user session', e);
    }
  }, [user]);

  const login = async (email: string, _password?: string): Promise<boolean> => {
    // Check if it's admin or regular user
    const role: Role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0].toUpperCase(),
      role,
      title: role === 'admin' ? 'System Administrator' : 'AI Innovator',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const signup = async (name: string, email: string, _password?: string): Promise<boolean> => {
    const role: Role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name,
      role,
      title: 'Platform Member',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const loginAsDemo = (role: Role) => {
    setUser(DEMO_USERS[role]);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        signup,
        logout,
        updateProfile,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
