import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  message: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      console.log(
        "Request URL:",
        axiosInstance.defaults.baseURL + "/messages/users"
      );

      const res = await axiosInstance.get("/messages/users");

      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (UserId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${UserId}`);
      set({ message: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
