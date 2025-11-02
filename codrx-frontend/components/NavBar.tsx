'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { isLoggedIn, logoutUser } from '../lib/auth'

type NavItem = {
  href: string
  label: string
}

const NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/prescriptions', label: 'Prescriptions' },
  { href: '/orders', label: 'Orders' },
  { href: '/dashboard', label: 'Dashboard' },
]

function NavLink({ href, label }: NavItem) {
  const pathname = usePathname()
  const active =
    href === '/'
      ? pathname === '/'
      : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={[
        'px-3 py-2 rounded-lg text-sm transition',
        active
          ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
          : 'hover:bg-slate-200/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

export default function NavBar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-slate-950/40">
      <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="font-semibold tracking-wide">
          CODRX
          <span className="ml-2 text-xs rounded-md px-2 py-0.5 bg-blue-600 text-white align-middle">Beta</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink key={n.href} {...n} />
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-200/70 dark:hover:bg-slate-800/70"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {isLoggedIn() && (
          <button
            className="ml-4 inline-flex items-center justify-center rounded-lg px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium transition"
            onClick={() => {
              logoutUser()
              router.push('/login')
              window.location.href = '/login'
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3">
          <div className="flex flex-col gap-2">
            {NAV.map((n) => (
              <NavLink key={n.href} {...n} />
            ))}
            {isLoggedIn() && (
          <button
            onClick={() => {
              logoutUser()
              router.push('/login')
            }}
            className="text-left text-red-600 dark:text-red-400 px-3 py-2 text-sm"
          >
            Logout
          </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
