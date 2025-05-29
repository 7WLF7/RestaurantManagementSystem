import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Menu() {
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // cart count from localStorage
  const [cartCount, setCartCount] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    return saved.reduce((sum, item) => sum + item.quantity, 0);
  });

  // popup state
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const categoryRes = await fetch('http://localhost:5049/api/Categorie');
        if (!categoryRes.ok) throw new Error('Eroare la încărcarea categoriilor');
        const categories = await categoryRes.json();

        const validCategories = categories
          .filter(cat => cat?.nume?.trim())
          .map(cat => ({
            originalName: cat.nume.trim(),
            encodedName: encodeURIComponent(cat.nume.trim().toLowerCase())
          }));

        const categoryPromises = validCategories.map(async ({ originalName, encodedName }) => {
          try {
            const res = await fetch(`http://localhost:5049/api/produse/ProduseDupaCategorie/${encodedName}`);
            if (!res.ok) return { category: originalName, products: [] };
            const products = await res.json();
            return { category: originalName, products };
          } catch {
            return { category: originalName, products: [] };
          }
        });

        const results = await Promise.all(categoryPromises);
        const menuStructure = results.reduce((acc, { category, products }) => {
          acc[category] = products || [];
          return acc;
        }, {});
        setMenuData(menuStructure);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex(p => p.id === product.id);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        nume: product.nume,
        descriere: product.descriere,
        pret: product.pret,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const navigateToCart = () => navigate('/cart');

  if (isLoading) return <div className='min-h-screen flex items-center justify-center'>Se încarcă meniul…</div>;
  if (error)      return <div className='min-h-screen text-red-500 flex items-center justify-center'>Eroare: {error}</div>;

  return (
    <div className='overflow-x-hidden min-h-screen h-12 min-w-screen bg-gray-100 text-black'>
      <h1 className='h-12'></h1>

      {/* Logo & Hero */}
      <div className='logo-center my-6'>
        <img src='/images/logo.png' alt='NOVA Logo' className='h-24 mx-auto' />
      </div>
      <section className='text-center mb-8'>
        <h2 className='text-3xl font-bold'>Meniul nostru</h2>
        <p className='text-gray-600 mt-2'>Descoperă preparatele noastre rafinate …</p>
      </section>

      {/* Menu by Category */}
      <div className='px-6 md:px-20'>
        {Object.entries(menuData).map(([categoryName, products]) => (
          <div className='mb-6' key={categoryName}>
            <h3 className='text-xl font-semibold mb-3 border-b pb-1'>{categoryName}</h3>
            <ul className='space-y-4'>
              {products.length > 0 ? products.map((product, i) => (
                <li key={i} className='bg-white p-4 rounded shadow-sm flex justify-between items-center'>
                  <div>
                    <h4 className='font-medium'>{product.nume}</h4>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <span className='text-sm font-semibold'>{product.pret} RON</span>
                    <button
                      onClick={() => addToCart(product)}
                      className='bg-black text-white px-3 py-2 rounded hover:bg-gray-800'
                    >
                      Adaugă în coș
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className='bg-gray-200 text-black px-3 py-2 rounded hover:bg-gray-300'
                    >
                      Detalii
                    </button>
                  </div>
                </li>
              )) : (
                <p className='italic text-gray-400'>Niciun produs disponibil în această categorie.</p>
              )}
            </ul>
          </div>
        ))}
        <button
          onClick={navigateToCart}
          className='bg-black text-white px-4 py-2 rounded'
        >
          Coș ({cartCount})
        </button>
      </div>

{selectedProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
    <div className="relative bg-white text-black p-6 md:p-8 rounded-lg shadow-lg 
                    w-full max-w-xl  max-h-[80vh] overflow-y-auto">
      <button
        onClick={() => setSelectedProduct(null)}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none"
      >
        ×
      </button>
      <h2 className="text-xl font-bold mb-2">{selectedProduct.nume}</h2>
      <p className="text-gray-800 break-words">
        {selectedProduct.descriere}
      </p>
    </div>
  </div>
)}



      {/* Footer */}
      <footer className='text-center py-6 bg-white border-t mt-10'>
        <p>© 2025 NOVA Restaurant. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
}

export default Menu;
