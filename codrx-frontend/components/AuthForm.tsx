'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

type AuthMode = 'login' | 'register';

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().replace(/[^\w.@+-]/g, '');
      const cleanPassword = password.trim();

      if (!cleanEmail.includes('@')) throw new Error('Invalid email.');
      if (mode === 'register' && cleanPassword !== confirm)
        throw new Error('Passwords do not match.');
      if (!recaptchaToken) throw new Error('Please complete reCAPTCHA.');

      const endpoint =
        mode === 'login'
          ? `${API_BASE}/api/auth/login`
          : `${API_BASE}/api/auth/register`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // required so backend can set HttpOnly cookies
        body: JSON.stringify({
          username: cleanEmail,
          email: mode === 'register' ? cleanEmail : undefined,
          password: cleanPassword,
          recaptchaToken,
        }),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { detail: text };
      }

      if (!res.ok) {
        // helpful surface for dev
        // eslint-disable-next-line no-console
        console.error('Auth error payload:', data);
        throw new Error(data.detail || 'Authentication failed.');
      }

      // Success — set local flags for the NavBar (no /me endpoint)
      localStorage.setItem('codrx_auth', '1');
      localStorage.setItem('codrx_email', cleanEmail);

      if (mode === 'login') {
        router.replace('/dashboard');
      } else {
        alert('Registration successful. Please log in.');
        router.replace('/login');
      }
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md dark:bg-slate-800 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-slate-900 dark:text-white">
          {mode === 'login' ? 'Login to CODRX' : 'Create your CODRX account'}
        </h1>

        <div className="space-y-1">
          <label className="block text-sm text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm text-slate-700 dark:text-slate-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            required
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </div>

        {mode === 'register' && (
          <div className="space-y-1">
            <label className="block text-sm text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              required
              autoComplete="new-password"
            />
          </div>
        )}

        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            onChange={(t) => setRecaptchaToken(t || '')}
            onExpired={() => setRecaptchaToken('')}
            theme="light"
          />
        </div>

        {error && (
          <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}
