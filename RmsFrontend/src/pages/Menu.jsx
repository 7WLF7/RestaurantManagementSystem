// src/pages/Menu.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Menu() {
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [basketCount, setBasketCount] = useState(0);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // 1️⃣ Fetch categorii
        const categoryRes = await fetch('http://localhost:5049/api/Categorie');
        if (!categoryRes.ok) throw new Error('Eroare la încărcarea categoriilor');
        const categories = await categoryRes.json();

        // 2️⃣ Normalizează și pregătește numele categoriilor
        const validCategories = categories
          .filter(cat => cat && cat.nume && cat.nume.trim())
          .map(cat => ({
            originalName: cat.nume.trim(),
            encodedName: encodeURIComponent(cat.nume.trim().toLowerCase())
          }));

        // 3️⃣ Fetch produse pentru fiecare categorie
        const categoryPromises = validCategories.map(async function(item) {
          var url = 'http://localhost:5049/api/produse/ProduseDupaCategorie/' + item.encodedName;
          try {
            var res = await fetch(url);
            if (!res.ok) {
              console.warn('[' + item.encodedName + '] Răspuns API:', res.status);
              return { category: item.originalName, products: [] };
            }
            var products = await res.json();
            return { category: item.originalName, products: products };
          } catch (err) {
            console.error('[' + item.encodedName + '] Eroare:', err);
            return { category: item.originalName, products: [] };
          }
        });

        // 4️⃣ Construiește structura finală a meniului
        var results = await Promise.all(categoryPromises);
        var menuStructure = {};
        results.forEach(function(result) {
          menuStructure[result.category] = result.products || [];
        });

        setMenuData(menuStructure);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Trimite comanda spre backend și actualizează contorul de coș
  const addToBasket = async function(product) {
  try {
    const dto = {
      produse: [
        {
          produsId: product.id,
          cantitate: 1
        }
      ]
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
      const message = await res.text();
      throw new Error(message || 'Eroare la plasarea comenzii');
    }

    setBasketCount(prev => prev + 1);
  } catch (err) {
    console.error('addToBasket error:', err);
    alert('Nu am putut adăuga produsul în coș: ' + err.message);
  }
};

  const navigateToBasket = function() {
    navigate('/basket');
  };

  if (isLoading) {
    return (
      <div className='min-h-screen min-w-screen flex items-center justify-center'>
        Se încarcă meniul...
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen min-w-screen flex items-center justify-center text-red-500'>
        Eroare: {error}
      </div>
    );
  }

  return (
    <div className='min-h-screen min-w-screen bg-gray-50 text-black'>
      {/* Navbar */}
      <nav className='navbar bg-white shadow-md p-4 flex justify-between items-center'>
        <ul className='flex gap-6'>
          <li><a href='/'>Acasă</a></li>
          <li><a href='#about'>Despre</a></li>
          <li><a href='#contact'>Contact</a></li>
        </ul>
        <button
          className='btn-highlight bg-yellow-500 px-4 py-2 rounded-md'
          onClick={navigateToBasket}
        >
          Coș ({basketCount})
        </button>
      </nav>

      {/* Logo */}
      <div className='logo-center text-center my-6'>
        <img src='/images/logo.png' alt='NOVA Logo' className='mx-auto h-24' />
      </div>

      {/* Hero Section */}
      <section className='text-center mb-8'>
        <h1 className='text-3xl font-bold'>Meniul nostru</h1>
        <p className='text-gray-600 mt-2'>
          Descoperă preparatele noastre rafinate, create cu pasiune și ingrediente de calitate.
        </p>
      </section>

      {/* Menu Items by Category */}
      <div className='menu-categories px-6 md:px-20'>
        {Object.entries(menuData).map(function(entry) {
          var categoryName = entry[0];
          var products = entry[1];
          return (
            <div className='menu-category mb-10' key={categoryName}>
              <h2 className='text-xl font-semibold mb-3 border-b border-gray-300 pb-1'>
                {categoryName}
              </h2>
              <ul className='space-y-4'>
                {products.length > 0 ? (
                  products.map(function(product, index) {
                    return (
                      <li
                        key={categoryName + '-' + index}
                        className='bg-white p-4 rounded-md shadow-sm'
                      >
                        <div className='flex justify-between items-center'>
                          <div>
                            <h3 className='text-lg font-medium'>{product.nume}</h3>
                            <p className='text-sm text-gray-600'>{product.descriere}</p>
                          </div>
                          <button
                            onClick={function() { return addToBasket(product); }}
                            className='ml-4 bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800'
                          >
                            Adaugă în coș
                          </button>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p className='text-gray-400 italic'>
                    Niciun produs disponibil în această categorie.
                  </p>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className='footer text-center py-6 bg-white border-t mt-10'>
        <p>© 2025 NOVA Restaurant. Toate drepturile rezervate.</p>
        <p className='mt-2'>
          <a href='#about' className='text-yellow-600 mr-4'>Despre noi</a>
          <a href='#contact' className='text-yellow-600'>Contact</a>
        </p>
      </footer>
    </div>
  );
}

export default Menu;
