import React from "react";

interface AuthLoadingProps {
  message?: string;
  userName?: string;
}

/**
 * AuthLoading Component
 *
 * A loading screen specifically for authentication flows (login/signup)
 * Shows a personalized message when user name is available
 */
export const AuthLoading: React.FC<AuthLoadingProps> = ({
  message = "Please wait...",
  userName,
}) => {
  const displayMessage = userName ? `Hello, ${userName}!` : message;

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">{displayMessage}</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};
