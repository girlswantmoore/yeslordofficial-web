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

export default function OrderCard({ order }: { order: Order }) {
  const [status, setStatus] = useState("ordered");

  useEffect(() => {
    const savedStatus = localStorage.getItem(`order-status-${order.id}`);
    if (savedStatus) setStatus(savedStatus);
  }, [order.id]);

  function updateStatus(value: string) {
    setStatus(value);
    localStorage.setItem(`order-status-${order.id}`, value);
  }

  function printLabel() {
    const address = order.customer?.address;

    const labelText = `
YES LORD ORDER LABEL

Customer:
${order.customer?.name || ""}
${order.customer?.email || ""}
${order.customer?.phone || ""}

Ship To:
${order.customer?.name || ""}
${address?.line1 || ""}
${address?.line2 || ""}
${address?.city || ""}, ${address?.state || ""} ${address?.postal_code || ""}
${address?.country || ""}

Items:
${order.items.map((item) => `${item.quantity}x ${item.name}`).join("\n")}

Order:
${order.id}
${formatOrderDate(order.created)}
    `;

    const printWindow = window.open("", "_blank");

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Order Label</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 32px;
              color: #000;
            }
            pre {
              white-space: pre-wrap;
              font-size: 16px;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <pre>${labelText}</pre>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
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
          <p>{order.customer?.name}</p>
          <p className="text-gray-400">{order.customer?.email}</p>
          <p className="text-gray-400">{order.customer?.phone}</p>
        </div>

        <div>
          <h2 className="mb-3 font-semibold">Shipping Address</h2>
          <p>{order.customer?.address?.line1}</p>
          <p>{order.customer?.address?.line2}</p>
          <p>
            {order.customer?.address?.city}, {order.customer?.address?.state}{" "}
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

        <button
          onClick={printLabel}
          className="border border-white px-5 py-3 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
        >
          Print Label
        </button>
      </div>

      <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-500">
        Stripe Status: {order.paymentStatus}
      </p>
    </div>
  );
}