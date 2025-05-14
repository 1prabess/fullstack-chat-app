import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    getMessages,
    messages,
    selectedUser,
    sendMessage,
    subscribeToMessages,
    addMessage,
  } = useChatStore();

  const { onlineUsers, socket } = useAuthStore();

  const { authUser } = useAuthStore();
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages(socket);
    }

    return () => {
      socket.off("newMessage");
    };
  }, [selectedUser]);

  useEffect(() => {
    if (messageEndRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessageTime = (date) => {
    const messageDate = new Date(date);
    return `${messageDate.getHours()}:${messageDate.getMinutes()}`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      text: message,
      receiverId: selectedUser._id,
      senderId: authUser._id,
      createdAt: new Date(),
    };

    addMessage(newMessage);

    await sendMessage({ receiverId: selectedUser._id, message });

    setMessage("");
  };

  if (!selectedUser) return null;

  return (
    <div className="flex flex-col h-[40rem] bg-base-100 justify-between">
      <div className="hidden sm:flex items-center gap-4 p-4 border-base-300 border-y-2">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold ">{selectedUser.fullName}</p>
          {onlineUsers.includes(selectedUser._id) ? (
            <p className="text-xs text-gray-500">Online</p>
          ) : (
            <p className="text-xs text-gray-500">Offline</p>
          )}
        </div>
      </div>

      <div
        className="flex-1  overflow-y-auto p-4 space-y-4"
        ref={messagesContainerRef}
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(msg.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {msg.text && <p>{msg.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 flex gap-2 items-center justify-between border-t border-base-300"
        style={{
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}
      >
        <input
          type="text"
          className=" w-full input input-bordered rounded-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary "
          disabled={!message.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
