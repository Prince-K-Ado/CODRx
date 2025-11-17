'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false })

export default function RecaptchaBox({
  onChange,
  onExpired,
  theme = 'light',
}: {
  onChange: (token: string | null) => void
  onExpired?: () => void
  theme?: 'light' | 'dark'
}) {
  const [siteKey] = useState<string | undefined>(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  )

  if (!siteKey) {
    return (
      <p className="text-sm text-red-500">
        reCAPTCHA site key missing. Set <code>NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> in
        <code>.env.local</code> and restart dev server.
      </p>
    )
  }

  return (
    <ReCAPTCHA
      sitekey={siteKey}
      theme={theme}
      onChange={onChange}
      onExpired={onExpired}
    />
  )
}
