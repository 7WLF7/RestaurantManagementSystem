import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to MyApp
      </h1>
      <p className="text-gray-700 text-lg mb-6 max-w-xl">
        This is your new React + Tailwind CSS home page. You can log in or register to get started with your journey!
      </p>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md shadow">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
