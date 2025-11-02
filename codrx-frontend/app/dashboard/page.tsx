import ProtectedRoute from '../../components/ProtectedRoute'
import Link from 'next/link'

export const metadata = { title: 'Dashboard · CODRX' }

export default function DashboardPage() {
  const cards = [
    { title: 'Active RX', value: '3', href: '/prescriptions', help: 'Prescriptions on file' },
    { title: 'Open Orders', value: '2', href: '/orders', help: 'Processing or shipped' },
    { title: 'Checkout Success (Demo)', value: '97%', href: '#', help: 'Last 7 days (mock)' },
  ]

  return (
    <ProtectedRoute>
      <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Quick status overview and shortcuts.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(c => (
          <Link
            key={c.title}
            href={c.href}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition"
          >
            <div className="text-sm text-slate-500 dark:text-slate-400">{c.title}</div>
            <div className="mt-1 text-3xl font-semibold">{c.value}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{c.help}</div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <h2 className="text-lg font-semibold">Next actions</h2>
        <ul className="list-disc pl-6 mt-2 text-slate-700 dark:text-slate-300 space-y-1">
          <li>Wire analytics events for KVMs (sign-in, RX view, checkout)</li>
          <li>Connect to backend API via <code>lib/api.ts</code></li>
          <li>Add authentication and role-based gates</li>
        </ul>
      </div>
      </section>
    </ProtectedRoute>
  )
}


// // app/dashboard/page.tsx
// import Link from 'next/link'

// export const metadata = {
//   title: 'Dashboard · CODRX',
// }

// export default function DashboardPage() {
//   // KVM idea: fire "view_dashboard"

//   const cards = [
//     { title: 'Active RX', value: '3', href: '/prescriptions', help: 'Prescriptions on file' },
//     { title: 'Open Orders', value: '2', href: '/orders', help: 'Processing or shipped' },
//     { title: 'Checkout Success (Demo)', value: '97%', href: '#', help: 'Last 7 days (mock)' },
//   ]

//   return (
//     <section className="space-y-6">
//       <header className="space-y-1">
//         <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
//         <p className="text-sm text-slate-600 dark:text-slate-400">
//           Quick status overview and shortcuts.
//         </p>
//       </header>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {cards.map(c => (
//           <Link
//             key={c.title}
//             href={c.href}
//             className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition"
//           >
//             <div className="text-sm text-slate-500 dark:text-slate-400">{c.title}</div>
//             <div className="mt-1 text-3xl font-semibold">{c.value}</div>
//             <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{c.help}</div>
//           </Link>
//         ))}
//       </div>

//       <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
//         <h2 className="text-lg font-semibold">Next actions</h2>
//         <ul className="list-disc pl-6 mt-2 text-slate-700 dark:text-slate-300 space-y-1">
//           <li>Wire analytics events for KVMs (sign-in, RX view, checkout)</li>
//           <li>Connect to backend API via <code>lib/api.ts</code></li>
//           <li>Add authentication and role-based gates</li>
//         </ul>
//       </div>
//     </section>
//   )
// }
