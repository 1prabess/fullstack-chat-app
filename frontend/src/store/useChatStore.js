import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
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
    } finally {
      set({ isFriendsLoading: false });
    }
  },

  addFriend: async (userToAddId) => {
    try {
      await axiosInstance.post(`/user/addFriend/${userToAddId}`);
      toast.success("Friend added successfully!");
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

  subscribeToMessages: (socket) => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { selectedUser: currentSelectedUser } = get();

      if (
        newMessage.senderId === currentSelectedUser?._id ||
        newMessage.receiverId === currentSelectedUser?._id
      ) {
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });
  },

  addMessage: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  sendMessage: async ({ receiverId, message }) => {
    try {
      await axiosInstance.post(`/message/send/${receiverId}`, {
        text: message,
      });
    } catch (err) {
      toast.error("Couldn't send message.");
    }
  },
}));
