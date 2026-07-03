import type { Order } from "../../app/admin/page";

export default function DashboardCards({ orders }: { orders: Order[] }) {
  const revenue = orders.reduce(
    (total, order) => total + (order.amountTotal || 0),
    0
  );

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Orders
        </p>
        <p className="mt-3 text-3xl font-bold">{orders.length}</p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Revenue
        </p>
        <p className="mt-3 text-3xl font-bold">
          ${(revenue / 100).toFixed(2)}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Average Order
        </p>
        <p className="mt-3 text-3xl font-bold">
          ${orders.length ? (revenue / orders.length / 100).toFixed(2) : "0.00"}
        </p>
      </div>
    </div>
  );
}