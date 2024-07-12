// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="mb-8">
      <ul className="flex space-x-4">
        <li>
          <Link 
            to="/lessons" 
            className={`text-blue-500 hover:text-blue-700 ${location.pathname === '/lessons' ? 'font-bold' : ''}`}
          >
            Lessons
          </Link>
        </li>
        <li>
          <Link 
            to="/history" 
            className={`text-blue-500 hover:text-blue-700 ${location.pathname === '/history' ? 'font-bold' : ''}`}
          >
            History
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;