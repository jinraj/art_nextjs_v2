// stores/cartStore.ts
import { Cart } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartItems: Cart[];
  fetchCart: () => Promise<void>;
  addItem: (item: Cart) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      // Fetch cart from API immediately
      fetchCart: async () => {
        try {
          // Clear local storage first
          localStorage.removeItem("cart-storage");

          const res = await fetch("/api/cart", { method: "GET" });
          if (!res.ok) throw new Error("Failed to fetch cart");
          const data = await res.json();

          // Update store with new data
          set({ cartItems: data });
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      },

      addItem: async (item) => {
        try {
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });

          set((state) => {
            const existing = state.cartItems.find((i) => i.id === item.id);
            if (existing) {
              return {
                cartItems: state.cartItems.map((i) =>
                  i.id === item.id
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
                ),
              };
            }
            return { cartItems: [...state.cartItems, item] };
          });
        } catch (err) {
          console.error("Error adding item:", err);
        }
      },

      removeItem: async (id) => {
        try {
          await fetch(`/api/cart/${id}`, { method: "DELETE" });
          set((state) => ({
            cartItems: state.cartItems.filter((i) => i.id !== id),
          }));
        } catch (err) {
          console.error("Error removing item:", err);
        }
      },

      updateQuantity: async (id, quantity) => {
        try {
          await fetch(`/api/cart/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
          });
          set((state) => ({
            cartItems: state.cartItems.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          }));
        } catch (err) {
          console.error("Error updating quantity:", err);
        }
      },

      clearCart: async () => {
        try {
          await fetch("/api/cart", { method: "DELETE" });
          set({ cartItems: [] });
          localStorage.removeItem("cart-storage"); // ensure persisted data is cleared
        } catch (err) {
          console.error("Error clearing cart:", err);
        }
      },

      getCount: () =>
        get().cartItems.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: "cart-storage" } // persist in localStorage
  )
);
