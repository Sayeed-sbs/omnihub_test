import axios from "axios";

// 🚀 Fixed: Dynamically pulls from your environment configuration file with a fallback for local safety
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // 🔒 Essential Addition: Informs the browser to pass httpOnly cookies (session tokens) automatically 
  withCredentials: true, 
});

export default api;
