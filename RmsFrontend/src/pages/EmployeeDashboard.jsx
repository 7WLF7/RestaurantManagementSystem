import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function EmployeeDashboard() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // Stocăm comenzile nefinalizate
  const [newProd, setNewProd] = useState({
    categorieNume: '',
    name: '',
    description: '',
    pret: '',
    cantitateStoc: ''
  });

  // Fetch all products
  useEffect(() => {
    fetch('http://localhost:5049/api/produse/get', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setProducts);
  }, [token]);

  // Fetch all incomplete orders
  useEffect(() => {
    fetch('http://localhost:5049/api/Comanda/toatenefinalizate', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setOrders);
  }, [token]);

  const addProduct = async () => {
    const formattedProd = {
      ...newProd,
      pret: parseFloat(newProd.pret),
      cantitateStoc: parseInt(newProd.cantitateStoc)
    };

    const response = await fetch('http://localhost:5049/api/produse/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formattedProd)
    });

    if (!response.ok) {
      console.error("Eroare la adăugarea produsului!");
      return;
    }

    setNewProd({
      categorieNume: '',
      name: '',
      description: '',
      pret: '',
      cantitateStoc: ''
    });

    const r = await fetch('http://localhost:5049/api/produse/get', { headers:{ Authorization:`Bearer ${token}` } });
    setProducts(await r.json());
  };

  return (
    <div className="p-8 space-y-8">
      {/* Afișare comenzi nefinalizate - mutată deasupra secțiunii de adăugare produse */}
      <section>
        <h2 className="text-xl mb-2">Comenzi Nefinalizate</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 italic">Nu există comenzi nefinalizate.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.id} className="border p-2 mb-2">
                <strong>ID Comandă:</strong> {order.id} <br />
                <strong>Client:</strong> {order.clientNume} <br />
                <strong>Produse:</strong> {order.produse.map(p => p.nume).join(', ')}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Adăugare produs nou */}
      <section>
        <h2 className="text-xl mb-2">Adaugă produs nou</h2>
        <div className="flex flex-col gap-4">
          <label>
            Categorie:
            <input
              type="text"
              value={newProd.categorieNume}
              onChange={e => setNewProd({ ...newProd, categorieNume: e.target.value })}
              className="border p-2 w-full"
            />
          </label>
          <label>
            Nume:
            <input
              type="text"
              value={newProd.name}
              onChange={e => setNewProd({ ...newProd, name: e.target.value })}
              className="border p-2 w-full"
            />
          </label>
          <label>
            Descriere:
            <input
              type="text"
              value={newProd.description}
              onChange={e => setNewProd({ ...newProd, description: e.target.value })}
              className="border p-2 w-full"
            />
          </label>
          <label>
            Preț (decimal):
            <input
              type="text"
              placeholder="Ex: 99.99"
              value={newProd.pret}
              onChange={e => setNewProd({ ...newProd, pret: e.target.value })}
              className="border p-2 w-full"
            />
          </label>
          <label>
            Cantitate stoc (număr întreg):
            <input
              type="text"
              placeholder="Ex: 10"
              value={newProd.cantitateStoc}
              onChange={e => setNewProd({ ...newProd, cantitateStoc: e.target.value })}
              className="border p-2 w-full"
            />
          </label>
          <button onClick={addProduct} className="bg-black text-white px-4">
            Adaugă
          </button>
        </div>
      </section>

      {/* Inventar produse */}
      <section>
        <h2 className="text-xl mb-2">Inventar</h2>
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-4 mb-2">
            <span className="flex-1">{p.nume}</span>
            <input
              type="number"
              value={p.cantitateStoc}
              className="border p-1 w-20"
            />
          </div>
        ))}
      </section>
    </div>
  );
}
