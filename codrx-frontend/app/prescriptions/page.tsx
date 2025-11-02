// app/prescriptions/page.tsx
import ProtectedRoute from '../../components/ProtectedRoute'

type RxStatus = 'NEW' | 'FILLED' | 'SHIPPED'

type Prescription = {
  id: string
  patient: string
  drugName: string
  strength: string
  qty: number
  status: RxStatus
}

const mock: Prescription[] = [
  { id: 'RX-1001', patient: 'Jane D.', drugName: 'Atorvastatin', strength: '20 mg', qty: 30, status: 'FILLED' },
  { id: 'RX-1002', patient: 'Mark P.', drugName: 'Metformin',    strength: '500 mg', qty: 60, status: 'SHIPPED' },
  { id: 'RX-1003', patient: 'Sam K.',  drugName: 'Lisinopril',   strength: '10 mg', qty: 90, status: 'NEW' },
]

function StatusBadge({ s }: { s: RxStatus }) {
  const cls =
    s === 'NEW'
      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      : s === 'FILLED'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
  return <span className={`px-2 py-1 rounded-lg text-xs font-medium ${cls}`}>{s}</span>
}

export const metadata = {
  title: 'Prescriptions · CODRX',
}

export default function PrescriptionsPage() {
  // KVM hook idea: fire “view_prescriptions” here with your analytics later.

  return (
    <ProtectedRoute>
    <section className="space-y-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Prescriptions</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Active prescriptions and their current fulfillment status.
          </p>
        </div>
        {/* Placeholder for future filters/search */}
        <div className="hidden md:flex gap-2">
          <input
            className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
            placeholder="Search (coming soon)"
            readOnly
          />
          <button
            className="rounded-lg px-3 py-2 text-sm bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            disabled
            title="Filter (coming soon)"
          >
            Filter
          </button>
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400">
            <tr>
              <th className="py-3 px-4 text-left">RX #</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Drug</th>
              <th className="py-3 px-4 text-left">Strength</th>
              <th className="py-3 px-4 text-left">Qty</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {mock.map((rx) => (
              <tr key={rx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40">
                <td className="py-3 px-4 font-mono">{rx.id}</td>
                <td className="py-3 px-4">{rx.patient}</td>
                <td className="py-3 px-4">{rx.drugName}</td>
                <td className="py-3 px-4">{rx.strength}</td>
                <td className="py-3 px-4">{rx.qty}</td>
                <td className="py-3 px-4"><StatusBadge s={rx.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Demo data only. We&apos;ll fetch later other data from the Django API via a small client in <code>lib/api.ts</code>.
      </p>
    </section>
    </ProtectedRoute>
  )
}
