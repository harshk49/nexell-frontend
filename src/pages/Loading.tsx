import React from "react";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const location = useLocation();
  const userName = location.state?.userName || "User Name";
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <h1 className="text-white text-4xl ">Hello, {userName}</h1>
    </div>
  );
};

export default Loading;
