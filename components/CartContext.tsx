"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("yeslord-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("yeslord-cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(item: CartItem) {
    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.slug === item.slug &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingIndex !== -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingIndex].quantity += item.quantity;
        return updatedCart;
      }

      return [...currentCart, item];
    });
  }

  function removeFromCart(index: number) {
    setCart((currentCart) => currentCart.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}