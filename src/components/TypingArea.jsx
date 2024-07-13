// src/components/TypingArea.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {
  setUserInput,
  startTimer,
  updateTimer,
  endTimer,
  incrementMistakes,
  incrementBackspaces,
  setUserEmail,
  saveTestHistoryAsync,
  calculateAndSetWPM,
  setCurrentLesson,
  changeText,
  resetTest,
  resetLesson,
  updateHighScore
} from '../store/typingSlice';
import { selectTypingArea } from '../store/selectors';

const TypingArea = () => {
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    texts, 
    currentTextIndex, 
    userInput, 
    startTime, 
    completed, 
    backspaceEnabled, 
    userEmail,
    elapsedTime,
    mistakes,
    backspacesUsed,
    currentLesson
  } = useSelector(selectTypingArea);
  
  const text = texts[currentTextIndex];
  const containerRef = useRef(null);

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(setUserEmail(user.primaryEmailAddress.emailAddress));
    }
  }, [isSignedIn, user, dispatch]);

  useEffect(() => {
    containerRef.current?.focus();
  }, [currentTextIndex]);

  useEffect(() => {
    if (userInput.length === 1) {
      dispatch(startTimer());
    }
    if (userInput.length === text?.length && !completed) {
      dispatch(endTimer());
      handleTestCompletion();
    }
  }, [userInput, text, completed, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime && !completed) {
        dispatch(updateTimer());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, completed, dispatch]);

  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    if (completed) return;

    const key = e.key;
    if (key.length === 1 || (key === 'Backspace' && backspaceEnabled)) {
      let newInput = userInput;
      if (key === 'Backspace' && backspaceEnabled) {
        newInput = userInput.slice(0, -1);
        dispatch(incrementBackspaces());
      } else if (userInput.length < text.length) {
        newInput = userInput + key;
        if (key !== text[userInput.length]) {
          dispatch(incrementMistakes());
        }
      }
      dispatch(setUserInput(newInput));
    }
  }, [completed, backspaceEnabled, userInput, text, dispatch]);

  const handleTestCompletion = useCallback(() => {
    if (userEmail) {
      dispatch(calculateAndSetWPM());
      const testData = {
        email: userEmail,
        accuracy: calculateAccuracy(),
        mistakes,
        backspacesUsed,
        lessonId: currentLesson,
      };
      dispatch(saveTestHistoryAsync(testData));
      dispatch(updateHighScore()); // Add this line
    }
  }, [userEmail, mistakes, backspacesUsed, currentLesson, dispatch]);

  const calculateAccuracy = useCallback(() => {
    const totalChars = text?.length || 0;
    const correctChars = totalChars - mistakes;
    return Math.round((correctChars / totalChars) * 100);
  }, [text, mistakes]);

  const renderText = useCallback(() => {
    return text?.split('').map((char, index) => {
      let className = 'text-gray-500 dark:text-gray-400';
      if (index < userInput.length) {
        className = char === userInput[index] ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
        if (char === ' ' && userInput[index] !== ' ') {
          className += ' bg-red-200 dark:bg-red-900';
        }
      }
      if (index === userInput.length) {
        className += ' border-l-2 border-black dark:border-white animate-pulse';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }, [text, userInput]);

  const handleNextText = useCallback(() => {
    dispatch(changeText());
    dispatch(resetTest());
  }, [dispatch]);

  const handleFinishLesson = useCallback(() => {
    dispatch(setCurrentLesson(null));
    dispatch(resetLesson());
    navigate('/lessons');
  }, [dispatch, navigate]);

  const handleRestartLesson = useCallback(() => {
    dispatch(resetLesson());
  }, [dispatch]);

  if (!isSignedIn) {
    return <div className="text-center mt-8">Please sign in to start typing.</div>;
  }

  if (!currentLesson) {
    return <div className="text-center mt-8">Please select a lesson to start typing.</div>;
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Text {currentTextIndex + 1} of {texts.length}
      </p>
      <div 
        ref={containerRef}
        className="text-lg font-mono p-6 border-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {renderText()}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleNextText}
          disabled={currentTextIndex === texts.length - 1}
        >
          {currentTextIndex === texts.length - 1 ? "Lesson Complete" : "Next Text"}
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors duration-200"
          onClick={handleRestartLesson}
        >
          Restart Lesson
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200"
          onClick={handleFinishLesson}
        >
          Finish Lesson
        </button>
      </div>
    </div>
  );
};

export default React.memo(TypingArea);