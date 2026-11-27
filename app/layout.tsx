import type { Metadata } from 'next';
import './globals.css';
import { Cairo } from 'next/font/google';
const cairo = Cairo({ subsets: ['arabic', 'latin'], display: 'swap', variable: '--font-cairo' });
import { LangProvider } from '@/lib/i18n';
import { AuthProvider } from '@/lib/auth';
import Header from '@/components/Header';
import Tracker from '@/components/Tracker';

export const metadata: Metadata = {
  title: '3mararaby: دورات برمجة بالعربي',
  description: 'Free programming courses in Arabic with exercises, quizzes and verifiable certificates.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>
        <LangProvider>
          <AuthProvider>
            <Tracker />
            <Header />
            <main className="page">{children}</main>
            <footer className="site-footer"><div className="footer-in"><strong>3mararaby</strong><span>مجاني. الدروس مسودة وبتتطور · Free. Lessons are drafts and keep improving.</span></div></footer>
          </AuthProvider>
        </LangProvider>
      </body>
    </html>
  );
}
