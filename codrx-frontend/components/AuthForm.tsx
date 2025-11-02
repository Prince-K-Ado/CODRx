'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { isLoggedIn, loginUser } from '../lib/auth'

type AuthMode = 'login' | 'register'

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // If already logged in, redirect to home
    if (isLoggedIn()) router.push('/dashboard')
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const cleanEmail = email.trim().replace(/[^\w.@-]/g, '')
      const cleanPassword = password.trim()

      if (!cleanEmail.includes('@')) throw new Error('Invalid email')
      if (mode === 'register' && cleanPassword !== confirm)
        throw new Error('Passwords do not match')

      // Mock login/register success
      loginUser(cleanEmail)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white/70 dark:bg-slate-900/60"
    >
      <h1 className="text-2xl font-bold text-center">
        {mode === 'login' ? 'Login to CODRX' : 'Register New Account'}
      </h1>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-background text-foreground"
        />
      </div>

      {mode === 'register' && (
        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-background text-foreground"
          />
        </div>
      )}

      {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2 font-medium transition disabled:opacity-60"
      >
        {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
      </button>

      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        {mode === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  )
}
