// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import NavBar from '../components/NavBar'

export const metadata: Metadata = {
  title: 'CODRX — Cross-Border Online Drugstore',
  description: 'KVM-ready Next.js front-end for CODRX',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <NavBar />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t mt-10 py-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="max-w-6xl mx-auto px-4">
            © 2025 CODRX • Prototype
          </div>
        </footer>
      </body>
    </html>
  )
}
