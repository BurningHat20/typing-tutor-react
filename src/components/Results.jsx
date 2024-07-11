import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '@clerk/clerk-react';
import { resetTest, changeText, toggleBackspace, fetchHighScoreAsync } from '../store/typingSlice';
import { selectTypingResults } from '../store/selectors';
import { FiRefreshCw, FiSkipForward, FiAward, FiDelete, FiTarget } from 'react-icons/fi';

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
    const correctChars = totalChars - mistakes;
    return Math.round((correctChars / totalChars) * 100);
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
        <ActionButton onClick={handleChangeText} icon={<FiSkipForward />} label="Next Text" color="green" />
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
  <div className={`bg-${color}-100 dark:bg-${color}-800 p-4 rounded-lg shadow-md`}>
    <p className={`text-sm md:text-lg font-medium text-${color}-800 dark:text-${color}-200 flex items-center`}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </p>
    <p className={`text-xl md:text-3xl font-bold text-${color}-900 dark:text-${color}-100`}>{value}</p>
  </div>
));

const ActionButton = React.memo(({ onClick, icon, label, color }) => (
  <button
    className={`bg-${color}-500 dark:bg-${color}-600 text-white px-3 py-2 rounded-lg flex items-center transition-colors duration-300 hover:bg-${color}-600 dark:hover:bg-${color}-700 text-sm md:text-base`}
    onClick={onClick}
  >
    <span className="mr-2">{icon}</span> {label}
  </button>
));

export default React.memo(Results);