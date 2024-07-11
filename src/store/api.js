// src/store/api.js

const API_URL = 'http://localhost:5000/api'; // Adjust this URL to match your backend server

export const saveTestHistory = async (testData) => {
  try {
    const response = await fetch(`${API_URL}/test-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving test history:', error);
    throw error;
  }
};

export const fetchTestHistory = async (email) => {
  try {
    const response = await fetch(`${API_URL}/test-history/${email}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching test history:', error);
    throw error;
  }
};

export const fetchHighScore = async (email) => {
  try {
    const response = await fetch(`${API_URL}/high-score/${email}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching high score:', error);
    throw error;
  }
};

