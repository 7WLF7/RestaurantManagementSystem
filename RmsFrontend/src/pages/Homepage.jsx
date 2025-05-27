import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


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
        <Link to="/menu" className="btn-hero">
            View Menu
        </Link>

        <div className="hero-images">
          <img src="/images/bruschete.jpg" alt="Bruschette" />
          <img src="/images/feluri-principale.jpg" alt="Feluri principale" />
        </div>
      </section>

      <footer className='footer text-center py-6 bg-white border-t mt-10'>
        <p>© 2025 NOVA Restaurant. Toate drepturile rezervate.</p>
        <p className='mt-2'>
          <a href='#about' className='text-yellow-600 mr-4'>Despre noi</a>
          <a href='#contact' className='text-yellow-600'>Contact</a>
        </p>
      </footer>
      </div>
    </>
  );
};

export default Homepage;