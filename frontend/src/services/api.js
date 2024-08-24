import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
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
  const response = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
  console.log(response);
  return response.data;
};

export const addStudent = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/manager-dashboard/Student",
    userData
  );
  return response.data;
};

export const addTeacher = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/manager-dashboard/Teacher",
    userData
  );
  return response.data;
};

export const ManagerStatistics = async () => {
  const response = await axios.get("http://localhost:5000/manager-dashboard/");
  console.log(response.data);
  return response.data;
};

export const StudentStatistics = async () => {
  const response = await axios.get("http://localhost:5000/student-dashboard/");
  return response.data;
};

export const AllTutors = async () => {
  const response = await axios.get(
    "http://localhost:5000/manager-dashboard/GetTeachers"
  );
  return response.data;
};

export const deleteTutor = async (TeacherID) => {
  const response = await axios.post(
    "http://localhost:5000/manager-dashboard/deleteTeacher",
    TeacherID
  );
  return response.data;
};

export const fetchClasses = async () => {
  try {
    const response = await axios.get("http://localhost:5000/manager-dashboard/fetchClasses");
    return response;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

export const fetchClasses_id = async (studentID) => {
  try {
    const response = await axios.get(`http://localhost:5000/student-dashboard/fetchClasses_id/${studentID}`);
    return response;
  } catch (error) {
    console.error("API_Error fetching classes:", error);
    throw error;
  }
};

