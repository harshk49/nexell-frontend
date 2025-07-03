import { useState, useEffect, useCallback } from "react";
import { authService, tokenUtils, errorHandlers } from "./index";
import type { User, LoginData, RegisterData, UpdateProfileData } from "./types";

// Hook for authentication state management
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState<User | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setError(null);

        if (tokenUtils.checkAuthStatus()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setError(errorHandlers.getErrorMessage(err));
        // Clear any invalid tokens
        tokenUtils.removeToken();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setLoadingUser(null);

      const loggedInUser = await authService.login(credentials);
      setLoadingUser(loggedInUser); // Set loading user immediately
      setUser(loggedInUser);
    } catch (err) {
      const errorMessage = errorHandlers.getErrorMessage(err);
      setError(errorMessage);
      setLoadingUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(
    async (userData: RegisterData): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        setLoadingUser(null);

        const newUser = await authService.register(userData);
        setLoadingUser(newUser); // Set loading user immediately
        setUser(newUser);
      } catch (err) {
        const errorMessage = errorHandlers.getErrorMessage(err);
        setError(errorMessage);
        setLoadingUser(null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setError(null);
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(
    async (profileData: UpdateProfileData): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const updatedUser = await authService.updateProfile(profileData);
        setUser(updatedUser);
      } catch (err) {
        const errorMessage = errorHandlers.getErrorMessage(err);
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Upload profile picture function
  const uploadProfilePicture = useCallback(
    async (file: File): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const result = await authService.uploadProfilePicture(file);
        setUser(result.user);
      } catch (err) {
        const errorMessage = errorHandlers.getErrorMessage(err);
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete profile picture function
  const deleteProfilePicture = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const updatedUser = await authService.deleteProfilePicture();
      setUser(updatedUser);
    } catch (err) {
      const errorMessage = errorHandlers.getErrorMessage(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    loadingUser,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    clearError,
  };
};

// Hook for password reset functionality
export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const message = await authService.forgotPassword(email);
      setSuccess(message);
    } catch (err) {
      const errorMessage = errorHandlers.getErrorMessage(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(
    async (resetData: {
      token: string;
      password: string;
      passwordConfirm: string;
    }): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        await authService.resetPassword(resetData);
        setSuccess("Password reset successfully");
      } catch (err) {
        const errorMessage = errorHandlers.getErrorMessage(err);
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    loading,
    error,
    success,
    forgotPassword,
    resetPassword,
    clearMessages,
  };
};

// Hook for form validation
export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback(
    async (field: string, value: unknown): Promise<string | null> => {
      // Dynamic import to avoid circular dependencies
      const { validation } = await import("./validation");

      switch (field) {
        case "email": {
          const email = value as string;
          if (!email) return "Email is required";
          if (!validation.isValidEmail(email))
            return "Please enter a valid email address";
          break;
        }

        case "password": {
          const password = value as string;
          if (!password) return "Password is required";
          if (!validation.isValidPassword(password)) {
            const passwordErrors = validation.getPasswordErrors(password);
            return passwordErrors.join(". ");
          }
          break;
        }

        case "name": {
          const name = value as string;
          if (!name) return "Name is required";
          if (!validation.isValidName(name))
            return "Name must be between 1 and 100 characters";
          break;
        }

        case "mobile": {
          const mobile = value as string;
          if (mobile && !validation.isValidMobile(mobile)) {
            return "Please enter a valid phone number";
          }
          break;
        }
      }

      return null;
    },
    []
  );

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    setFieldError,
    clearFieldError,
    clearAllErrors,
  };
};
