import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-16 h-16 border-8 border-dashed border-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
