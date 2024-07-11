import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveTestHistory, fetchTestHistory, fetchHighScore } from './api';

export const calculateWPM = (userInput, elapsedTime) => {
  const minutes = elapsedTime / 60000;
  const words = userInput.trim().split(/\s+/).length;
  return Math.round(words / minutes);
};

export const saveTestHistoryAsync = createAsyncThunk(
  'typing/saveTestHistory',
  async (testData, { getState, dispatch }) => {
    const state = getState().typing;
    const updatedTestData = { ...testData, wpm: state.wpm };
    const response = await saveTestHistory(updatedTestData);
    dispatch(fetchTestHistoryAsync(state.userEmail));
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

export const fetchHighScoreAsync = createAsyncThunk(
  'typing/fetchHighScore',
  async (email) => {
    const response = await fetchHighScore(email);
    return response.highScore;
  }
);

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
  userEmail: null,
  wpm: 0,
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
      state.wpm = 0;
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
      state.wpm = 0;
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
    calculateAndSetWPM: (state) => {
      state.wpm = calculateWPM(state.userInput, state.elapsedTime);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestHistoryAsync.fulfilled, (state, action) => {
        state.testHistory = action.payload;
      })
      .addCase(saveTestHistoryAsync.fulfilled, (state, action) => {
        console.log('Test history saved successfully');
      })
      .addCase(fetchHighScoreAsync.fulfilled, (state, action) => {
        state.highScore = action.payload;
      });
  },
});

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
  calculateAndSetWPM,
} = typingSlice.actions;

export default typingSlice.reducer;