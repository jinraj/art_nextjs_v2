// stores/cartStore.ts
import { Artwork, Cart } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItemType = Cart & { artwork: Artwork };

interface CartState {
  cartItems: CartItemType[];
  fetchCart: () => Promise<void>;
  addItem: (item: Artwork) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      // Fetch cart from API immediately
      fetchCart: async () => {
        try {
          console.log("Fetching cart items from API...");
          // Clear local storage first
          localStorage.removeItem("cart-storage");
          console.log("Local storage cleared.");

          const res = await fetch("/api/cart", { method: "GET" });
          if (!res.ok) throw new Error("Failed to fetch cart");
          const data = await res.json();
          console.log("Cart fetched from API.", data);
          set({ cartItems: data || [] });

        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      },

      addItem: async (item) => {
        try {
          console.log("Adding item to cart:", item);
          const res = await fetch("/api/cart/" + item.id, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ artworkId: item.id, quantity: 1 }),
          });
          if (!res.ok) throw new Error("Failed to add item to cart");
          const data = await res.json();
          console.log("Item added to cart:", data);
          set((state) => {
            const existing = state.cartItems.find((i) => i.id === item.id);
            let updatedCart;
            if (existing) {
              updatedCart = state.cartItems.map((i) =>
                i.id === data.id
                  ? { ...i, quantity: i.quantity + data.quantity }
                  : i
              );
            } else {
              updatedCart = [...state.cartItems, data];
            }
            return { cartItems: updatedCart };
          });
        } catch (err) {
          console.error("Error adding item:", err);
        }
      },

      removeItem: async (id) => {
        try {
          const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to remove item to cart");
          set((state) => {
            const updatedCart = state.cartItems.filter((i) => i.id !== id);
            return { cartItems: updatedCart };
          });
        } catch (err) {
          console.error("Error removing item:", err);
        }
      },

      updateQuantity: async (id, quantity) => {
        try {
          const res = await fetch(`/api/cart/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
          });
          if (!res.ok) throw new Error("Failed to update quantity to cart");
          set((state) => {
            const updatedCart = state.cartItems.map((i) =>
              i.id === id ? { ...i, quantity } : i
            );
            return { cartItems: updatedCart };
          });
        } catch (err) {
          console.error("Error updating quantity:", err);
        }
      },

      clearCart: async () => {
        try {
          const res = await fetch("/api/cart", { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to remove item to cart");
          localStorage.removeItem("cart-storage");
          set({ cartItems: [] });
        } catch (err) {
          console.error("Error clearing cart:", err);
        }
      }
    }),
    { name: "cart-storage" } // persist in localStorage
  )
);
