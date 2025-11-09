import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://sweetshopbackend.infinityfreeapp.com/api" // Local testing (no proxy)
      : "/api/proxy/api", // ✅ Use Vercel proxy in production
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
