import type { Order } from "../../app/admin/page";

export default function SalesAnalytics({ orders }: { orders: Order[] }) {
  const revenue = orders.reduce((sum, order) => sum + (order.amountTotal || 0), 0);
  const itemMap = new Map<string, { units: number; revenue: number }>();
  const variantMap = new Map<string, number>();

  for (const order of orders) {
    for (const item of order.items) {
      const current = itemMap.get(item.name) || { units: 0, revenue: 0 };
      current.units += item.quantity || 0;
      current.revenue += item.amount || 0;
      itemMap.set(item.name, current);
      const variant = [item.name, item.color, item.size].filter(Boolean).join(" · ");
      variantMap.set(variant, (variantMap.get(variant) || 0) + (item.quantity || 0));
    }
  }

  const products = [...itemMap.entries()].sort((a, b) => b[1].units - a[1].units);
  const variants = [...variantMap.entries()].sort((a, b) => b[1] - a[1]);
  const units = products.reduce((sum, [, item]) => sum + item.units, 0);

  return (
    <div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Gross sales", `$${(revenue / 100).toFixed(2)}`],
          ["Paid orders", orders.length],
          ["Items sold", units],
          ["Average order", `$${orders.length ? (revenue / orders.length / 100).toFixed(2) : "0.00"}`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</p>
            <p className="mt-3 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-5 text-lg font-semibold">Top-selling products</h2>
          <div className="divide-y divide-zinc-800">
            {products.map(([name, item], index) => (
              <div key={name} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-4">
                <span className="text-zinc-600">{index + 1}</span>
                <div><p>{name}</p><p className="text-xs text-zinc-500">${(item.revenue / 100).toFixed(2)} revenue</p></div>
                <span className="font-semibold">{item.units} sold</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-5 text-lg font-semibold">Top variants</h2>
          <div className="divide-y divide-zinc-800">
            {variants.slice(0, 10).map(([name, count], index) => (
              <div key={name} className="flex items-center justify-between gap-5 py-4">
                <p className="text-sm"><span className="mr-3 text-zinc-600">{index + 1}</span>{name}</p>
                <span className="shrink-0 font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
