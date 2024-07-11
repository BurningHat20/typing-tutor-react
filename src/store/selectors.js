// src/store/selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectTypingState = (state) => state.typing;

// Update this in src/store/selectors.js
export const selectTypingResults = createSelector(
    selectTypingState,
    (typing) => ({
      elapsedTime: typing.elapsedTime,
      mistakes: typing.mistakes,
      highScore: typing.highScore,
      backspaceEnabled: typing.backspaceEnabled,
      backspacesUsed: typing.backspacesUsed,
      userEmail: typing.userEmail,
      wpm: typing.wpm,
      texts: typing.texts,
      currentTextIndex: typing.currentTextIndex,
      userInput: typing.userInput
    })
  );

export const selectTypingArea = createSelector(
  selectTypingState,
  (typing) => ({
    texts: typing.texts,
    currentTextIndex: typing.currentTextIndex,
    userInput: typing.userInput,
    startTime: typing.startTime,
    completed: typing.completed,
    backspaceEnabled: typing.backspaceEnabled,
    userEmail: typing.userEmail,
    elapsedTime: typing.elapsedTime,
    mistakes: typing.mistakes,
    backspacesUsed: typing.backspacesUsed
  })
);

export const selectTestHistory = createSelector(
  selectTypingState,
  (typing) => ({
    testHistory: typing.testHistory,
    userEmail: typing.userEmail
  })
);