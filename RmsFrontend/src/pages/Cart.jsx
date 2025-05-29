// src/pages/Cart.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

export default function CartPage() {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem('cart') || '[]')
  );

  const syncStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
        : item
    );
    syncStorage(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    syncStorage(updated);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.pret || 0) * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cartItems.length === 0) return;
    try {
      const dto = {
        produse: cartItems.map(item => ({
          produsId: item.id,
          cantitate: item.quantity
        }))
      };
      const res = await fetch('http://localhost:5049/api/Comanda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(dto)
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Eroare la plasarea comenzii');
      }
      alert('Comanda plasată cu succes!');
      localStorage.removeItem('cart');
      setCartItems([]);
    } catch (err) {
      console.error(err);
      alert('Nu am putut plasa comanda: ' + err.message);
    }
  };

  if (cartItems.length === 0) {
    return <div className="min-w-screen items-center min-h-screen bg-gray-100 flex justify-center text-black">
      <h1 className=''>Coșul este gol.
        </h1>
        </div>;
  }

return (
  <div className="overflow-x-hidden min-w-screen min-h-screen bg-gray-100 text-black">
    {/* Navbar (reuse your Navbar component if you have one) */}

    <h1 className='h-12'></h1>
    {/* Page Content */}
    <div className="px-6 md:px-20 py-8">
      <h2 className="text-3xl font-bold mb-6">Coșul meu</h2>

      {cartItems.map(item => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-md shadow mb-6 flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.nume}</h3>
            <p className="text-gray-600 mt-1">{item.descriere}</p>
          </div>

          <div className="flex items-center mt-4 md:mt-0 px-4">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="px-3 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
              −
            </button>
            <span className="mx-4 font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="px-3 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <div className="text-right mt-4 md:mt-0">
            <p className="font-bold text-lg">
              {((item.pret || 0) * item.quantity).toFixed(2)} RON
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 text-sm mt-2 block"
            >
              Șterge
            </button>
          </div>
        </div>
      ))}

      <div className="mt-12 bg-white p-6 rounded-md shadow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold">{totalPrice.toFixed(2)} RON</span>
        </div>
        <button
          onClick={placeOrder}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Finalizează comanda
        </button>
      </div>
    </div>
  </div>
);
}
