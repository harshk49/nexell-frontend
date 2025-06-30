import { createContext } from "react";
import type {
  User,
  LoginData,
  RegisterData,
  UpdateProfileData,
} from "@/api/auth";

/**
 * Authentication Context Type
 *
 * Defines the shape of the authentication context value
 */
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: UpdateProfileData) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<void>;
  deleteProfilePicture: () => Promise<void>;
  clearError: () => void;
}

/**
 * Authentication Context
 *
 * Provides authentication state and methods throughout the application.
 * This context should be used with the AuthProvider component.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
