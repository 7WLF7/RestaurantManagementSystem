// src/pages/Basket.jsx
import React from 'react';
import { useBasket } from '../context/BasketContext';

export default function BasketPage() {
  const { cartItems, setCartItems } = useBasket();

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <div className="p-8">Coșul este gol.</div>;
  }

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl">Coș de cumpărături</h2>
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between p-4 border rounded">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="px-2 py-1 border"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="px-2 py-1 border"
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span>{(item.price * item.quantity).toFixed(2)} RON</span>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500"
            >
              Șterge
            </button>
          </div>
        </div>
      ))}
      <div className="text-right font-bold">
        Total: {totalPrice.toFixed(2)} RON
      </div>
      <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
        Checkout
      </button>
    </div>
  );
}