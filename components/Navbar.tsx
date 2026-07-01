"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <div className="fixed left-0 top-0 z-[60] w-full bg-white py-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-black">
  Free shipping on orders $100+
</div>
      <nav className="fixed left-0 top-8 z-50 w-full bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white md:px-8 md:py-6">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-3xl md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

<a href="/">
  <img
    src="/logo.png"
    alt="Yes Lord"
    className="h-10 w-auto"
  />
</a>
          <div className="hidden gap-8 text-sm uppercase tracking-[0.2em] md:flex">
            <a href="/#shop" className="hover:text-gray-300">
              Shop
            </a>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
            <a href="/cart" className="hover:text-gray-300">
              Cart {cartCount > 0 && `(${cartCount})`}
            </a>
          </div>

          <a href="/cart" className="text-sm uppercase tracking-[0.2em] md:hidden">
            Cart {cartCount > 0 && `(${cartCount})`}
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black text-white md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <a
              href="/"
              className="text-lg font-semibold uppercase tracking-[0.3em]"
            >
              YES LORD
            </a>

            <button
              onClick={() => setMenuOpen(false)}
              className="text-4xl"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col gap-8 px-8 pt-20 text-3xl uppercase tracking-[0.25em]">
            <a href="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </a>
            <a href="/about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <a href="/cart" onClick={() => setMenuOpen(false)}>
              Cart {cartCount > 0 && `(${cartCount})`}
            </a>
          </div>
        </div>
      )}
    </>
  );
}