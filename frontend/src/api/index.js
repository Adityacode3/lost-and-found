import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem("lnf_user");
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch {}
  }
  return config;
});

// Auth endpoints
export const register = (data) => API.post("/api/auth/register", data);
export const login = (data) => API.post("/api/auth/login", data);

// Item endpoints
export const createItem = (data) =>
  API.post("/api/items", data, { headers: { "Content-Type": "multipart/form-data" } });

export const getAllItems = (params) => API.get("/api/items", { params });

export const getMyItems = () => API.get("/api/items/my");

export const updateItem = (id, data) =>
  API.put(`/api/items/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });

export const deleteItem = (id) => API.delete(`/api/items/${id}`);

export default API;
