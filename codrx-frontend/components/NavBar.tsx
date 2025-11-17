'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

/**
 * We assume the login flow stores:
 *   localStorage.setItem('codrx_auth', '1')
 *   localStorage.setItem('codrx_email', userEmail)   // optional, for UI only
 * Logout clears those keys.
 */
export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Read local auth flags and keep them in sync across tabs
  useEffect(() => {
    const read = () => {
      const flag = typeof window !== 'undefined' ? localStorage.getItem('codrx_auth') : null;
      const em = typeof window !== 'undefined' ? localStorage.getItem('codrx_email') : null;
      setLoggedIn(!!flag);
      setEmail(em);
    };
    read();

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'codrx_auth' || e.key === 'codrx_email') read();
    };
    const onVis = () => read(); // re-check when tab becomes active

    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [pathname]);

  async function handleLogout() {
    try {
      // Try to invalidate cookies on the backend; ignore failures
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    // Clear local flag so UI updates immediately
    localStorage.removeItem('codrx_auth');
    localStorage.removeItem('codrx_email');
    setLoggedIn(false);
    setEmail(null);

    router.replace('/login');
    router.refresh();
  }

  return (
    <nav className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-semibold">CODRX</Link>

        {/* Left links when logged in */}
        {loggedIn && (
          <>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/prescriptions" className="hover:underline">Prescriptions</Link>
            <Link href="/orders" className="hover:underline">Orders</Link>
          </>
        )}

        <div className="ml-auto flex items-center gap-3">
          {loggedIn ? (
            <>
              {email && (
                <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">
                  {email}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-black/80 dark:bg-slate-200 dark:text-slate-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm hover:underline">Login</Link>
              <Link
                href="/register"
                className="text-sm rounded-lg bg-blue-600 text-white px-3 py-1.5 hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
