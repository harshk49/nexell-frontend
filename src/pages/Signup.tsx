import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthContext } from "@/contexts/hooks";
import { AuthLoading } from "@/components";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loading, error, isAuthenticated, user } = useAuthContext();

  // Get the intended destination from location state or default to home
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (password !== passwordConfirm) {
      return; // Password mismatch will be shown in real-time
    }

    if (password.length < 6) {
      return; // Password length will be shown in real-time
    }

    try {
      await register({ name, email, password, passwordConfirm });
      navigate(from, { replace: true }); // Redirect to intended destination
    } catch (err) {
      // Error is handled by the auth context
      console.error("Registration failed:", err);
    }
  };

  // Password validation helpers
  const isPasswordValid = password.length >= 6;
  const doPasswordsMatch = password === passwordConfirm;
  const showPasswordValidation = password.length > 0;
  const showConfirmValidation = passwordConfirm.length > 0;

  if (loading) {
    return (
      <AuthLoading
        message={`Hello${
          user?.name ? `, ${user.name}` : ""
        }! Creating your account...`}
      />
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
            {error && (
              <div className="p-3 text-sm text-red-600 rounded-lg bg-red-50">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
            />
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
                minLength={6}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
              />
              <span
                className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {showPasswordValidation && (
              <div className="px-4 text-xs">
                <p
                  className={`${
                    isPasswordValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Password must be at least 6 characters long
                </p>
              </div>
            )}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black placeholder:tracking-wider"
              />
              <span
                className="absolute text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {showConfirmValidation && (
              <div className="px-4 text-xs">
                <p
                  className={`${
                    doPasswordsMatch ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Passwords must match
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={
                loading ||
                !isPasswordValid ||
                !doPasswordsMatch ||
                !name ||
                !email
              }
              className="w-full py-3 text-white transition bg-black rounded-full hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
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
