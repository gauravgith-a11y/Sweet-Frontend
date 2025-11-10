import axios from "axios";

const api = axios.create({
  baseURL: "https://sweetshopbackend.infinityfreeapp.com/api", // ✅ direct Laravel API
  withCredentials: false, // no cookies needed for now
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
