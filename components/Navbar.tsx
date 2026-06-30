"use client";

import { useCart } from "./CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6 text-white">
        <a href="/" className="text-xl font-semibold uppercase tracking-[0.35em]">
          YES LORD
        </a>

        <div className="flex gap-8 text-sm uppercase tracking-[0.2em]">
          <a href="/shop" className="hover:text-gray-300">Shop</a>
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/contact" className="hover:text-gray-300">Contact</a>
          <a href="/cart" className="hover:text-gray-300">
            Cart {cartCount > 0 && `(${cartCount})`}
          </a>
        </div>
      </div>
    </nav>
  );
}