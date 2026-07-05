"use client";

import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import DashboardCards from "../../components/admin/DashboardCards";
import FilterBar from "../../components/admin/FilterBar";
import OrderCard from "../../components/admin/OrderCard";
import SearchBar from "../../components/admin/SearchBar";

export type Order = {
  id: string;
  created: number;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  customer: any;
  shipping: any;
  shippingCost: any;
  items: {
    name: string;
    quantity: number;
    amount: number;
  }[];
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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

  const filteredOrders = orders.filter((order) => {
    const date = new Date(order.created * 1000);
    const now = new Date();

    const matchesSearch =
      order.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "all") return true;
    if (filter === "today") return date.toDateString() === now.toDateString();
    if (filter === "this-month")
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    if (filter === "this-year")
      return date.getFullYear() === now.getFullYear();

    if (filter.startsWith("q")) {
      const quarter = Number(filter.replace("q", ""));
      const orderQuarter = Math.floor(date.getMonth() / 3) + 1;
      return (
        orderQuarter === quarter &&
        date.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <section className="mx-auto max-w-6xl">
        <AdminHeader />

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

        {orders.length > 0 && (
          <>
            <DashboardCards orders={filteredOrders} />
            <FilterBar filter={filter} setFilter={setFilter} />
            <SearchBar search={search} setSearch={setSearch} />

            <div className="space-y-8">
              {filteredOrders.map((order) => (
  <OrderCard key={order.id} order={order} password={password} />              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}