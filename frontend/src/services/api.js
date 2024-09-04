import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
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

export const updateStudent = async (userData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/manager-dashboard/Student_update/${userData.studentID}`, 
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error; 
  }
}

export const addTeacher = async (userData) => {
  const response = await axios.post(
    "http://localhost:5000/manager-dashboard/addTeacher",
    userData
  );
  return response.data;
};



export const updateTeacher = async (userData) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/manager-dashboard/Teacher_update/${userData.TeacherID}`, 
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error; 
  }
};

export const addClass = async (userData) => {
  console.log("Adding class:", userData);
  const response = await axios.post(
    "http://localhost:5000/manager-dashboard/addClass",
    userData
  );
  console.log("Response from adding class:", response);
  return response.data;
};

export const updateClass = async (formData) => {
  console.log(`Updating class with ID: ${formData._id}`);
  console.log(formData);
  try {
    const response = await axios.put(
      `http://localhost:5000/manager-dashboard/updateClass/${formData._id}`,
      formData
    );
    console.log(`Class updated successfully: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error updating class: ${error.message}`);
    throw new Error(`Failed to update class: ${error.message}`);
  }
};


export const deleteClass = async (ClassID) => {
  console.log(`Deleting class with ClassID API: ${ClassID}`);
  const response = await axios.delete(
    `http://localhost:5000/manager-dashboard/deleteClass/${ClassID}`
  );
  console.log(`Deleted class with response: ${response.data}`);
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

export const deleteStudent = async (studentID) => {
  const response = await axios.post(
    "http://localhost:5000/manager-dashboard/deleteStudent",
    studentID
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

export const fetchStudentData = async (studentID) => {
  try {
    const response = await axios.get(`http://localhost:5000/student-dashboard/fetchStudentData/${studentID}`);
    return response.data;
  } catch (error) {
    console.error("Error getting student Data", error);
    throw error;
  }
}



export const fetchStudentProfile = async (studentID) => {
  try {
    const response = await axios.get(`http://localhost:5000/student-dashboard/fetchStudentProfile/${studentID}`);
    return response.data;
  } catch (error) {
    console.error("Error getting student Profile", error);
    throw error;
  }
}


export const fetchStudentAttendance = async (studentID) => {
  try {
    const response = await axios.get(`http://localhost:5000/student-dashboard/fetchStudentAttendance/${studentID}`);
    return response.data;
  } catch (error) {
    console.error("Error getting student Attendance", error);
    throw error;
  }
}

export const fetchTeachers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/manager-dashboard/fetchTeachers");
    return response;
  } catch (error) {
    console.error("Error fetching teachers:", error);
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

