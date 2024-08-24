import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', 
  withCredentials: true, 
});

axios.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  response => {
    console.log("It's successful?");
    return response;
  },
  error => {
    console.log("Response intercepted again");
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error); 
  }
);


export const login = async ({ email, password }) => {
  const response = await axiosInstance.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
  console.log(response);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post("/api/auth/register", userData);
  return response.data;
};

export const addStudent = async (userData) => {
  const response = await axiosInstance.post(
    "http://localhost:5000/manager-dashboard/Student",
    userData
  );
  return response.data;
};

export const addTeacher = async (userData) => {
  const response = await axiosInstance.post(
    "http://localhost:5000/manager-dashboard/Teacher",
    userData
  );
  return response.data;
};

export const ManagerStatistics = async () => {
  const response = await axiosInstance.get("http://localhost:5000/manager-dashboard/");
  console.log(response.data);
  return response.data;
};

export const StudentStatistics = async () => {
  const response = await axiosInstance.get("http://localhost:5000/student-dashboard/");
  return response.data;
};

export const AllTutors = async () => {
  const response = await axiosInstance.get(
    "http://localhost:5000/manager-dashboard/GetTeachers"
  );
  return response.data;
};

export const deleteTutor = async (TeacherID) => {
  const response = await axiosInstance.post(
    "http://localhost:5000/manager-dashboard/deleteTeacher",
    TeacherID
  );
  return response.data;
};
