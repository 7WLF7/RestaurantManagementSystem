import React, { useState, useEffect } from 'react';
import '../App.css';

function Menu() {
  const [menuData, setMenuData] = useState({
    appetizers: [],
    mainCourses: [],
    nonAlcoholicDrinks: [],
    alcoholicDrinks: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categorie');
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        setMenuData(data);
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
    // You might want to add more logic here, like quantity handling
  };

  const navigateToBasket = () => {
    // This would typically be done with React Router
    // For now, we'll just log the basket
    console.log('Current basket:', basket);
    // In a real app, you would navigate to the basket page
    // history.push('/basket');
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
              Basket ({basket.length})
            </button>
          </li>
        </ul>
      </nav>

      {/* Centered Logo */}
      <div className="logo-center">
        <img src="/images/logo.png" alt="NOVA Logo" className="logo-big" />
      </div>

      {/* Menu Title */}
      <section className="hero">
        <h1 className="menu-title">Meniul nostru</h1>
        <p>Descoperă preparatele noastre rafinate, create cu pasiune și ingrediente de calitate.</p>
      </section>

      {/* Menu Categories */}
      <div className="menu-categories hero-images">
        <div className="menu-category">
          <img src="/images/bruschete.jpg" alt="Aperitive" />
          <h2>Aperitive</h2>
          <ul>
            {menuData.appetizers.map((item, index) => (
              <li key={`appetizer-${index}`}>
                {item.name} - {item.price} RON
                <button 
                  onClick={() => addToBasket(item)}
                  className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu-category">
          <img src="/images/feluri-principale.jpg" alt="Feluri principale" />
          <h2>Feluri principale</h2>
          <ul>
            {menuData.mainCourses.map((item, index) => (
              <li key={`mainCourse-${index}`}>
                {item.name} - {item.price} RON
                <button 
                  onClick={() => addToBasket(item)}
                  className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu-category">
          <img src="/images/bauturi-nespirtoase.jpg" alt="Băuturi nespirtoase" />
          <h2>Băuturi nespirtoase</h2>
          <ul>
            {menuData.nonAlcoholicDrinks.map((item, index) => (
              <li key={`nonAlcoholic-${index}`}>
                {item.name} - {item.price} RON
                <button 
                  onClick={() => addToBasket(item)}
                  className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu-category">
          <img src="/images/bauturi-spirtoase.jpg" alt="Băuturi spirtoase" />
          <h2>Băuturi spirtoase</h2>
          <ul>
            {menuData.alcoholicDrinks.map((item, index) => (
              <li key={`alcoholic-${index}`}>
                {item.name} - {item.price} RON
                <button 
                  onClick={() => addToBasket(item)}
                  className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 NOVA Restaurant. All rights reserved.</p>
        <p>
          <a href="#about" style={{ color: '#d4af37', marginRight: '15px' }}>About</a>
          <a href="#contact" style={{ color: '#d4af37' }}>Contact</a>
        </p>
      </footer>
    </div>
  );
}

export default Menu;