import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/check");
      console.log(res);

      set({ authUser: res.data });
    } catch (err) {
      console.log("Error in checkauth: ", err);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {},
}));
