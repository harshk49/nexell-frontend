import { apiClient } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { tokenUtils } from "./tokenUtils";
import { errorHandlers } from "./errorHandling";
import type {
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
} from "./types";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
class AuthService {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  async register(userData: RegisterData): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.auth.register,
        userData
      );

      if (response.status === "success" && response.token && response.data) {
        tokenUtils.setToken(response.token);
        return response.data.user;
      }

      throw new Error(response.message || "Registration failed");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  async login(credentials: LoginData): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.auth.login,
        credentials
      );

      if (response.status === "success" && response.token && response.data) {
        tokenUtils.setToken(response.token);
        return response.data.user;
      }

      throw new Error(response.message || "Login failed");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  /**
   * Logout user
   * POST /api/auth/logout
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post<ApiResponse>(API_ENDPOINTS.auth.logout);
    } catch (error) {
      console.error("Logout request failed:", error);
      // Still remove token locally even if server request fails
    } finally {
      tokenUtils.removeToken();
    }
  }

  /**
   * Get current authenticated user
   * GET /api/auth/me
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.auth.me
      );

      if (response.status === "success" && response.data) {
        return response.data.user;
      }

      throw new Error(response.message || "Failed to get current user");
    } catch (error) {
      console.error("Failed to get current user:", error);

      // If auth error, handle token cleanup
      if (errorHandlers.isAuthError(error)) {
        tokenUtils.removeToken();
      }

      throw error;
    }
  }

  /**
   * Update user profile
   * PATCH /api/auth/me
   */
  async updateProfile(profileData: UpdateProfileData): Promise<User> {
    try {
      const response = await apiClient.patch<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.auth.me,
        profileData
      );

      if (response.status === "success" && response.data) {
        return response.data.user;
      }

      throw new Error(response.message || "Profile update failed");
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  }

  /**
   * Request password reset
   * POST /api/auth/forgot-password
   */
  async forgotPassword(email: string): Promise<string> {
    try {
      const requestData: ForgotPasswordData = { email };
      const response = await apiClient.post<ApiResponse>(
        API_ENDPOINTS.auth.forgotPassword,
        requestData
      );

      if (response.status === "success") {
        return response.message || "Password reset email sent successfully";
      }

      throw new Error(response.message || "Password reset request failed");
    } catch (error) {
      console.error("Password reset request failed:", error);
      throw error;
    }
  }

  /**
   * Reset password with token
   * POST /api/auth/reset-password
   */
  async resetPassword(resetData: ResetPasswordData): Promise<User> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.auth.resetPassword,
        resetData
      );

      if (response.status === "success" && response.token && response.data) {
        tokenUtils.setToken(response.token);
        return response.data.user;
      }

      throw new Error(response.message || "Password reset failed");
    } catch (error) {
      console.error("Password reset failed:", error);
      throw error;
    }
  }

  /**
   * Upload profile picture
   * POST /api/auth/upload-profile-picture
   */
  async uploadProfilePicture(file: File): Promise<ProfilePictureResponse> {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const token = tokenUtils.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(API_ENDPOINTS.auth.uploadProfilePicture, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type header for FormData - browser will set it with boundary
        },
        body: formData,
      });

      if (!response.ok) {
        await errorHandlers.handleApiError(response);
      }

      const data = await response.json();

      if (data.status === "success" && data.data) {
        return {
          profilePictureUrl: data.data.profilePictureUrl,
          user: data.data.user,
        };
      }

      throw new Error(data.message || "Profile picture upload failed");
    } catch (error) {
      console.error("Profile picture upload failed:", error);
      throw error;
    }
  }

  /**
   * Delete profile picture
   * DELETE /api/auth/delete-profile-picture
   */
  async deleteProfilePicture(): Promise<User> {
    try {
      const response = await apiClient.delete<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.auth.deleteProfilePicture
      );

      if (response.status === "success" && response.data) {
        return response.data.user;
      }

      throw new Error(response.message || "Profile picture deletion failed");
    } catch (error) {
      console.error("Profile picture deletion failed:", error);
      throw error;
    }
  }

  /**
   * Delete user account
   * DELETE /api/auth/me
   */
  async deleteAccount(password: string): Promise<string> {
    try {
      const requestData: DeleteAccountData = { password };
      const response = await apiClient.delete<ApiResponse>(
        API_ENDPOINTS.auth.me,
        requestData
      );

      if (response.status === "success") {
        tokenUtils.removeToken();
        return response.message || "Account deleted successfully";
      }

      throw new Error(response.message || "Account deletion failed");
    } catch (error) {
      console.error("Account deletion failed:", error);
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return tokenUtils.checkAuthStatus();
  }

  /**
   * Get current auth token
   */
  getAuthToken(): string | null {
    return tokenUtils.getToken();
  }
}

// Export singleton instance
export const authService = new AuthService();
export default AuthService;
