import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUserInput,
  startTimer,
  updateTimer,
  endTimer,
  incrementMistakes,
  incrementBackspaces,
} from '../store/typingSlice';

const TypingArea = () => {
  const dispatch = useDispatch();
  const { texts, currentTextIndex, userInput, startTime, completed, backspaceEnabled } = useSelector((state) => state.typing);
  const text = texts[currentTextIndex];
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [currentTextIndex]);

  useEffect(() => {
    if (userInput.length === 1) {
      dispatch(startTimer());
    }
    if (userInput.length === text.length && !completed) {
      dispatch(endTimer());
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

  const handleKeyDown = (e) => {
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
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
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
  };

  return (
    <div 
      ref={containerRef}
      className="mt-4 text-lg font-mono p-6 border-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {renderText()}
    </div>
  );
};

export default TypingArea;