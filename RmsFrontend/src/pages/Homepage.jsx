import React from 'react';
import '../App.css';

const Homepage = () => {
  return (
    <>
        <div className="min-h-screen min-w-screen">
      {/* Navbar fără logo */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button className="btn-highlight">Connect Now</button></li>
        </ul>
      </nav>

      {/* Logo Centrat */}
      <div className="logo-center">
        <img src="/images/logo.png" alt="NOVA Logo" className="logo-big" />
      </div>

      {/* Hero Section */}
      <section className="hero" id="home">
        <h1>Discover the Taste of Elegance</h1>
        <p>Enjoy our exquisite dishes made with passion and the finest ingredients.</p>
        <button className="btn-hero">Discover More</button>

        <div className="hero-images">
          <img src="/images/bruschete.jpg" alt="Bruschette" />
          <img src="/images/feluri-principale.jpg" alt="Feluri principale" />
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 NOVA Restaurant. All rights reserved.</p>
        <p>
          <a href="#about" style={{color: '#d4af37', marginRight: '15px'}}>About</a>
          <a href="#contact" style={{color: '#d4af37'}}>Contact</a>
        </p>
      </footer>
      </div>
    </>
  );
};

export default Homepage;