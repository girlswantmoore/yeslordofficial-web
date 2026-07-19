"use client";

import { useCart } from "../../components/CartContext";
import { products } from "../../data/products";
import { getSalePrice, SALE_PERCENT } from "../../lib/pricing";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const priceFor = (slug: string, fallbackPrice: number) =>
    getSalePrice(
      products.find((product) => product.slug === slug)?.price ?? fallbackPrice
    );

  const originalTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = cart.reduce(
    (sum, item) => sum + priceFor(item.slug, item.price) * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-5xl px-8 py-32">
        <h1 className="mb-12 text-5xl font-bold tracking-[0.25em]">CART</h1>

        {cart.length === 0 ? (
          <div>
            <p className="mb-8 text-gray-400">Your cart is empty.</p>
            <a
              href="/shop"
              className="border border-white px-8 py-4 uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {cart.map((item, index) => (
                <div
                  key={`${item.slug}-${item.color}-${item.size}-${index}`}
                  className="grid gap-6 border-b border-gray-800 pb-8 md:grid-cols-[140px_1fr_auto]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-32 bg-[#111] object-contain"
                  />

                  <div>
                    <h2 className="text-2xl font-semibold">{item.name}</h2>
                    <p className="mt-2 text-gray-400">Color: {item.color}</p>
                    <p className="text-gray-400">Size: {item.size}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>

                    <button
                      onClick={() => removeFromCart(index)}
                      className="mt-4 text-sm uppercase tracking-[0.2em] text-gray-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>

                  <p className="text-right">
                    <span className="block text-sm text-gray-500 line-through">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="block text-xl">
                      ${(priceFor(item.slug, item.price) * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-end gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9FD6CC]">
                  {SALE_PERCENT}% sale applied
                </p>
                <p className="mt-2 text-gray-500 line-through">
                  ${originalTotal.toFixed(2)}
                </p>
                <p className="text-3xl">Total: ${total.toFixed(2)}</p>
              </div>

              <button
                onClick={async () => {
                  const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cart),
                  });

                  const data = await response.json();

                  if (data.url) {
                    window.location.href = data.url;
                  }
                }}
                className="w-full bg-white px-10 py-4 uppercase tracking-[0.3em] text-black transition hover:bg-gray-200 md:w-auto"
              >
                Checkout
              </button>

              <button
                onClick={clearCart}
                className="text-sm uppercase tracking-[0.2em] text-gray-500 hover:text-white"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
