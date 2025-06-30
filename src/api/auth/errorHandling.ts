import { tokenUtils } from "./tokenUtils";
import type { RateLimitHeaders } from "./types";

// Custom Error Classes
export class ApiError extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export class AuthError extends ApiError {
  constructor(message: string, status?: number) {
    super(message, status, "AUTH_ERROR");
    this.name = "AuthError";
  }
}

export class RateLimitError extends ApiError {
  public resetTime?: Date;
  public waitTimeMinutes?: number;

  constructor(message: string, resetTime?: Date, waitTimeMinutes?: number) {
    super(message, 429, "RATE_LIMIT");
    this.name = "RateLimitError";
    this.resetTime = resetTime;
    this.waitTimeMinutes = waitTimeMinutes;
  }
}

export class ValidationError extends ApiError {
  public fields?: Record<string, string>;

  constructor(message: string, fields?: Record<string, string>) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
    this.fields = fields;
  }
}

// Error handling utilities
export const errorHandlers = {
  /**
   * Handle API response errors
   */
  handleApiError: async (response: Response): Promise<never> => {
    let errorData: { message?: string; errors?: Record<string, string> } = {};

    try {
      errorData = await response.json();
    } catch {
      // If response is not JSON, use status text
      errorData = { message: response.statusText };
    }

    const status = response.status;
    const message = errorData.message || `HTTP error! status: ${status}`;

    if (status === 401) {
      // Token expired or invalid
      tokenUtils.removeToken();
      // Redirect to login if we're in a browser environment
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new AuthError("Authentication required. Please log in again.", 401);
    }

    if (status === 429) {
      // Rate limit exceeded
      const resetTime = response.headers.get("X-RateLimit-Reset");
      const resetDate = resetTime
        ? new Date(parseInt(resetTime) * 1000)
        : undefined;
      const waitTime = resetDate
        ? Math.ceil((resetDate.getTime() - Date.now()) / 1000 / 60)
        : undefined;

      const rateLimitMessage = waitTime
        ? `Rate limit exceeded. Please try again in ${waitTime} minutes.`
        : "Rate limit exceeded. Please try again later.";

      throw new RateLimitError(rateLimitMessage, resetDate, waitTime);
    }

    if (status === 400 && errorData.errors) {
      // Validation error with field-specific errors
      throw new ValidationError(message, errorData.errors);
    }

    // Generic API error
    throw new ApiError(message, status);
  },

  /**
   * Check if error is an authentication error
   */
  isAuthError: (error: unknown): error is AuthError => {
    return error instanceof AuthError;
  },

  /**
   * Check if error is a rate limit error
   */
  isRateLimitError: (error: unknown): error is RateLimitError => {
    return error instanceof RateLimitError;
  },

  /**
   * Check if error is a validation error
   */
  isValidationError: (error: unknown): error is ValidationError => {
    return error instanceof ValidationError;
  },

  /**
   * Get user-friendly error message
   */
  getErrorMessage: (error: unknown): string => {
    if (error instanceof ApiError) {
      return error.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "An unexpected error occurred";
  },

  /**
   * Get validation field errors
   */
  getValidationErrors: (error: unknown): Record<string, string> => {
    if (error instanceof ValidationError && error.fields) {
      return error.fields;
    }
    return {};
  },

  /**
   * Parse rate limit headers
   */
  parseRateLimitHeaders: (headers: Headers): Partial<RateLimitHeaders> => {
    return {
      "X-RateLimit-Limit": headers.get("X-RateLimit-Limit") || undefined,
      "X-RateLimit-Remaining":
        headers.get("X-RateLimit-Remaining") || undefined,
      "X-RateLimit-Reset": headers.get("X-RateLimit-Reset") || undefined,
    };
  },
};
