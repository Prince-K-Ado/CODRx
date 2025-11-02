// app/orders/page.tsx
import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'

type OrderStatus = 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

type Order = {
  id: string
  placedOn: string // ISO string or human text; keep static to avoid hydration issues
  items: number
  totalUSD: string
  status: OrderStatus
  tracking?: string
}

const orders: Order[] = [
  { id: 'ORD-24001', placedOn: '2025-10-15', items: 2, totalUSD: '$84.70', status: 'PROCESSING' },
  { id: 'ORD-24002', placedOn: '2025-10-13', items: 1, totalUSD: '$19.99', status: 'SHIPPED', tracking: 'CB-123456' },
  { id: 'ORD-24003', placedOn: '2025-10-01', items: 3, totalUSD: '$142.35', status: 'DELIVERED', tracking: 'CB-123120' },
]

function Status({ s }: { s: OrderStatus }) {
  const cls =
    s === 'PROCESSING'
      ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300'
      : s === 'SHIPPED'
      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300'
      : s === 'DELIVERED'
      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300'
      : 'bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-300'
  return <span className={`px-2 py-1 rounded-lg text-xs font-medium ${cls}`}>{s}</span>
}

export const metadata = {
  title: 'Orders · CODRX',
}

export default function OrdersPage() {
  // KVM idea: fire "view_orders" here later.

  return (
    <ProtectedRoute>
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Track cross-border shipments and fulfillment status.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400">
            <tr>
              <th className="py-3 px-4 text-left">Order #</th>
              <th className="py-3 px-4 text-left">Placed</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Tracking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40">
                <td className="py-3 px-4 font-mono">{o.id}</td>
                <td className="py-3 px-4">{o.placedOn}</td>
                <td className="py-3 px-4">{o.items}</td>
                <td className="py-3 px-4">{o.totalUSD}</td>
                <td className="py-3 px-4"><Status s={o.status} /></td>
                <td className="py-3 px-4">
                  {o.tracking ? (
                    <Link href="#" className="underline">#{o.tracking}</Link>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Demo data. We’ll replace with real tracking info from the backend API.
      </p>
    </section>
    </ProtectedRoute>
  )
}
