import { createSlice } from '@reduxjs/toolkit';

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "A journey of a thousand miles begins with a single step.",
  "Where there's a will, there's a way."
];

const initialState = {
  texts,
  currentTextIndex: 0,
  userInput: '',
  startTime: null,
  endTime: null,
  elapsedTime: 0,
  mistakes: 0,
  darkMode: false,
  completed: false,
  highScore: 0,
  testHistory: [],
  backspaceEnabled: true,
  backspacesUsed: 0,
  userId: null, // New field for user ID
};

export const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
    startTimer: (state) => {
      if (!state.startTime) {
        state.startTime = Date.now();
      }
    },
    updateTimer: (state) => {
      if (state.startTime && !state.completed) {
        state.elapsedTime = Date.now() - state.startTime;
      }
    },
    endTimer: (state) => {
      state.endTime = Date.now();
      state.elapsedTime = state.endTime - state.startTime;
      state.completed = true;
      const wpm = calculateWPM(state);
      if (wpm > state.highScore) {
        state.highScore = wpm;
      }
      state.testHistory.push({
        userId: state.userId, // Include user ID in test history
        date: new Date().toISOString(),
        wpm,
        accuracy: calculateAccuracy(state),
        mistakes: state.mistakes,
        textIndex: state.currentTextIndex,
        backspacesUsed: state.backspacesUsed,
      });
    },
    incrementMistakes: (state) => {
      state.mistakes += 1;
    },
    resetTest: (state) => {
      state.userInput = '';
      state.startTime = null;
      state.endTime = null;
      state.elapsedTime = 0;
      state.mistakes = 0;
      state.completed = false;
      state.backspacesUsed = 0;
    },
    changeText: (state) => {
      state.currentTextIndex = (state.currentTextIndex + 1) % state.texts.length;
      state.userInput = '';
      state.startTime = null;
      state.endTime = null;
      state.elapsedTime = 0;
      state.mistakes = 0;
      state.completed = false;
      state.backspacesUsed = 0;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleBackspace: (state) => {
      state.backspaceEnabled = !state.backspaceEnabled;
    },
    incrementBackspaces: (state) => {
      state.backspacesUsed += 1;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // New reducer to clear user data on logout
    clearUserData: (state) => {
      state.userId = null;
      state.highScore = 0;
      state.testHistory = [];
    },
  },
});

const calculateWPM = (state) => {
  const minutes = state.elapsedTime / 60000;
  const words = state.userInput.trim().split(/\s+/).length;
  return Math.round(words / minutes);
};

const calculateAccuracy = (state) => {
  const totalChars = state.texts[state.currentTextIndex].length;
  const correctChars = totalChars - state.mistakes;
  return Math.round((correctChars / totalChars) * 100);
};

export const {
  setUserInput,
  startTimer,
  updateTimer,
  endTimer,
  incrementMistakes,
  resetTest,
  changeText,
  toggleDarkMode,
  toggleBackspace,
  incrementBackspaces,
  setUserId,
  clearUserData,
} = typingSlice.actions;

export default typingSlice.reducer;