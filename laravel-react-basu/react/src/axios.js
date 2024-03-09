import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("TOKEN");
  const role = localStorage.getItem("ROLE");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (role) {
    config.headers.Role = role; // Set role in headers if available
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("ROLE");
      router.navigate("/login");
    }
    return Promise.reject(error); // Reject all other errors
  }
);

// Function to get users
export const getUsers = async () => {
  try {
    const response = await axiosClient.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user's location
export const updateLocation = async (latitude, longitude) => {
  try {
    await axiosClient.post("/startservice", { latitude, longitude });
  } catch (error) {
    throw error.response.data; // Throw meaningful error message
  }
};

// Function to post user location details
export const postUserLocation = async (userId, latitude, longitude) => {
  try {
    await axiosClient.post("/startservice", { userId, latitude, longitude });
  } catch (error) {
    // Check if error.response is defined before accessing its properties
    if (error.response) {
      throw error.response.data; // Throw meaningful error message from server
    } else {
      throw new Error("Failed to communicate with the server"); // Throw generic error message for network issues
    }
  }
};

// Function to get user's location
export const getLocation = async () => {
  try {
    const response = await axiosClient.get("/location");
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw meaningful error message
  }
};

// Function to post shuttle form
export const postShuttleForm = async (formData) => {
  try {
    const response = await axiosClient.post("/shuttle/form", formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Function to get shuttle form
export const getShuttleForm = async () => {
  try {
    const response = await axiosClient.get("/shuttle/storage");
    return response.data;
  } catch (error) {
    throw error.response.data; // Throw meaningful error message
  }
};

// Function to delete shuttle form
export const deleteShuttleForm = async (shuttleId) => {
  try {
    const response = await axiosClient.delete(`/shuttle/storage/${shuttleId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const handleShuttleSelect = async (driverDetails) => {
  try {
    const response = await axiosClient.post("/driver", driverDetails);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default axiosClient;
