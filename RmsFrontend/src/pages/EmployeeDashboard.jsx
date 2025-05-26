// pages/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function EmployeeDashboard() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProd, setNewProd] = useState({ name: '', description: '', cantitateStoc: 0 });

  // Fetch all products
  useEffect(() => {
    fetch('http://localhost:5049/api/produse/get', {
      headers: { Authorization: 'Bearer ${token}' }
    })
      .then(r => r.json())
      .then(setProducts);
  }, [token]);

  const addProduct = async () => {
    await fetch('http://localhost:5049/api/produse/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ${token}'
      },
      body: JSON.stringify(newProd)
    });
    // refetch
    setNewProd({ name: '', description: '', cantitateStoc: 0 });
    const r = await fetch('http://localhost:5049/api/produse/get', { headers:{ Authorization:'Bearer ${token}' } });
    setProducts(await r.json());
  };

  const updateStock = async (id, amount) => {
    // you’ll need a backend PUT endpoint like /api/produse/{id}/stock
    await fetch('http://localhost:5049/api/produse/${id}/stock?quantity=${amount}', {
      method: 'PUT',
      headers: { Authorization: 'Bearer ${token}' }
    });
    setProducts(ps =>
      ps.map(p => (p.id === id ? { ...p, cantitateStoc: amount } : p))
    );
  };

  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-xl mb-2">Adaugă produs nou</h2>
        <div className="flex gap-2">
          <input
            placeholder="Nume"
            value={newProd.name}
            onChange={e => setNewProd({ ...newProd, name: e.target.value })}
            className="border p-2"
          />
          <input
            placeholder="Descriere"
            value={newProd.description}
            onChange={e => setNewProd({ ...newProd, description: e.target.value })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Stoc"
            value={newProd.cantitateStoc}
            onChange={e => setNewProd({ ...newProd, cantitateStoc: +e.target.value })}
            className="border p-2 w-20"
          />
          <button onClick={addProduct} className="bg-black text-white px-4">
            Adaugă
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-2">Inventar</h2>
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-4 mb-2">
            <span className="flex-1">{p.nume}</span>
            <input
              type="number"
              value={p.cantitateStoc}
              onChange={e => updateStock(p.id, +e.target.value)}
              className="border p-1 w-20"
            />
          </div>
        ))}
      </section>
    </div>
  );
}
