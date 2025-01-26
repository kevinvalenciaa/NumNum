import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';  // Flask API URL

export const analyzeInput = async (input) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, { input });
    return response.data;
  } catch (error) {
    console.error('Error calling backend API:', error);
    throw error;
  }
};
