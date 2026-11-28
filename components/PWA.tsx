'use client';
import { useEffect, useState } from 'react';

type InstallEvent = Event & { prompt: () => Promise<void> };

export default function PWA() {
  const [evt, setEvt] = useState<InstallEvent | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const onPrompt = (e: Event) => { e.preventDefault(); setEvt(e as InstallEvent); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  if (!evt || hidden) return null;
  return (
    <div className="install-bar" role="dialog">
      <span>ثبّت التطبيق على موبايلك · Install the app</span>
      <button className="btn primary" onClick={async () => { await evt.prompt(); setEvt(null); }}>ثبّت · Install</button>
      <button className="link-btn" onClick={() => setHidden(true)} aria-label="close">✕</button>
    </div>
  );
}
