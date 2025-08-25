'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import TitleLayout from '../components/TitleLayout';
import { useSession } from 'next-auth/react';
import CartItem from './CartItem';
import { useCartStore } from '../stores/cartStore';

export default function CartPage() {
  const { data: session } = useSession();
  const { fetchCart, cartItems, addItem, removeItem, updateQuantity } = useCartStore();
  const [loading, setLoading] = useState(true);

  // Load cart from API into Zustand store
  useEffect(() => {
    const loadCart = async () => {
      if (session) {
        console.log("User session found, fetching cart items...");
        await fetchCart();
        console.log("loaded cart items...");
      }
      setLoading(false);
    };
    loadCart();
  }, [session, addItem]);

  // Update quantity
  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      updateQuantity(id, newQuantity); // update in Zustand store
    } catch (err) {
      console.error('Error updating cart item:', err);
    }
  };

  // Remove item
  const handleRemoveItem = async (id: string) => {
    try {
      await fetch(`/api/cart/${id}`, { method: 'DELETE' });
      removeItem(id); // remove from Zustand store
    } catch (err) {
      console.error('Error removing cart item:', err);
    }
  };

  // Totals
  let subtotal = 0, tax = 0, total = 0;
  if (!loading && cartItems.length > 0) {
    subtotal = cartItems.reduce((acc, item) => acc + item.artwork.price * item.quantity, 0);
    tax = subtotal * 0.18;
    total = subtotal + tax;
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold text-custom-paynes-gray mb-2">Please log in</h2>
        <p className="text-custom-silver">You need to sign in to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="font-[Poppins] md:p-12 min-h-screen">
      <TitleLayout title="Your Shopping Cart" quote="" />

      <div className="container mx-auto">
        {loading ? (
          <p className="text-center text-custom-silver">Loading cart...</p>
        ) : cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 p-6 bg-custom-white rounded-xl">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="rounded-xl shadow-lg p-6 bg-custom-white">
                <h2 className="text-2xl font-bold text-custom-paynes-gray mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 text-sm text-custom-paynes-gray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">INR.{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span className="font-semibold">INR.{tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t my-4 pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-custom-paynes-gray">
                      INR.{total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-6 px-6 py-3 rounded-full text-md font-semibold bg-custom-amber text-custom-white hover:scale-105 transition-all">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-custom-antiflash-white rounded-xl shadow-lg">
            <ShoppingCart size={96} className="text-custom-silver mb-6" />
            <h2 className="text-xl md:text-2xl font-bold text-custom-paynes-gray mb-2">
              Your cart is empty
            </h2>
            <p className="text-custom-silver mb-6 text-center">
              Looks like you haven't added any items yet.
            </p>
            <button className="px-6 py-3 rounded-full text-sm font-semibold bg-custom-amber text-custom-white hover:scale-105 transition-all">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
