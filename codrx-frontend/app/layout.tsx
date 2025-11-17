import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'CODRX',
  description: 'Secure pharmacy portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* keep body stable to avoid hydration warnings */}
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <NavBar />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm dark:border-slate-800">
          © {new Date().getFullYear()} CODRX
        </footer>
      </body>
    </html>
  );
}
