// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          CODRX — Cross-Border Online Drugstore
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Manage prescriptions, place orders, and track delivery across borders.
          This is the agile front-end scaffold we’ll iterate on and instrument for KVMs.
        </p>

        <div className="mt-6 flex gap-3">
          <Link href="/dashboard" className="inline-flex items-center rounded-xl px-4 py-2 font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
            Go to Dashboard
          </Link>
          <Link href="/prescriptions" className="inline-flex items-center rounded-xl px-4 py-2 font-medium bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition">
            View Prescriptions
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h3 className="text-lg font-semibold mb-2">Planned KVM hooks</h3>
        <ul className="list-disc pl-6 space-y-1 text-slate-700 dark:text-slate-300">
          <li>Signup conversion</li>
          <li>RX upload completion</li>
          <li>Checkout success rate</li>
          <li>Shipping SLA adherence</li>
        </ul>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          We’ll wire analytics later; this page marks where events will fire.
        </p>
      </div>
    </section>
  )
}
