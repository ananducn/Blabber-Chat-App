import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SideBarSkeleton from "./skeliton/SideBarSkeliton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const SideBar = () => {
  const { getUsers, setSelectedUser, users, selectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineUsersOnly, setShowOnlineUsersOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineUsersOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (isUsersLoading) return <SideBarSkeleton />;

  return (
    <aside className="h-full min-w-20 sm:min-w-28 lg:w-96 bg-base-200/50 backdrop-blur-md border-r border-base-300 flex flex-col transition-all">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-base-300 flex flex-col gap-2 sm:gap-3 md:gap-4">
        {/* Icon + Title */}
        <div className="flex items-center gap-2">
          <Users className="size-4 sm:size-5 shrink-0" />
          <h2 className="text-sm sm:text-base font-semibold truncate">
            Messages
          </h2>
        </div>

        {/* Online count + checkbox */}
        <div className="flex items-center">
          <label className="inline-flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs cursor-pointer select-none">
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              checked={showOnlineUsersOnly}
              onChange={() => setShowOnlineUsersOnly((prev) => !prev)}
            />
            <span> Online ({onlineUsers.length - 1})</span>
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto flex-1 px-2 py-1 sm:p-2 flex flex-col gap-2">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-xs text-gray-500 mt-4">
            {showOnlineUsersOnly ? "No online users" : "No users found"}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex flex-col lg:flex-row items-center py-2 sm:py-3 sm:px-4 px-2 rounded-lg transition-all ${
                selectedUser?._id === user._id
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300"
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.profilePic?.url || "/avatar.png"}
                  alt={user.fullName}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border border-base-300 hover:scale-105 transition-transform"
                  onError={(e) => (e.target.src = "/avatar.png")}
                />
                {onlineUsers?.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full ring-2 ring-white" />
                )}
              </div>

              {/* Info */}
              <div className="hidden lg:flex flex-col items-start ml-3 sm:ml-4">
                <span className="text-sm font-medium truncate">
                  {capitalizeFirstLetter(user.fullName)}
                </span>
                <span className="text-xs opacity-60">
                  {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default SideBar;
