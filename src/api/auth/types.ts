// Auth Types
export interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  profilePicture?: {
    url: string;
    publicId: string;
    originalName: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile?: string;
  profilePicture?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  mobile?: string;
  profilePicture?: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  passwordConfirm: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface DeleteAccountData {
  password: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  token?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: User;
}

export interface ProfilePictureResponse {
  profilePictureUrl: string;
  user: User;
}

// Error Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface RateLimitHeaders {
  "X-RateLimit-Limit": string;
  "X-RateLimit-Remaining": string;
  "X-RateLimit-Reset": string;
}
