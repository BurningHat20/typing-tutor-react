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
            className={`text-xl hover:text-blue-700 ${location.pathname === '/lessons' ? 'font-bold' : ''} text-blue-500 dark:text-blue-300`}
          >
            Lessons
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className={`text-xl hover:text-blue-700 ${location.pathname === '/history' ? 'font-bold' : ''} text-blue-500 dark:text-blue-300`}
          >
            History
          </Link>
        </li>
        <li>
          <Link
            to="/typing"
            className={`text-xl hover:text-blue-700 ${location.pathname === '/typing' ? 'font-bold' : ''} text-blue-500 dark:text-blue-300`}
          >
            Typing
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
