import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetTest, changeText, toggleBackspace } from '../store/typingSlice';
import { FiRefreshCw, FiSkipForward, FiAward, FiDelete } from 'react-icons/fi';

const Results = () => {
  const dispatch = useDispatch();
  const { texts, currentTextIndex, userInput, elapsedTime, mistakes, completed, highScore, backspaceEnabled, backspacesUsed } = useSelector(
    (state) => state.typing
  );

  const calculateWPM = () => {
    if (!completed) return 0;
    const minutes = elapsedTime / 60000;
    const words = userInput.trim().split(/\s+/).length;
    return Math.round(words / minutes);
  };

  const calculateAccuracy = () => {
    const totalChars = texts[currentTextIndex].length;
    const correctChars = totalChars - mistakes;
    return Math.round((correctChars / totalChars) * 100);
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    dispatch(resetTest());
  };

  const handleChangeText = () => {
    dispatch(changeText());
  };

  const handleToggleBackspace = () => {
    dispatch(toggleBackspace());
  };
  const progress = (userInput.length / texts[currentTextIndex].length) * 100;

  return (
    <div className="mt-8">
      <div className="mb-4 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div
          className="bg-blue-500 dark:bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-blue-800 dark:text-blue-200">WPM</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{calculateWPM()}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-green-800 dark:text-green-200">Accuracy</p>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">{calculateAccuracy()}%</p>
        </div>
        <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-red-800 dark:text-red-200">Mistakes</p>
          <p className="text-3xl font-bold text-red-900 dark:text-red-100">{mistakes}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Time</p>
          <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{formatTime(elapsedTime)}</p>
        </div>
        <div className="bg-indigo-100 dark:bg-indigo-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-medium text-indigo-800 dark:text-indigo-200">Backspaces</p>
          <p className="text-3xl font-bold text-indigo-900 dark:text-indigo-100">{backspacesUsed}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <button
            className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300 hover:bg-blue-600 dark:hover:bg-blue-700"
            onClick={handleReset}
          >
            <FiRefreshCw className="mr-2" /> Reset Test
          </button>
          <button
            className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300 hover:bg-green-600 dark:hover:bg-green-700"
            onClick={handleChangeText}
          >
            <FiSkipForward className="mr-2" /> Next Text
          </button>
          <button
            className={`px-4 py-2 rounded-lg flex items-center transition-colors duration-300 ${
              backspaceEnabled
                ? 'bg-indigo-500 dark:bg-indigo-600 text-white hover:bg-indigo-600 dark:hover:bg-indigo-700'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
            onClick={handleToggleBackspace}
          >
            <FiDelete className="mr-2" /> {backspaceEnabled ? 'Disable' : 'Enable'} Backspace
          </button>
        </div>
        <div className="flex items-center bg-purple-100 dark:bg-purple-800 p-3 rounded-lg shadow-md">
          <FiAward className="text-purple-500 dark:text-purple-300 mr-2 text-xl" />
          <span className="text-purple-800 dark:text-purple-200 font-medium">High Score:</span>
          <span className="text-purple-900 dark:text-purple-100 font-bold ml-2">{highScore} WPM</span>
        </div>
      </div>
    </div>
  );
};

export default Results;