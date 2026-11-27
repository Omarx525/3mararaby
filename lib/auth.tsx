'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from './supabase';

type Progress = Record<string, number[]>; // course id -> finished lesson indexes
type Ctx = {
  user: User | null; ready: boolean; progress: Progress;
  markDone: (course: string, n: number) => Promise<void>;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<Ctx>({ user: null, ready: false, progress: {}, markDone: async () => {}, signOut: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<Progress>({});

  const load = useCallback(async (u: User | null) => {
    if (!u) { setProgress({}); return; }
    const { data } = await supabase().from('progress').select('course_id, lesson_index');
    const next: Progress = {};
    (data || []).forEach((r: { course_id: string; lesson_index: number }) => { (next[r.course_id] ||= []).push(r.lesson_index); });
    setProgress(next);
  }, []);

  useEffect(() => {
    if (!supabaseConfigured) { setReady(true); return; }
    supabase().auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); load(data.session?.user ?? null).then(() => setReady(true)); });
    const { data: sub } = supabase().auth.onAuthStateChange((_e, session) => { setUser(session?.user ?? null); load(session?.user ?? null); });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const markDone = async (course: string, n: number) => {
    if (!user) return;
    if ((progress[course] || []).includes(n)) return;
    const { error } = await supabase().from('progress').insert({ user_id: user.id, course_id: course, lesson_index: n });
    if (!error) setProgress((p) => ({ ...p, [course]: [...(p[course] || []), n] }));
  };
  const signOut = async () => { await supabase().auth.signOut(); };

  return <AuthContext.Provider value={{ user, ready, progress, markDone, signOut }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
