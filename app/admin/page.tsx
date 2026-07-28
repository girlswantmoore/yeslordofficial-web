"use client";

import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminNav, { type AdminTab } from "../../components/admin/AdminNav";
import DashboardCards from "../../components/admin/DashboardCards";
import EngagementAnalytics from "../../components/admin/EngagementAnalytics";
import FilterBar from "../../components/admin/FilterBar";
import OrderCard from "../../components/admin/OrderCard";
import SalesAnalytics from "../../components/admin/SalesAnalytics";
import SearchBar from "../../components/admin/SearchBar";
import type { AnalyticsEvent } from "../../lib/analytics";

export type Order = {
  id: string;
  created: number;
  amountTotal: number;
  currency: string;
  paymentStatus: string;
  customer: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: Address | null;
  } | null;
  shipping: { name?: string | null; address?: Address | null } | null;
  shippingCost: unknown;
  items: {
    name: string;
    quantity: number;
    amount: number;
    color: string | null;
    size: string | null;
  }[];
};

type Address = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [storage, setStorage] = useState<"redis" | "local">("local");
  const [activeTab, setActiveTab] = useState<AdminTab>("orders");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const request = (url: string) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
      const [ordersResponse, analyticsResponse] = await Promise.all([
        request("/api/admin/orders"),
        request("/api/admin/analytics"),
      ]);

      if (!ordersResponse.ok || !analyticsResponse.ok) {
        throw new Error("UNAUTHORIZED");
      }

      const [orderData, analyticsData] = await Promise.all([
        ordersResponse.json(),
        analyticsResponse.json(),
      ]);
      setOrders(orderData.orders);
      setEvents(analyticsData.events);
      setStorage(analyticsData.storage);
      setAuthenticated(true);
    } catch {
      setError("Unable to sign in. Check the admin password and try again.");
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = orders.filter((order) => {
    const date = new Date(order.created * 1000);
    const now = new Date();
    const needle = search.toLowerCase();
    const matchesSearch =
      order.customer?.name?.toLowerCase().includes(needle) ||
      order.customer?.email?.toLowerCase().includes(needle) ||
      order.id.toLowerCase().includes(needle);

    if (!matchesSearch) return false;
    if (filter === "all") return true;
    if (filter === "today") return date.toDateString() === now.toDateString();
    if (filter === "this-month")
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (filter === "this-year") return date.getFullYear() === now.getFullYear();
    if (filter.startsWith("q")) {
      return Math.floor(date.getMonth() / 3) + 1 === Number(filter.slice(1)) &&
        date.getFullYear() === now.getFullYear();
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <section className="mx-auto max-w-6xl">
        <AdminHeader />

        {!authenticated ? (
          <div className="max-w-md">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && loadDashboard()}
              className="mb-4 w-full border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-white"
            />
            <button
              onClick={loadDashboard}
              disabled={loading || !password}
              className="w-full bg-white px-8 py-4 font-semibold uppercase tracking-[0.25em] text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Loading..." : "Open dashboard"}
            </button>
            {error && <p className="mt-4 text-red-400">{error}</p>}
          </div>
        ) : (
          <>
            <AdminNav active={activeTab} onChange={setActiveTab} />

            {activeTab === "orders" && (
              <>
                <DashboardCards orders={filteredOrders} />
                <FilterBar filter={filter} setFilter={setFilter} />
                <SearchBar search={search} setSearch={setSearch} />
                <div className="space-y-8">
                  {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} password={password} />
                  ))}
                  {filteredOrders.length === 0 && (
                    <p className="border border-zinc-800 p-8 text-center text-zinc-500">No matching orders.</p>
                  )}
                </div>
              </>
            )}
            {activeTab === "engagement" && <EngagementAnalytics events={events} storage={storage} />}
            {activeTab === "sales" && <SalesAnalytics orders={filteredOrders} />}
          </>
        )}
      </section>
    </main>
  );
}
