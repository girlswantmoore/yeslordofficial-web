"use client";

import { useEffect } from "react";
import { useCart } from "../../components/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-8 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-gray-500">
          Order Confirmed
        </p>

        <h1 className="mb-8 text-5xl font-bold md:text-7xl">Thank You</h1>

        <p className="text-lg leading-8 text-gray-300">
          Your order was received. You’ll get an email confirmation from Stripe
          with your purchase details.
        </p>

        <a
          href="/shop"
          className="mt-12 border border-white px-10 py-4 uppercase tracking-[0.3em] transition hover:bg-white hover:text-black"
        >
          Continue Shopping
        </a>
      </section>
    </main>
  );
}