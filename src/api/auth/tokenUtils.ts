// Token management utilities
export const tokenUtils = {
  /**
   * Store JWT token in localStorage
   */
  setToken: (token: string): void => {
    localStorage.setItem("authToken", token);
  },

  /**
   * Get JWT token from localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },

  /**
   * Remove JWT token from localStorage
   */
  removeToken: (): void => {
    localStorage.removeItem("authToken");
  },

  /**
   * Check if JWT token is expired
   */
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },

  /**
   * Check authentication status and cleanup if invalid
   */
  checkAuthStatus: (): boolean => {
    const token = tokenUtils.getToken();
    if (!token || tokenUtils.isTokenExpired(token)) {
      tokenUtils.removeToken();
      return false;
    }
    return true;
  },

  /**
   * Get token payload without verification (for display purposes only)
   */
  getTokenPayload: (token: string): Record<string, unknown> | null => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  },
};
