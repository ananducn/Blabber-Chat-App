import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner.jsx";
import { useAuthStore } from "../store/useAuthStore";
import { format } from "date-fns"; // Import date-fns for formatting timestamps

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

  const messagesEndRef = useRef(null); // Ref to scroll to the bottom

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
    // Scroll to the bottom when new messages are loaded or added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]); // Re-run when the messages change

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center w-full h-full text-center text-lg opacity-50">
        Select a user to start chatting
      </div>
    );
  }

  if (isMessageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-full w-full bg-base-200">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
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
            <div className="chat-header">
              {msg.senderId === selectedUser._id
                ? selectedUser.fullName
                : "You"}
            </div>

            <div
              className={`chat-bubble ${
                msg.senderId === selectedUser._id ? "" : "chat-bubble-primary"
              }`}
            >
              {msg.text}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="sent-img"
                  className="mt-2 max-w-xs rounded-lg shadow-md"
                />
              )}
            </div>

            {/* Time Footer */}
            <div className="chat-footer opacity-50 text-xs">
              {msg.createdAt && (
                <span>
                  {format(new Date(msg.createdAt), "hh:mm a")}{" "}
                  {/* Formats time */}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Scroll to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
