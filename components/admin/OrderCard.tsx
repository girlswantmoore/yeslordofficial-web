"use client";

import { useEffect, useState } from "react";
import type { Order } from "../../app/admin/page";

function formatOrderDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function OrderCard({
  order,
  password,
}: {
  order: Order;
  password: string;
}) {
  const [status, setStatus] = useState("ordered");
  const [buyingLabel, setBuyingLabel] = useState(false);
  const [labelUrl, setLabelUrl] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    const savedStatus = localStorage.getItem(`order-status-${order.id}`);
    const savedLabelUrl = localStorage.getItem(`order-label-${order.id}`);
    const savedTracking = localStorage.getItem(`order-tracking-${order.id}`);

    if (savedStatus) setStatus(savedStatus);
    if (savedLabelUrl) setLabelUrl(savedLabelUrl);
    if (savedTracking) setTrackingNumber(savedTracking);
  }, [order.id]);

  function updateStatus(value: string) {
    setStatus(value);
    localStorage.setItem(`order-status-${order.id}`, value);
  }

  async function buyShippingLabel() {
    setBuyingLabel(true);

    const response = await fetch("/api/admin/buy-label", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, order }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Could not buy shipping label.");
      setBuyingLabel(false);
      return;
    }

    setLabelUrl(data.labelUrl);
    setTrackingNumber(data.trackingNumber);

    localStorage.setItem(`order-label-${order.id}`, data.labelUrl);
    localStorage.setItem(`order-tracking-${order.id}`, data.trackingNumber);

    updateStatus("shipped");

    window.open(data.labelUrl, "_blank");

    setBuyingLabel(false);
  }

  const threeDays = 3 * 24 * 60 * 60 * 1000;

  const isPendingTooLong =
    status === "pending" && Date.now() - order.created * 1000 > threeDays;

  return (
    <div
      className={`rounded-xl border p-6 ${
        isPendingTooLong
          ? "border-red-500 bg-red-950/30"
          : "border-zinc-800 bg-zinc-950"
      }`}
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

          {isPendingTooLong && (
            <p className="mt-3 font-semibold text-red-400">
              Pending for over 3 days
            </p>
          )}
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
<p>{order.customer?.name || order.shipping?.name || "No name"}</p>
<p className="text-gray-400">{order.customer?.email || "No email"}</p>
<p className="text-gray-400">{order.customer?.phone || "No phone"}</p>        </div>

        <div>
          <h2 className="mb-3 font-semibold">Shipping Address</h2>
{(() => {
  const address = order.shipping?.address || order.customer?.address;

  if (!address) {
    return <p className="text-gray-500">No address found</p>;
  }

  return (
    <>
      <p>{address.line1}</p>
      {address.line2 && <p>{address.line2}</p>}
      <p>
        {address.city}, {address.state} {address.postal_code}
      </p>
      <p>{address.country}</p>
    </>
  );
})()}        </div>

        <div>
          <h2 className="mb-3 font-semibold">Items</h2>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="text-gray-300">
                <p>{item.quantity}× {item.name}</p>
                {(item.color || item.size) && (
                  <p className="text-sm text-gray-500">
                    {item.color && `Color: ${item.color}`}
                    {item.color && item.size && " · "}
                    {item.size && `Size: ${item.size}`}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {trackingNumber && (
        <div className="mt-6 rounded-lg border border-zinc-800 bg-black p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Tracking Number
          </p>
          <p className="mt-2 text-[#9FD6CC]">{trackingNumber}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">
            Order Status
          </p>

          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            className="border border-zinc-700 bg-black px-4 py-3 text-white outline-none"
          >
            <option value="ordered">Ordered</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          {labelUrl && (
            <a
              href={labelUrl}
              target="_blank"
              className="border border-white px-5 py-3 text-center text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
            >
              Print Label
            </a>
          )}

          <button
            onClick={buyShippingLabel}
            disabled={buyingLabel || !!labelUrl}
            className={`border px-5 py-3 text-sm uppercase tracking-[0.2em] transition ${
              buyingLabel || labelUrl
                ? "cursor-not-allowed border-zinc-700 text-zinc-600"
                : "border-[#9FD6CC] text-[#9FD6CC] hover:bg-[#9FD6CC] hover:text-black"
            }`}
          >
            {labelUrl
              ? "Label Purchased"
              : buyingLabel
              ? "Buying Label..."
              : "Buy Shipping Label"}
          </button>
        </div>
      </div>

      <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-500">
        Stripe Status: {order.paymentStatus}
      </p>
    </div>
  );
}
