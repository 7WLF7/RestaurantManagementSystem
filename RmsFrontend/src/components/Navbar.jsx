import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Home Link */}
          <div className="hidden md:flex space-x-6">
            <Link to="/homepage" className="text-black hover:text-orange-500">Home
            </Link>
            <Link to="/menu" className="text-black hover:text-orange-500">
              Menu
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/basket" className="text-black hover:text-orange-500">
              Basket
            </Link>
            <Link to="/login" className="text-black hover:text-orange-500">
              Login
            </Link>
            <Link to="/register" className="text-black hover:text-orange-500">
              Register
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 shadow">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            <Link to="/homepage" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
