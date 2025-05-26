// src/pages/Basket.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../App.css';

export default function BasketPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('http://localhost:5049/api/Comanda/Toate', {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('Eroare la încărcarea comenzilor');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }
    fetchOrders();
  }, [token]);

  if (orders.length === 0) {
    return <div className="p-8">Nu există comenzi.</div>;
  }

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl">Lista comenzilor</h2>
      {orders.map(order => (
        <div key={order.id} className="flex justify-between p-4 border rounded">
          <div>
            <h3 className="font-semibold">{order.produs.nume}</h3>
            <p>{order.produs.descriere}</p>
          </div>
          <div className="text-right">
            <p>Cantitate: {order.cantitate}</p>
            <p className="font-bold">{(order.produs.pret * order.cantitate).toFixed(2)} RON</p>
          </div>
        </div>
      ))}
    </div>
  );
}
