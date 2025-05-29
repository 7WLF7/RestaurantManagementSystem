// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='bg-white shadow-md fixed top-0 left-0 w-full z-50'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo or Brand */}
          <div>
            <Link to='/homepage' className='text-black font-bold text-xl'>
              NOVA
            </Link>
          </div>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center space-x-6'>
            <Link to='/menu' className='text-black hover:text-orange-500'>
              Menu
            </Link>
            <Link to='/cart' className='text-black hover:text-orange-500'>
              Cart
            </Link>
            {currentUser ? (
              <>
                {currentUser.role === 'Admin' && (
                  <Link to='/admin' className='text-black hover:text-orange-500'>
                    Admin
                  </Link>
                )}
                {currentUser.role === 'Angajat' && (
                  <Link to='/employee' className='text-black hover:text-orange-500'>
                    Employee
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className='text-black hover:text-orange-500'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='text-black hover:text-orange-500'>
                  Login
                </Link>
                <Link to='/register' className='text-black hover:text-orange-500'>
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-gray-100 shadow'>
          <div className='flex flex-col px-4 pt-2 pb-4 space-y-2'>
            <Link to='/menu' onClick={() => setIsOpen(false)}>
              Menu
            </Link>
            <Link to='/cart' onClick={() => setIsOpen(false)}>
              Basket
            </Link>
            {currentUser ? (
              <>                
                {currentUser.role === 'Admin' && (
                  <Link
                    to='/admin'
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                {currentUser.role === 'Angajat' && (
                  <Link
                    to='/employee'
                    onClick={() => setIsOpen(false)}
                  >
                    Employee
                  </Link>
                )}
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
