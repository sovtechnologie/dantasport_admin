import axios from "axios";
import Cookies from "js-cookie";
// import { handleLogout } from "../utils/authUtils";
// import { store } from "../redux/store.js";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://qpcfbzrk62.execute-api.eu-north-1.amazonaws.com/api/v1/";
console.log("🌐 API Base URL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
});

export default api;

api.interceptors.request.use(
  (config) => {
    // Add any request interceptors here, e.g., adding auth tokens
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      // Log token for development purposes
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 API Request with token:', {
          url: config.url,
          method: config.method,
          baseURL: config.baseURL,
          fullURL: `${config.baseURL}${config.url}`,
          token: token.substring(0, 20) + '...' // Show only first 20 chars for security
        });
      }
    } else {
      console.warn('⚠️ No token found for API request:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL
      });
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        url: response.config.url,
        method: response.config.method,
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });

    const isUnauthorized =
      error.response?.status === 401 &&
      error.response?.data?.message === "Unauthorized";

    if (isUnauthorized && !isLoggingOut) {
      isLoggingOut = true;
      console.warn("Unauthorized access - logging out user");
    //   handleLogout(store.dispatch); // Clear token and redirect
    }

    return Promise.reject(error);
  }
);
