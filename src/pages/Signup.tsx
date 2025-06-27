import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const carouselImages = [
    "/Auth Page/Add notes-bro.svg",
    "/Auth Page/Checklist-bro.svg",
    "/Auth Page/Team spirit-bro.svg",
    "/Auth Page/Good team-bro.svg",
  ];
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/loading");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <h1 className="text-4xl font-bold text-white">Hello, User Name</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Signup Form */}
      <div className="flex flex-col items-center justify-between w-1/2 h-screen px-10 py-8">
        <div className="flex flex-col justify-center flex-grow w-full max-w-md gap-8">
          <h1 className="mb-2 text-5xl font-normal text-center">
            Create Account
          </h1>
          <p className="mb-3 text-sm text-center text-gray-600">
            Join <strong>Nexell's App</strong> and start your productivity
            journey today.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
              />
              <span
                className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
              />
              <span
                className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white transition bg-black rounded-full hover:bg-gray-900"
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
            <button className="p-3 text-white bg-black rounded-full">
              <FaGoogle />
            </button>
            <button className="p-3 text-white bg-black rounded-full">
              <FaApple />
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>

      {/* Right side - Blue gradient box with rounded borders */}
      <div className="flex items-start justify-center w-1/2 h-screen p-10">
        <div className="flex flex-col items-center justify-center w-full p-8 mt-8 bg-gradient-to-t from-white via-neutral-100 to-neutral-200 rounded-3xl h-4/5">
          <img
            src={carouselImages[carouselIndex]}
            alt="Signup carousel illustration"
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
