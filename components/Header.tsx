'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';

export default function Header() {
  const { t, lang, setLang } = useLang();
  const { user, signOut } = useAuth();
  return (
    <header className="site-header">
      <div className="header-in">
        <Link href="/" className="brand"><span className="logo">3</span><span>{t('brand')}</span></Link>
        <nav>
          <Link href="/courses">{t('courses')}</Link>
          {user && <Link href="/dashboard">{lang === 'ar' ? 'لوحتي' : 'My learning'}</Link>}
          <button type="button" className="chip" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} aria-label="language">{lang === 'ar' ? 'English' : 'العربية'}</button>
          {user ? <button type="button" className="link-btn" onClick={signOut}>{t('logout')}</button> : <Link href="/login" className="btn primary sm">{t('login')}</Link>}
        </nav>
      </div>
    </header>
  );
}
