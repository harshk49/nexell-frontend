// Main authentication exports
export { authService, default as AuthService } from "./authService";
export { tokenUtils } from "./tokenUtils";
export { validation } from "./validation";
export {
  errorHandlers,
  ApiError,
  AuthError,
  RateLimitError,
  ValidationError,
} from "./errorHandling";

// React hooks
export { useAuth, usePasswordReset, useFormValidation } from "./hooks";

// Export all types
export type {
  User,
  RegisterData,
  LoginData,
  UpdateProfileData,
  ResetPasswordData,
  ForgotPasswordData,
  DeleteAccountData,
  ApiResponse,
  AuthResponse,
  ProfilePictureResponse,
  ApiError as ApiErrorType,
  RateLimitHeaders,
} from "./types";
