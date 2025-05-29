import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AddProductForm from '../components/AddProductForm';

export default function EmployeeDashboard() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState([]);
  const [times, setTimes] = useState({});

  // Fetch products (for refreshing after add)
  const fetchProducts = () => {
    fetch('http://localhost:5049/api/produse/get', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setProducts)
      .catch(console.error);
  };
  useEffect(fetchProducts, [token]);

  // Fetch pending orders
  const fetchPending = () => {
    fetch('http://localhost:5049/api/Comanda/toatenefinalizate', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setPending(data);
        // Initialize times for each order
        const initialTimes = data.reduce((acc, order) => {
          acc[order.id] = order.timpEstimativMinute != null ? order.timpEstimativMinute : '';
          return acc;
        }, {});
        setTimes(initialTimes);
      })
      .catch(console.error);
  };
  useEffect(fetchPending, [token]);

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:5049/api/Comanda/${orderId}/status?status=${newStatus}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!res.ok) throw new Error(await res.text());
      fetchPending();
    } catch (err) {
      console.error('Eroare actualizare status:', err);
    }
  };

  // Update estimated time
  const updateTime = async (orderId, time) => {
    try {
      const res = await fetch(
        `http://localhost:5049/api/Comanda/${orderId}/timp?minute=${time}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!res.ok) throw new Error(await res.text());
      fetchPending();
    } catch (err) {
      console.error('Eroare actualizare timp:', err);
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 p-6">
      <h1 className="h-10 text-black text-3xl font-bold mb-6 text-center">
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Orders block */}
        <div className="flex-1 space-y-8">
          {/* Pending orders */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-black text-2xl font-semibold mb-4">Comenzi</h2>
            {pending.length === 0 ? (
              <p className="italic text-gray-500">Nu există comenzi nefinalizate.</p>
            ) : (
              <ul className="space-y-6 max-h-[70vh] overflow-auto">
                {pending.map(order => (
                  <li
                    key={order.id}
                    className="border border-black rounded p-4 bg-white text-black"
                  >
                    <div className="mb-2">
                      <strong>Comandă #{order.id}</strong> — plasată la{' '}
                      {new Date(order.dataPlasare).toLocaleString()}
                    </div>

                    {/* Products and quantities */}
                    <div className="mb-4">
                      {order.produseComanda.map(item => (
                        <div
                          key={item.produsId}
                          className="flex justify-between mb-1"
                        >
                          <span>{item.produs.nume}</span>
                          <span>x {item.cantitate}</span>
                        </div>
                      ))}
                    </div>

                    {/* Update status */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Status
                      </label>
                      <select
                        defaultValue={order.status}
                        onChange={e => updateStatus(order.id, parseInt(e.target.value))}
                        className="border border-gray-300 rounded-md p-2 text-black w-full focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value={0}>Neprocesată</option>
                        <option value={1}>În procesare</option>
                        <option value={2}>Finalizată</option>
                      </select>
                    </div>

                    {/* Update estimated time */}
                    <div className="mb-2">
                      <label className="block text-sm font-medium mb-1">
                        Timp estimativ (minute)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={times[order.id]}
                          onChange={e =>
                            setTimes(prev => ({
                              ...prev,
                              [order.id]: e.target.value
                            }))
                          }
                          className="border border-gray-300 rounded-md p-2 text-black w-full focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button
                          onClick={() => updateTime(order.id, parseInt(times[order.id], 10))}
                          className="bg-black text-white px-4 rounded-md hover:bg-gray-800"
                        >
                          Salvează
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Add Product Form block */}
        <div className="flex-1">
          <AddProductForm onSuccess={fetchProducts} />
        </div>
      </div>
    </div>
  );
}
