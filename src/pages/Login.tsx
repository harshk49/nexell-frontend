import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/loading", { state: { userName } });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <h1 className="text-white text-4xl font-bold">
          Hello, {userName || "User Name"}
        </h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Login Form */}
      <div className="w-1/2 flex flex-col items-center px-10 py-8 justify-between h-screen">
        <div className="w-full max-w-md flex flex-col gap-8 flex-grow justify-center">
          <h1 className="text-5xl font-semibold mb-2 text-center">
            Welcome back!
          </h1>
          <p className="text-sm text-gray-600 mb-3 text-center">
            Simplify your workflow and boost your productivity with{" "}
            <strong>Nexell's App</strong>. Get started for free.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider pr-12"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex justify-end text-sm text-black">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-900 transition"
            >
              Login
            </button>
          </form>

          <div className=" flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center space-x-4">
            <button className="p-3 bg-black rounded-full text-white">
              <FaGoogle />
            </button>
            <button className="p-3 bg-black rounded-full text-white">
              <FaApple />
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Not a member?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Register now
          </a>
        </p>
      </div>

      {/* Right side - Blue gradient box with rounded borders */}
      <div className="w-1/2 flex justify-center p-10 h-screen items-start">
        <div className="bg-gradient-to-t from-white via-neutral-100 to-neutral-200 rounded-3xl w-full h-4/5 p-8 flex justify-center mt-8">
          {/* Content can be added here later */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
