'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '../lib/auth'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login')
    }
  }, [router])

  // You could add a small spinner here while checking auth
  return <>{children}</>
}
