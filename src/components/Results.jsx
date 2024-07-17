// src/components/Results.jsx
import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { resetTest, changeText, toggleBackspace, fetchHighScoreAsync } from '../store/typingSlice';
import { selectTypingResults } from '../store/selectors';
import { FiRefreshCw, FiSkipForward, FiAward, FiDelete, FiTarget } from 'react-icons/fi';
import { calculateAccuracy } from '../store/typingSlice';

const colorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-blue-900 dark:text-blue-100',
  green: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-green-900 dark:text-green-100',
  yellow: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-yellow-900 dark:text-yellow-100',
  red: 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 text-red-900 dark:text-red-100',
  indigo: 'bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 text-indigo-900 dark:text-indigo-100',
  purple: 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-purple-900 dark:text-purple-100',
};

const buttonColorClasses = {
  blue: 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700',
  green: 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700',
  indigo: 'bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700',
  gray: 'bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700',
};

const Results = () => {
  const { isSignedIn } = useUser();
  const dispatch = useDispatch();
  const { 
    elapsedTime, 
    mistakes, 
    highScore, 
    backspaceEnabled, 
    backspacesUsed, 
    userEmail, 
    wpm,
    texts,
    currentTextIndex,
    userInput
  } = useSelector(selectTypingResults);

  useEffect(() => {
    if (isSignedIn && userEmail) {
      dispatch(fetchHighScoreAsync(userEmail));
    }
  }, [isSignedIn, userEmail, dispatch]);

  const formatTime = useMemo(() => {
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [elapsedTime]);

  const accuracy = useMemo(() => {
    const totalChars = texts[currentTextIndex].length;
    return calculateAccuracy(totalChars, mistakes);
  }, [texts, currentTextIndex, mistakes]);

  const handleReset = useCallback(() => dispatch(resetTest()), [dispatch]);
  const handleChangeText = useCallback(() => dispatch(changeText()), [dispatch]);
  const handleToggleBackspace = useCallback(() => dispatch(toggleBackspace()), [dispatch]);

  if (!isSignedIn) {
    return <div className="text-center mt-8">Please sign in to view results.</div>;
  }

  return (
    <div className="mt-4 md:mt-8 px-4 md:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <ResultBox label="WPM" value={wpm} color="blue" />
        <ResultBox label="Accuracy" value={`${accuracy}%`} color="green" icon={<FiTarget />} />
        <ResultBox label="Time" value={formatTime} color="yellow" />
        <ResultBox label="Mistakes" value={mistakes} color="red" />
        <ResultBox label="Backspaces" value={backspacesUsed} color="indigo" />
        <ResultBox label="High Score" value={`${highScore} WPM`} color="purple" icon={<FiAward />} />
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <ActionButton onClick={handleReset} icon={<FiRefreshCw />} label="Reset Test" color="blue" />
        <ActionButton 
          onClick={handleToggleBackspace} 
          icon={<FiDelete />} 
          label={`${backspaceEnabled ? 'Disable' : 'Enable'} Backspace`} 
          color={backspaceEnabled ? 'indigo' : 'gray'}
        />
      </div>
    </div>
  );
};

const ResultBox = React.memo(({ label, value, color, icon }) => (
  <div className={`${colorClasses[color]} p-4 rounded-lg shadow-md`}>
    <p className="text-sm md:text-lg font-medium flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </p>
    <p className="text-xl md:text-3xl font-bold">{value}</p>
  </div>
));

const ActionButton = React.memo(({ onClick, icon, label, color }) => (
  <button
    className={`${buttonColorClasses[color]} text-white px-3 py-2 rounded-lg flex items-center transition-colors duration-300 text-sm md:text-base`}
    onClick={onClick}
  >
    <span className="mr-2">{icon}</span> {label}
  </button>
));

export default React.memo(Results);