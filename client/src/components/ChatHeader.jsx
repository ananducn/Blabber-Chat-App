import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="w-full min-h-20 px-4 sm:px-10 md:px-20 py-2.5 flex items-center gap-4 border-b border-base-300 bg-base-100">
      {/* Avatar */}
      <div className="avatar">
        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={selectedUser?.profilePic?.url || "/avatar.png"}
            alt={selectedUser?.fullName}
            onError={(e) => (e.target.src = "/avatar.png")}
          />
        </div>
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <span className="font-bold text-lg">
          {capitalizeFirstLetter(selectedUser?.fullName)}
        </span>
        <span
          className={`text-xs ${
            isOnline ? "text-success" : "text-gray-500"
          } opacity-70`}
        >
          {isOnline ? "Active now" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
