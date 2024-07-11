// src/App.jsx
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import TypingArea from './components/TypingArea';
import Results from './components/Results';
import TestHistory from './components/TestHistory';
import DarkModeToggle from './components/DarkModeToggle';
import UserButton from './components/UserButton';
import LandingPage from './components/LandingPage';
import LessonSelector from './components/LessonSelector';

function AppContent() {
  const { isSignedIn, isLoaded } = useUser();
  const darkMode = useSelector((state) => state.typing.darkMode);
  const currentLesson = useSelector((state) => state.typing.currentLesson);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">Pro Typing Tutor</h1>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <UserButton />
          </div>
        </header>
        <main>
          {!currentLesson ? (
            <LessonSelector />
          ) : (
            <>
              <TypingArea />
              <Results />
            </>
          )}
          <TestHistory />
        </main>
        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 Pro Typing Tutor. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;