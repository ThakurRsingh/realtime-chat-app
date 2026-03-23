import axios from "axios";

// ✅ use env variable
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

export default api;