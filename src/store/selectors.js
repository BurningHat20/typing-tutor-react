// src/store/selectors.js
import { createSelector } from '@reduxjs/toolkit';

const selectTypingState = (state) => state.typing;

export const selectTypingResults = createSelector(
  [selectTypingState],
  ({elapsedTime, mistakes, highScore, backspaceEnabled, backspacesUsed, userEmail, wpm, texts, currentTextIndex, userInput}) => 
  ({elapsedTime, mistakes, highScore, backspaceEnabled, backspacesUsed, userEmail, wpm, texts, currentTextIndex, userInput})
);

export const selectTypingArea = createSelector(
  [selectTypingState],
  ({texts, currentTextIndex, userInput, startTime, completed, backspaceEnabled, userEmail, elapsedTime, mistakes, backspacesUsed, currentLesson}) => 
  ({texts, currentTextIndex, userInput, startTime, completed, backspaceEnabled, userEmail, elapsedTime, mistakes, backspacesUsed, currentLesson})
);

export const selectTestHistory = createSelector(
  [selectTypingState],
  ({testHistory, userEmail}) => ({testHistory, userEmail})
);