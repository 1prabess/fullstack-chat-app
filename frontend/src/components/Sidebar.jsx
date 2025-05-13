import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const Sidebar = () => {
  const {
    getFriends,
    friends,
    selectedUser,
    setSelectedUser,
    isFriendsLoading,
  } = useChatStore();

  const onlineFriends = [];

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  if (isFriendsLoading) return "Loading";

  return (
    <div className=" flex overflow-x-auto px-4 py-2 h-fit  md:flex-col md:overflow-visible sm:gap-2 ">
      {friends.map((friend) => (
        <div
          key={friend._id}
          className={`flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-base-200 
            ${selectedUser?._id === friend._id ? "bg-base-200" : ""}
            flex-shrink-0 w-[250px] md:w-auto`}
          onClick={() => setSelectedUser(friend)}
        >
          <img
            src={friend.profilePic || "/avatar.png"}
            alt={friend.fullName}
            className="w-10 h-10 rounded-full object-cover border"
          />
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
