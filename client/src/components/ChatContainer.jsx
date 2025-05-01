import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner.jsx";
import { useAuthStore } from "../store/useAuthStore";
import { format } from "date-fns";

const ChatContainer = () => {
  const {
    selectedUser,
    message,
    getMessages,
    isMessageLoading,
    subscribeToNewMessages,
    unSubscribeToNewMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToNewMessages();
      return () => {
        unSubscribeToNewMessages();
      };
    }
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToNewMessages,
    unSubscribeToNewMessages,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center w-full h-full text-center text-sm sm:text-base opacity-50 px-4">
        Select a user to start chatting
      </div>
    );
  }

  if (isMessageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-full w-full bg-base-200">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-2 py-3 sm:p-4 space-y-3 sm:space-y-4">
        {message.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="w-6 sm:w-8 rounded-full">
                <img
                  src={
                    msg.senderId === authUser._id
                      ? authUser.profilePic?.url || "/avatar.png"
                      : selectedUser.profilePic?.url || "/avatar.png"
                  }
                  alt="avatar"
                />
              </div>
            </div>

            {/* Header */}
            <div className="chat-header text-[11px] sm:text-xs">
              {msg.senderId === selectedUser._id
                ? selectedUser.fullName
                : "You"}
            </div>

            {/* Message Bubble */}
            <div
              className={`chat-bubble text-xs sm:text-sm ${
                msg.senderId === selectedUser._id ? "" : "chat-bubble-primary"
              }`}
            >
              {msg.text}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="sent-img"
                  className="mt-2 max-w-[50vw] sm:max-w-[200px] rounded-md shadow-sm"
                />
              )}
            </div>

            {/* Time */}
            <div className="chat-footer opacity-50 text-[10px] sm:text-xs mt-1">
              {msg.createdAt && (
                <span>{format(new Date(msg.createdAt), "hh:mm a")}</span>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
