import axios from 'axios';

const API_URL = 'http://localhost:8000'; // The URL of your Python ML server

export const predictCrop = async (features) => {
  try {
    const response = await axios.post(`${API_URL}/predict/crop`, {
      features: features
    });
    return response.data.prediction;
  } catch (error) {
    console.error('Error predicting crop:', error);
    throw error;
  }
};

export const predictFertilizer = async (features) => {
  try {
    const response = await axios.post(`${API_URL}/predict/fertilizer`, {
      features: features
    });
    return response.data.prediction;
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
