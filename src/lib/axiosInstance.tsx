// src/lib/axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

// Interceptor to attach Bearer token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Ensure headers exist
  config.headers = config.headers ?? {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
