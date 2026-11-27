'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase, supabaseConfigured } from '@/lib/supabase';

export default function Tracker() {
  const path = usePathname();
  useEffect(() => {
    if (!supabaseConfigured || !path || path.startsWith('/owner')) return;
    let id = window.localStorage.getItem('vid');
    if (!id) { id = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now()); window.localStorage.setItem('vid', id); }
    supabase().rpc('track_view', { p_visitor: id, p_path: path }).then(() => {});
  }, [path]);
  return null;
}
