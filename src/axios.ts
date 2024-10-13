import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to add Authorization header
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request error", error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor to handle 401 errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      const response = error.response;

      if (response.status === 401) {
        // Logout user ...
        // store.dispatch(logoutUser());
      }

      if (response.data) {
        console.log("Response with error:", response.data);
        return Promise.reject(response.data);
      }
    }

    console.log("Response error:", error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
