import { create } from "zustand";

export const useThemeStore = create((set) => ({
  userTheme: localStorage.getItem("theme") || "dim",

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ userTheme: theme });
  },
}));
