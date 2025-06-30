// Validation utilities for authentication
export const validation = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   * Requirements: min 8 chars, uppercase, lowercase, number, special char
   */
  isValidPassword: (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  },

  /**
   * Validate phone number format
   */
  isValidMobile: (mobile: string): boolean => {
    const mobileRegex = /^\+?[\d\s-()]+$/;
    return mobileRegex.test(mobile);
  },

  /**
   * Validate name length and format
   */
  isValidName: (name: string): boolean => {
    return name.length > 0 && name.length <= 100;
  },

  /**
   * Get detailed password validation errors
   */
  getPasswordErrors: (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[@$!%*?&]/.test(password)) {
      errors.push(
        "Password must contain at least one special character (@$!%*?&)"
      );
    }

    return errors;
  },

  /**
   * Validate registration data
   */
  validateRegisterData: (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    mobile?: string;
  }): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    // Validate name
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (!validation.isValidName(data.name)) {
      errors.name = "Name must be between 1 and 100 characters";
    }

    // Validate email
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!validation.isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!data.password) {
      errors.password = "Password is required";
    } else if (!validation.isValidPassword(data.password)) {
      const passwordErrors = validation.getPasswordErrors(data.password);
      errors.password = passwordErrors.join(". ");
    }

    // Validate password confirmation
    if (!data.passwordConfirm) {
      errors.passwordConfirm = "Password confirmation is required";
    } else if (data.password !== data.passwordConfirm) {
      errors.passwordConfirm = "Passwords do not match";
    }

    // Validate mobile (optional)
    if (data.mobile && !validation.isValidMobile(data.mobile)) {
      errors.mobile = "Please enter a valid phone number";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Validate login data
   */
  validateLoginData: (data: {
    email: string;
    password: string;
  }): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!validation.isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  /**
   * Validate update profile data
   */
  validateUpdateProfileData: (data: {
    name?: string;
    mobile?: string;
  }): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (data.name !== undefined) {
      if (!data.name.trim()) {
        errors.name = "Name cannot be empty";
      } else if (!validation.isValidName(data.name)) {
        errors.name = "Name must be between 1 and 100 characters";
      }
    }

    if (data.mobile !== undefined && data.mobile.trim() !== "") {
      if (!validation.isValidMobile(data.mobile)) {
        errors.mobile = "Please enter a valid phone number";
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
