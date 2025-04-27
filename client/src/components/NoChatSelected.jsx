import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center min-h-full w-full bg-base-100 p-10 text-center">
    <div>
      <div className="text-6xl mb-6 animate-bounce">💬</div>
      <h1 className="text-4xl font-bold mb-3">Start Blabbering!</h1>
      <p className="text-base opacity-70 mb-5">
        Choose someone from the sidebar and unleash your words 🎉
      </p>
      <button className="btn btn-outline btn-primary btn-sm" disabled>
        Waiting for selection...
      </button>
    </div>
  </div>
  
  );
};

export default NoChatSelected;
