import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark", // Default to "dark" if no theme in localStorage
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme }); // Update the Zustand state
  },
}));

export default useThemeStore;
