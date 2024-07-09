import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import TypingArea from './components/TypingArea';
import Results from './components/Results';
import TestHistory from './components/TestHistory';
import DarkModeToggle from './components/DarkModeToggle';

const AppContent = () => {
  const darkMode = useSelector((state) => state.typing.darkMode);

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'dark' : ''}`}>
      <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Pro Typing Tutor</h1>
            <DarkModeToggle />
          </header>
          <main>
            <TypingArea />
            <Results />
            <TestHistory />
          </main>
          <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2024 Pro Typing Tutor. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;