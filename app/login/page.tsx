'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { supabase, supabaseConfigured } from '@/lib/supabase';

export default function Login() {
  const { t } = useLang();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const run = async (mode: 'in' | 'up') => {
    setBusy(true); setMsg('');
    const res = mode === 'in'
      ? await supabase().auth.signInWithPassword({ email, password })
      : await supabase().auth.signUp({ email, password });
    setBusy(false);
    if (res.error) { setMsg(res.error.message); return; }
    if (mode === 'up' && !res.data.session) { setMsg(t('checkEmail')); return; }
    router.push('/courses');
  };

  return (
    <>
      <h1>{t('login')}</h1>
      {!supabaseConfigured && <div className="callout warn">{t('setupMissing')}</div>}
      <label htmlFor="email">{t('email')}</label>
      <input id="email" type="email" dir="ltr" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="pw">{t('password')}</label>
      <input id="pw" type="password" dir="ltr" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" className="btn primary" disabled={busy || !email || password.length < 6} onClick={() => run('in')}>{t('signInBtn')}</button>
        <button type="button" className="btn" disabled={busy || !email || password.length < 6} onClick={() => run('up')}>{t('signUp')}</button>
      </p>
      {msg && <div className="callout warn" role="status">{msg}</div>}
    </>
  );
}
