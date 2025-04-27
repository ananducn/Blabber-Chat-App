import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const ChatContainer = () => {
  const { selectedUser, message, getMessages } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-4 border-b border-base-200">
        <h3 className="text-lg font-semibold text-neutral-content">
          Chat with {capitalizeFirstLetter(selectedUser?.fullName)}
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {message.length ? (
          message.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-2 rounded-lg ${
                msg.fromSelf
                  ? "bg-primary text-primary-content ml-auto"
                  : "bg-base-300 text-base-content"
              }`}
            >
              {msg.message}
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-content opacity-70">
            No messages yet.
          </p>
        )}
      </div>
      <div className="p-4 border-t border-base-200">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
