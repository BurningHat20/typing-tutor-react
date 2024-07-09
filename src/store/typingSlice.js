import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveTestHistory, fetchTestHistory } from './api';

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "A journey of a thousand miles begins with a single step.",
  "Where there's a will, there's a way."
];

export const saveTestHistoryAsync = createAsyncThunk(
  'typing/saveTestHistory',
  async (testData) => {
    const response = await saveTestHistory(testData);
    return response;
  }
);

export const fetchTestHistoryAsync = createAsyncThunk(
  'typing/fetchTestHistory',
  async (email) => {
    const response = await fetchTestHistory(email);
    return response;
  }
);

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
  userEmail: null,
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
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    clearUserData: (state) => {
      state.userEmail = null;
      state.highScore = 0;
      state.testHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestHistoryAsync.fulfilled, (state, action) => {
        state.testHistory = action.payload;
      })
      .addCase(saveTestHistoryAsync.fulfilled, (state, action) => {
        console.log('Test history saved successfully');
        // Optionally, you could update the test history here as well
        // state.testHistory = [...state.testHistory, action.payload];
      });
  },
});

const calculateWPM = (state) => {
  const minutes = state.elapsedTime / 60000;
  const words = state.userInput.trim().split(/\s+/).length;
  return Math.round(words / minutes);
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
  setUserEmail,
  clearUserData,
} = typingSlice.actions;

export default typingSlice.reducer;