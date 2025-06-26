'use client';

import { auth } from '@/lib/firebase';
import {
  User,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential>;
  loginWithEmail: (email:string, password:string) => Promise<UserCredential>;
  signupWithEmail: (email:string, password:string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => { throw new Error('not implemented'); },
  loginWithEmail: async () => { throw new Error('not implemented'); },
  signupWithEmail: async () => { throw new Error('not implemented'); },
  logout: async () => { throw new Error('not implemented'); },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const loginWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signupWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
