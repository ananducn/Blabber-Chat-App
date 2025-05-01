import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blabber-chat-backend.onrender.com",
  withCredentials: true,
});
