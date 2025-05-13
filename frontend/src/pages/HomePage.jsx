import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser, addFriend } = useChatStore();
  const [userIdToAdd, setUserIdToAdd] = useState("");

  async function handleAddFriend() {
    if (userIdToAdd.trim()) {
      await addFriend(userIdToAdd);
      setUserIdToAdd(""); // Clear input
    }
  }

  return (
    <div className="min-h-screen bg-base-200 px-2 md:px-6 py-4">
      <div className="max-w-[80rem] mx-auto flex flex-col gap-4 h-full">
        {/* Add Friend Input */}
        <div className="flex  gap-2 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Enter User ID"
            className="input input-bordered w-full  sm:max-w-xs rounded-md"
            value={userIdToAdd}
            onChange={(e) => setUserIdToAdd(e.target.value)}
          />
          <button
            className="btn btn-primary w-fit sm:w-auto"
            onClick={handleAddFriend}
          >
            Add Friend
          </button>
        </div>

        {/* Chat Layout */}
        <div className="flex flex-col md:flex-row  bg-base-100 rounded-lg shadow-md overflow-hidden flex-grow min-h-[500px]">
          <div className="w-full md:w-1/4 border-r border-base-300 overflow-y-auto">
            <Sidebar />
          </div>

          <div className="flex-grow overflow-y-auto">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
