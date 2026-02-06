import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/data/products";
import type { CartItem } from "@/services/api";

interface User {
  steamId: string;
  name: string;
}

interface StoreContextType {
  user: User | null;
  cart: CartItem[];
  balance: number;
  walletOpen: boolean;
  loginWithSteam: () => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openWallet: () => void;
  closeWallet: () => void;
  addBalance: (amount: number) => void;
  deductBalance: (amount: number) => boolean;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [balance, setBalance] = useState(0);
  const [walletOpen, setWalletOpen] = useState(false);

  const loginWithSteam = useCallback(() => {
    setUser({ steamId: "76561198012345678", name: "Survivor" });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCart([]);
    setBalance(0);
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          command: product.command,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openWallet = useCallback(() => setWalletOpen(true), []);
  const closeWallet = useCallback(() => setWalletOpen(false), []);

  const addBalance = useCallback((amount: number) => {
    setBalance((prev) => prev + amount);
  }, []);

  const deductBalance = useCallback((amount: number): boolean => {
    let success = false;
    setBalance((prev) => {
      if (prev >= amount) {
        success = true;
        return prev - amount;
      }
      return prev;
    });
    return success;
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        user,
        cart,
        balance,
        walletOpen,
        loginWithSteam,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openWallet,
        closeWallet,
        addBalance,
        deductBalance,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
