import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  messages: [],
  friends: [],
  selectedUser: null,
  isFriendsLoading: false,
  isMessagesLoading: false,

  getFriends: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/user/friends");
      set({ friends: res.data });
    } catch (err) {
      console.log(
        "Error in getFriends (frontend): ",
        err.response.data.message
      );
      toast.error(err.response.data.message);
    } finally {
      set({ isFriendsLoading: false });
    }
  },

  addFriend: async (userToAddId) => {
    try {
      await axiosInstance.post(`/user/addFriend/${userToAddId}`);
      toast.success("Friend added succesfully!");
      const res = await axiosInstance.get("/user/friends");
      set({ friends: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },

  getMessages: async (userToChatId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userToChatId}`);

      set({ messages: res.data });
    } catch (err) {
      console.log(
        "Error in getMessages (frontend) ",
        err.response.data.message
      );
      toast.error(err.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },

  sendMessage: async ({ receiverId, message }) => {
    try {
      console.log(message);
      await axiosInstance.post(`/message/send/${receiverId}`, {
        text: message,
      });
      toast.success("Message sent succesfully!");
    } catch (err) {
      toast.error("Couldn't send message.");
    }
  },
}));
