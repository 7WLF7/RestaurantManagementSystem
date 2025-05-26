import React, { useState, useEffect } from 'react';
import '../App.css';

function Menu() {
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // 1️⃣ Fetch categorii
        const categoryRes = await fetch('http://localhost:5049/api/Categorie');
        if (!categoryRes.ok) throw new Error('Eroare la încărcarea categoriilor');
        const categories = await categoryRes.json();
        
        // 2️⃣ Normalizează numele categoriilor
        const validCategories = categories
          .filter(cat => cat?.nume?.trim())
          .map(cat => ({
            originalName: cat.nume,
            encodedName: encodeURIComponent(cat.nume.trim().toLowerCase())
          }));

        // 3️⃣ Fetch produse pentru fiecare categorie
        const categoryPromises = validCategories.map(async ({ originalName, encodedName }) => {
          try {
            const res = await fetch(`http://localhost:5049/api/Categorie/ProduseDupaCategorie/${encodedName}`);
            
            if (!res.ok) {
              console.warn(`[${encodedName}] Răspuns API:`, res.status);
              return { category: originalName, products: ["Nicio opțiune momentan"] };
            }

            const products = await res.json();
            console.log("Date primite de la API:", data);
            console.log(`[${encodedName}] Produse primite:`, products);

            return { category: originalName, products: products.length > 0 ? products : ["Nicio opțiune momentan"] };
          } catch (err) {
            console.error(`[${encodedName}] Eroare:`, err);
            return { category: originalName, products: ["Nicio opțiune momentan"] };
          }
        });

        // 4️⃣ Procesează rezultatele și construiește structura meniului
        const results = await Promise.all(categoryPromises);
        const menuStructure = results.reduce((acc, curr) => {
          acc[curr.category] = curr.products;
          return acc;
        }, {});

        console.log('Structura finală:', menuStructure);
        setMenuData(menuStructure);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const addToBasket = (item) => {
    setBasket(prevBasket => [...prevBasket, item]);
  };

  const navigateToBasket = () => {
    console.log('Current basket:', basket);
    // Aici poți adăuga navigarea către pagina de coș
  };

  if (isLoading) {
    return <div className="min-h-screen min-w-screen flex items-center justify-center">Loading menu...</div>;
  }

  if (error) {
    return <div className="min-h-screen min-w-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen min-w-screen">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <button 
              className="btn-highlight"
              onClick={navigateToBasket}
            >
              Coș ({basket.length})
            </button>
          </li>
        </ul>
      </nav>

      {/* Logo */}
      <div className="logo-center">
        <img src="/images/logo.png" alt="NOVA Logo" className="logo-big" />
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="menu-title">Meniul nostru</h1>
        <p>Descoperă preparatele noastre rafinate, create cu pasiune și ingrediente de calitate.</p>
      </section>

      {/* Menu Items by Category */}
      <div className="menu-categories hero-images">
        {Object.entries(menuData).map(([categoryName, products]) => (
          <div className="menu-category" key={categoryName}>
            <h2>{categoryName}</h2>
            <ul>
              {products.map((product, index) => (
                <li key={`${categoryName}-${index}`}>
                  {typeof product === "string" ? (
                    <p className="text-gray-500 italic">{product}</p>
                  ) : (
                    <div className="product-item">
                      <h3>{product.nume}</h3>
                      <p>{product.descriere}</p>
                      <div className="product-details">
                        <span>Stoc: {product.cantitateStoc}</span>
                        <button
                          onClick={() => addToBasket(product)}
                          className="add-to-basket-btn"
                        >
                          Adaugă în coș
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 NOVA Restaurant. Toate drepturile rezervate.</p>
        <p>
          <a href="#about" style={{ color: '#d4af37', marginRight: '15px' }}>Despre noi</a>
          <a href="#contact" style={{ color: '#d4af37' }}>Contact</a>
        </p>
      </footer>
    </div>
  );
}

export default Menu;
