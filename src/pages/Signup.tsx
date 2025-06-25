import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/loading");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <h1 className="text-white text-4xl font-bold">Hello, User Name</h1>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Signup Form */}
      <div className="w-1/2 flex flex-col items-center px-10 py-8 justify-between h-screen">
        <div className="w-full max-w-md flex flex-col gap-8 flex-grow justify-center">
          <h1 className="text-5xl font-semibold mb-2 text-center">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 mb-3 text-center">
            Join <strong>Nexell's App</strong> and start your productivity
            journey today.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
            />
            <input
              type="email"
              placeholder="Email"
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
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider pr-12"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-900 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center">
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
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
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

export default Signup;
