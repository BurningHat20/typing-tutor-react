// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import TypingArea from './components/TypingArea';
import Results from './components/Results';
import TestHistory from './components/TestHistory';
import DarkModeToggle from './components/DarkModeToggle';
import UserButton from './components/UserButton';
import LandingPage from './components/LandingPage';
import LessonSelector from './components/LessonSelector';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { setCurrentLesson } from './store/typingSlice'; // Assume this action exists

function AppContent() {
  const { isSignedIn, isLoaded } = useUser();
  const darkMode = useSelector((state) => state.typing.darkMode);
  const currentLesson = useSelector((state) => state.typing.currentLesson);
  const location = useLocation();
  const dispatch = useDispatch();

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

  const showNavbar = isSignedIn && location.pathname !== '/';
  const isLandingPage = location.pathname === '/';

  return (
    <div className={`min-h-screen w-full ${!isLandingPage ? 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white' : ''} transition-colors duration-300`}>
      <div className={`${!isLandingPage ? 'container mx-auto px-4 py-8' : ''}`}>
        {!isLandingPage && (
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">RED Labz</h1>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <UserButton />
            </div>
          </header>
        )}
        {showNavbar && <Navbar />}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={!isSignedIn ? <LandingPage /> : <Navigate to="/lessons" />} 
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