"use client";

import { useState } from "react";

type Order = {
  id: string;
  created: number;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  customer: any;
  shippingCost: any;
  items: {
    name: string;
    quantity: number;
    amount: number;
  }[];
};

function formatOrderDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadOrders() {
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError("Wrong password.");
      setLoading(false);
      return;
    }

    setOrders(data.orders);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="mb-10 text-5xl font-bold">Yes Lord Admin</h1>

        {orders.length === 0 && (
          <div className="max-w-md">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-white"
            />

            <button
              onClick={loadOrders}
              className="w-full bg-white px-8 py-4 font-semibold uppercase tracking-[0.25em] text-black"
            >
              {loading ? "Loading..." : "View Orders"}
            </button>

            {error && <p className="mt-4 text-red-400">{error}</p>}
          </div>
        )}

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                    Order
                  </p>
                  <p className="mt-1 text-lg">{order.id}</p>
                  <p className="mt-2 text-sm text-gray-400">
                    {formatOrderDate(order.created)}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                    Total
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    ${(order.amountTotal / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h2 className="mb-3 font-semibold">Customer</h2>
                  <p>{order.customer?.name}</p>
                  <p className="text-gray-400">{order.customer?.email}</p>
                  <p className="text-gray-400">{order.customer?.phone}</p>
                </div>

                <div>
                  <h2 className="mb-3 font-semibold">Shipping Address</h2>
                  <p>{order.customer?.address?.line1}</p>
                  <p>{order.customer?.address?.line2}</p>
                  <p>
                    {order.customer?.address?.city},{" "}
                    {order.customer?.address?.state}{" "}
                    {order.customer?.address?.postal_code}
                  </p>
                  <p>{order.customer?.address?.country}</p>
                </div>

                <div>
                  <h2 className="mb-3 font-semibold">Items</h2>
                  {order.items.map((item, index) => (
                    <p key={index} className="text-gray-300">
                      {item.quantity}× {item.name}
                    </p>
                  ))}
                </div>
              </div>

              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-500">
                Status: {order.paymentStatus}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}