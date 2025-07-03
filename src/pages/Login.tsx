import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthContext } from "@/contexts/hooks";
import { AuthLoading } from "@/components";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, isAuthenticated, loadingUser } =
    useAuthContext();

  // Get the intended destination from location state or default to home
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const togglePassword = () => setShowPassword((prev) => !prev);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      return;
    }

    try {
      // Call the login function from auth context
      await login({ email, password });
      navigate(from, { replace: true }); // Redirect to intended destination
    } catch (err) {
      // Error is handled by the auth context
      console.error("Login failed:", err);
    }
  };

  if (loading) {
    return (
      <AuthLoading
        message={`Welcome Back${
          loadingUser?.name ? `, ${loadingUser.name}` : ""
        }!`}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50/90 via-white/70 to-purple-50/90 backdrop-blur-2xl">
      {/* Left side - Login Form */}
      <div className="flex flex-col items-center justify-between w-1/2 h-screen px-10 py-8">
        <div className="flex flex-col justify-center flex-grow w-full max-w-md gap-8">
          <h1 className="mb-2 text-5xl font-normal text-center">
            Welcome Back
          </h1>
          <p className="mb-3 text-sm text-center text-gray-600">
            Welcome back to <strong>Nexell's App</strong>! Please sign in to
            continue.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-600 rounded-lg bg-red-50">
                {error}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
              />
              <span
                className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3 text-white transition bg-black rounded-full hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Login"}
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
          Don't have an account?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Right side - Blue gradient box with rounded borders */}
      <div className="flex items-start justify-center w-1/2 h-screen p-10">
        <div className="flex flex-col items-center justify-center w-full p-8 mt-8 bg-gradient-to-t from-white via-neutral-100 to-neutral-200 rounded-3xl h-4/5">
          <img
            src={carouselImages[carouselIndex]}
            alt="Login carousel illustration"
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
