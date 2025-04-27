import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import SideBarSkeleton from "./skeliton/SideBarSkeliton";
import { Users } from "lucide-react";

const SideBar = () => {
  const { getUsers, setSelectedUser, users, selectedUser, isUsersLoading } =
    useChatStore();

  // Simulated list of online users (replace with actual logic later)


  console.log(users);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (isUsersLoading) return <SideBarSkeleton />;

  return (
    <aside className="h-full min-w-24  lg:w-72 bg-base-200/50 backdrop-blur-md border-r border-base-300 flex flex-col transition-all">
      {/* Header */}
      <div className="p-5 border-b border-base-300 flex items-center justify-center lg:justify-start">
        <Users className="size-6" />
        <h2 className="text-xl font-bold hidden lg:block ml-3">Messages</h2>
      </div>

      {/* User List */}
      <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-2">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex flex-col lg:flex-row items-center p-3 rounded-xl transition-all ${
              selectedUser?._id === user._id
                ? "bg-primary text-primary-content"
                : "hover:bg-base-300"
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic?.url || "/avatar.png"}
                alt={user.fullName}
                className="w-12 h-12 object-cover rounded-full border-2 border-base-300 hover:scale-105 transition-transform"
                onError={(e) => (e.target.src = "/avatar.png")}
              />

              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* Info: only show on large screens */}
            <div className="hidden lg:flex flex-col items-start ml-4">
              <span className="font-semibold truncate">
                {capitalizeFirstLetter(user.fullName)}
              </span>
              <span className="text-xs opacity-60">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
