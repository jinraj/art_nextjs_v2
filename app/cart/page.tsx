'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import TitleLayout from '../components/TitleLayout';

const initialCartItems = [
    {
      id: 1,
      name: 'The Ocean Abstraction',
      artist: 'Alex Chen',
      price: 75000,
      image: '/resources/artworks/paintings/0db4ec40387045d7b3fb6caa2b32ac3a.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Vibrant Cityscape',
      artist: 'Maria Rodriguez',
      price: 52000,
      image: '/resources/artworks/paintings/image3_1.jpg',
      quantity: 2,
    },
    {
      id: 3,
      name: 'Geometric Sunset',
      artist: 'John Doe',
      price: 35000,
      image: '/resources/artworks/photography/photo7_1.jpg',
      quantity: 1,
    },
  ];


// Define the type for cart item
interface CartItemType {
  id: number;
  name: string;
  artist: string;
  price: number;
  image: string;
  quantity: number;
}

// Props for CartItem component
interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

// Reusable cart item component
const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const [formattedPrice, setFormattedPrice] = useState<string>(item.price.toString());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFormattedPrice(item.price.toLocaleString('en-IN'));
    }
  }, [item.price]);

  return (
    <div className="flex flex-col md:flex-row items-center border-b border-[var(--custom-silver)] py-6">
      {/* Item Image */}
      <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={70}
          height={120}
          className="w-full h-90 md:h-48 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Item Details and Controls */}
      <div className="flex-1 w-full md:w-auto">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm text-custom-paynes-gray">{item.name}</h3>
            <p className="text-xs text-custom-silver">by {item.artist}</p>
          </div>
          <div className="text-md font-semibold text-custom-paynes-gray">
            INR.{formattedPrice}
          </div>
        </div>

        {/* Quantity Controls and Remove Button */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 border border-[var(--custom-silver)] rounded-full px-2 py-1">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="text-custom-silver hover:text-custom-paynes-gray focus:outline-none disabled:opacity-50"
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm font-semibold text-custom-paynes-gray w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="text-custom-silver hover:text-custom-paynes-gray focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CartPage() {
  // Cart items state
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);

  // Handle quantity update
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.18;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const [formattedTotals, setFormattedTotals] = useState({
    subtotal: subtotal.toString(),
    tax: tax.toString(),
    total: total.toString(),
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFormattedTotals({
        subtotal: subtotal.toLocaleString(),
        tax: tax.toLocaleString(),
        total: total.toLocaleString(),
      });
    }
  }, [subtotal, tax, total]);

  return (
    <div className="font-[Poppins] p-4 md:p-12 min-h-screen">
      <TitleLayout title="Your Shopping Cart" quote="" />

      <div className="container mx-auto">
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="rounded-xl overflow-hidden p-6 bg-custom-white">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="rounded-xl overflow-hidden shadow-lg p-6 bg-custom-white">
                <h2 className="text-2xl font-bold text-custom-paynes-gray mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 text-sm md:text-sm text-custom-paynes-gray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">INR.{formattedTotals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span className="font-semibold">INR.{formattedTotals.tax}</span>
                  </div>
                  <div className="border-t border-[var(--custom-silver)] my-4 pt-4 flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-custom-paynes-gray">INR.{formattedTotals.total}</span>
                  </div>
                </div>
                <button
                  className="w-full mt-6 px-6 py-3 rounded-full text-md font-semibold bg-custom-amber text-custom-white transition-all duration-300 transform hover:scale-105"
                  style={{ boxShadow: `0 4px 6px -1px var(--custom-silver)` }}
                >
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
            <button
              className="px-6 py-3 rounded-full text-sm font-semibold bg-custom-amber text-custom-white transition-all duration-300 transform hover:scale-105"
              style={{ boxShadow: `0 4px 6px -1px var(--custom-silver)` }}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
