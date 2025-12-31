// components/cart/cart-provider.jsx
'use client';

import React from 'react';

const CartContext = React.createContext(null);

export function CartProvider({ children }) {
  const [count, setCount] = React.useState(0);

  // Keep it simple: persist badge count locally as a placeholder
  React.useEffect(() => {
    try {
      const saved = Number(localStorage.getItem('sc_cart_count') || '0');
      if (!Number.isNaN(saved)) setCount(saved);
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem('sc_cart_count', String(count));
    } catch {}
  }, [count]);

  const value = React.useMemo(
    () => ({
      count,
      setCount,
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => Math.max(0, c - 1)),
      reset: () => setCount(0),
    }),
    [count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
