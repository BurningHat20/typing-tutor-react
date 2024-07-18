// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import { store } from './store/store';
import TypingArea from './components/TypingArea';
import Results from './components/Results';
import TestHistory from './components/TestHistory';
import DarkModeToggle from './components/DarkModeToggle';
import UserButton from './components/UserButton';
import LandingPage from './components/LandingPage';
import LessonSelector from './components/LessonSelector';
import Loader from './components/Loader';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { setCurrentLesson, setDarkMode } from './store/typingSlice';

function AppContent() {
  const { isSignedIn, isLoaded } = useUser();
  const darkMode = useSelector((state) => state.typing.darkMode);
  const currentLesson = useSelector((state) => state.typing.currentLesson);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Detect system theme and set initial theme
    const userTheme = localStorage.getItem('userTheme');
    if (userTheme) {
      dispatch(setDarkMode(userTheme === 'dark'));
    } else {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setDarkMode(systemDarkMode));
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('userTheme')) {
        dispatch(setDarkMode(e.matches));
      }
    };
    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Retrieve currentLesson from localStorage on component mount
    const savedLesson = localStorage.getItem('currentLesson');
    if (savedLesson) {
      dispatch(setCurrentLesson(JSON.parse(savedLesson)));
    }
  }, [dispatch]);

  useEffect(() => {
    // Save currentLesson to localStorage whenever it changes
    if (currentLesson) {
      localStorage.setItem('currentLesson', JSON.stringify(currentLesson));
    }
  }, [currentLesson]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen"><Loader/></div>;
  }

  const showHeader = isSignedIn && location.pathname !== '/';
  const isLandingPage = location.pathname === '/';

  return (
    <div className={`min-h-screen w-full ${!isLandingPage ? 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white' : ''} transition-colors duration-300`}>
      <div className={`${!isLandingPage ? 'container mx-auto px-4 py-8' : ''}`}>
        {showHeader && (
          <header className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center justify-between w-full md:w-auto">
                <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">RED Labz</h1>
                <button
                  className="md:hidden text-blue-500 dark:text-blue-300"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <FaTimes className="h-6 w-6" />
                  ) : (
                    <FaBars className="h-6 w-6" />
                  )}
                </button>
              </div>
              <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto mt-4 md:mt-0`}>
                <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
                  <li>
                    <Link
                      to="/lessons"
                      className={`text-xl hover:text-blue-700 ${location.pathname === '/lessons' ? 'font-bold' : ''} text-blue-500 dark:text-blue-300`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Lessons
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/history"
                      className={`text-xl hover:text-blue-700 ${location.pathname === '/history' ? 'font-bold' : ''} text-blue-500 dark:text-blue-300`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/typing"
                      className={`text-xl hover:text-blue-700 ${location.pathname === '/typing' ? 'font-bold' : ''} text-blue-500 dark:text-blue-300`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Typing
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <DarkModeToggle />
                <UserButton />
              </div>
            </div>
          </header>
        )}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={!isSignedIn ? <LandingPage /> : <Navigate to="/lessons" />} 
            />
            <Route 
              path="/sign-in/*" 
              element={!isSignedIn ? <SignIn /> : <Navigate to="/lessons" />} 
            />
            <Route 
              path="/sign-up/*" 
              element={!isSignedIn ? <SignUp /> : <Navigate to="/lessons" />} 
            />
            <Route 
              path="/lessons" 
              element={isSignedIn ? <LessonSelector /> : <Navigate to="/" />} 
            />
            <Route 
              path="/typing" 
              element={
                isSignedIn ? (
                  currentLesson ? (
                    <>
                      <TypingArea />
                      <Results />
                    </>
                  ) : (
                    <Navigate to="/lessons" />
                  )
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            <Route 
              path="/history" 
              element={isSignedIn ? <TestHistory /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
        {!isLandingPage && (
          <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2024 Pro Typing Tutor. All rights reserved.</p>
          </footer>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;