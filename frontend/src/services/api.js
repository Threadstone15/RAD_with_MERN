import axios from 'axios';

axios.defaults.withCredentials = true;

export const login = async ({ email, password }) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password,
  });
  console.log(response);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data;
};



export const addStudent = async (userData) => {
  const response = await axios.post('http://localhost:5000/manager-dashboard/Student', userData);
  return response.data;
};

export const addTeacher = async (userData) => {
  const response = await axios.post('http://localhost:5000/manager-dashboard/Teacher', userData);
  return response.data;
};

export const ManagerStatistics = async() => {
  const response = await axios.get('http://localhost:5000/manager-dashboard/');
  return response.data;
}