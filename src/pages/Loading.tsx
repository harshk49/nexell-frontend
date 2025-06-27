import { useLocation } from "react-router-dom";

const Loading = () => {
  const location = useLocation();
  const userName = location.state?.userName || "User Name";
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <h1 className="text-4xl text-white ">Hello, {userName}</h1>
    </div>
  );
};

export default Loading;
