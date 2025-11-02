import axios from 'axios';

const API_URL = 'http://localhost:8000'; // The URL of your Python ML server

export const predictCrop = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/predict/crop`, data);
    return response.data;
  } catch (error) {
    console.error('Error predicting crop:', error);
    throw error;
  }
};

export const predictFertilizer = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/predict/fertilizer`, data);
    return response.data;
  } catch (error) {
    console.error('Error predicting fertilizer:', error);
    throw error;
  }
};

export const predictDisease = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await axios.post(`${API_URL}/predict/disease`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error predicting disease:', error);
    throw error;
  }
};
