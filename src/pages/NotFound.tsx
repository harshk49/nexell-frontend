import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/hooks";

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  const handleGoHome = () => {
    navigate(isAuthenticated ? "/" : "/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50/90 via-white/70 to-slate-50/90 backdrop-blur-2xl">
      <div className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <img
            src="/404.svg"
            alt="404 - Page Not Found"
            className="object-contain w-96 h-96"
          />
        </div>

        <button
          onClick={handleGoHome}
          className="px-6 py-3 text-white transition bg-black rounded-full hover:bg-gray-800"
        >
          {isAuthenticated ? "Go to Home" : "Go to Login"}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
