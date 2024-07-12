// src/components/DarkModeToggle.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '../store/typingSlice';
import { FiMoon, FiSun } from 'react-icons/fi';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.typing.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch(setDarkMode(!darkMode));
    localStorage.setItem('userTheme', !darkMode ? 'dark' : 'light');
  };

  return (
    <button
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      onClick={handleToggle}
    >
      {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
    </button>
  );
};

export default DarkModeToggle;