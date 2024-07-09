import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../store/typingSlice';
import { FiMoon, FiSun } from 'react-icons/fi';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.typing.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <button
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      onClick={handleToggle}
    >
      {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
    </button>
  );
};

export default DarkModeToggle;