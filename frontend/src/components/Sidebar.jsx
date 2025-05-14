import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

const Sidebar = () => {
  const {
    getFriends,
    friends,
    selectedUser,
    setSelectedUser,
    isFriendsLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const onlineFriends = [];

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  if (isFriendsLoading) return "Loading";

  return (
    <div className=" flex overflow-x-auto px-2 py-2 h-fit  md:flex-col md:overflow-visible sm:gap-2 ">
      <div className="md:flex hidden p-2 text-center items-center gap-2">
        <Users className="size-5" />
        <span className="hidden md:block">
          {friends.filter((friend) => onlineUsers.includes(friend._id)).length}{" "}
          {friends.filter((friend) => onlineUsers.includes(friend._id))
            .length === 1
            ? "friend online"
            : "friends online"}
        </span>
      </div>
      {friends.map((friend) => (
        <div
          key={friend._id}
          className={`flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-base-200 
            ${selectedUser?._id === friend._id ? "bg-base-300  " : ""}
            flex-shrink-0 w-[250px] md:w-auto`}
          onClick={() => setSelectedUser(friend)}
        >
          <div className="relative w-10 h-10">
            <img
              src={friend.profilePic || "/avatar.png"}
              alt={friend.fullName}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white ${
                onlineUsers.includes(friend._id)
                  ? "bg-green-600"
                  : "bg-gray-400"
              }`}
            />
          </div>

          <div>
            <p className="font-medium text-sm">{friend.fullName}</p>
            <p className="text-xs text-zinc-500">{friend.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
