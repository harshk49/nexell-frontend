import type { User } from "./User";

// Authentication Data Transfer Objects
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile?: string;
  profilePicture?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DeleteAccountData {
  password: string;
  confirmDeletion: boolean;
}

// Authentication Response Types
export interface AuthResponse {
  user: User;
  token?: string;
}

export interface LoginResponse extends AuthResponse {
  token: string;
}

export interface RegisterResponse extends AuthResponse {
  token: string;
}

export interface ProfilePictureUploadResponse {
  profilePictureUrl: string;
  user: User;
}

// Authentication State Types
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Token Types
export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenResponse {
  token: string;
  user: User;
}

// Session Types
export interface UserSession {
  user: User;
  token: string;
  expiresAt: Date;
  refreshToken?: string;
}
