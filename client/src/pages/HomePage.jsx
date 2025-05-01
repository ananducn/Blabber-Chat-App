import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center  ">
        <div className="bg-base-100  rounded-lg shadow-cl w-full  h-screen">
          <div className="flex h-full rounded-lg overflow-hidden pt-16">
            <SideBar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
