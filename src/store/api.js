// src/store/api.js

const API_URL = import.meta.env.VITE_API_URL || 'http://typing-tutor-back.vercel.app/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Network response was not ok');
  }
  return response.json();
};

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error in API request: ${error.message}`);
    throw error;
  }
};

export const saveTestHistory = (testData) => apiRequest('/test-history', 'POST', testData);
export const fetchTestHistory = (email) => apiRequest(`/test-history/${email}`);
export const fetchHighScore = (email) => apiRequest(`/high-score/${email}`);