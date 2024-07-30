import axios from 'axios';

export const login = async (userData) => {
  const response = await axios.post('/api/auth/login', userData);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data;
};
