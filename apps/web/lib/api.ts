import axios from "axios";

const api = axios.create({
  baseURL: "http://13.53.200.47:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: Add token dynamically

api.interceptors.request.use((config) => {
  const token = "";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
