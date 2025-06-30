# Authentication API Documentation

This folder contains the complete authentication system for the Nexell Frontend application, implementing all authentication-related functionality based on the backend API specification.

## Structure

```
src/api/auth/
├── index.ts              # Main exports
├── types.ts              # TypeScript type definitions
├── tokenUtils.ts         # JWT token management utilities
├── validation.ts         # Form validation utilities
├── errorHandling.ts      # Error handling classes and utilities
├── authService.ts        # Core authentication service
├── hooks.ts              # React hooks for auth functionality
├── context.tsx           # React context provider
├── useAuthContext.ts     # Context hook
├── components.tsx        # Protected route components
└── README.md            # This documentation
```

## Quick Start

### 1. Basic Setup

```typescript
import { AuthProvider } from "@/api/auth";

// Wrap your app with the AuthProvider
function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}
```

### 2. Using Authentication in Components

```typescript
import { useAuthContext } from "@/api/auth";

function LoginForm() {
  const { login, loading, error } = useAuthContext();

  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      // Redirect to dashboard or home
    } catch (err) {
      // Error is automatically set in context
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

### 3. Protected Routes

```typescript
import { ProtectedRoute } from "@/api/auth";

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Protected dashboard content</div>
    </ProtectedRoute>
  );
}
```

## API Reference

### Core Service

#### `authService`

The main authentication service with all API methods:

```typescript
import { authService } from "@/api/auth";

// Registration
const user = await authService.register({
  name: "John Doe",
  email: "john@example.com",
  password: "SecurePass123!",
  passwordConfirm: "SecurePass123!",
  mobile: "+1234567890",
});

// Login
const user = await authService.login({
  email: "john@example.com",
  password: "SecurePass123!",
});

// Get current user
const user = await authService.getCurrentUser();

// Update profile
const updatedUser = await authService.updateProfile({
  name: "John Updated",
  mobile: "+1987654321",
});

// Upload profile picture
const result = await authService.uploadProfilePicture(file);

// Password reset flow
await authService.forgotPassword("john@example.com");
await authService.resetPassword({
  token: "reset-token",
  password: "NewPass123!",
  passwordConfirm: "NewPass123!",
});

// Logout
await authService.logout();

// Delete account
await authService.deleteAccount("currentPassword");
```

### React Hooks

#### `useAuthContext()`

Access authentication state and methods:

```typescript
const {
  user, // Current user object or null
  loading, // Loading state
  error, // Error message or null
  isAuthenticated, // Boolean auth status
  login, // Login function
  register, // Register function
  logout, // Logout function
  updateProfile, // Update profile function
  uploadProfilePicture, // Upload picture function
  deleteProfilePicture, // Delete picture function
  clearError, // Clear error function
} = useAuthContext();
```

#### `usePasswordReset()`

Handle password reset functionality:

```typescript
const {
  loading,
  error,
  success,
  forgotPassword, // Request reset function
  resetPassword, // Reset with token function
  clearMessages, // Clear messages function
} = usePasswordReset();
```

#### `useFormValidation()`

Handle form validation:

```typescript
const {
  errors, // Validation errors object
  validateField, // Validate single field
  setFieldError, // Set field error
  clearFieldError, // Clear field error
  clearAllErrors, // Clear all errors
} = useFormValidation();
```

### Utilities

#### `tokenUtils`

JWT token management:

```typescript
import { tokenUtils } from "@/api/auth";

tokenUtils.setToken("jwt-token");
const token = tokenUtils.getToken();
const isExpired = tokenUtils.isTokenExpired(token);
const isValid = tokenUtils.checkAuthStatus();
tokenUtils.removeToken();
```

#### `validation`

Form validation utilities:

```typescript
import { validation } from "@/api/auth";

const isValidEmail = validation.isValidEmail("test@example.com");
const isValidPassword = validation.isValidPassword("Password123!");
const passwordErrors = validation.getPasswordErrors("weak");

const { isValid, errors } = validation.validateRegisterData({
  name: "John",
  email: "john@example.com",
  password: "Password123!",
  passwordConfirm: "Password123!",
});
```

#### `errorHandlers`

Error handling utilities:

```typescript
import { errorHandlers, AuthError, RateLimitError } from "@/api/auth";

try {
  // Some API call
} catch (error) {
  if (errorHandlers.isAuthError(error)) {
    // Handle authentication error
  } else if (errorHandlers.isRateLimitError(error)) {
    // Handle rate limit
  }

  const message = errorHandlers.getErrorMessage(error);
  const fieldErrors = errorHandlers.getValidationErrors(error);
}
```

### Components

#### `<ProtectedRoute>`

Protect routes that require authentication:

```typescript
<ProtectedRoute fallback={<div>Please login</div>} redirectTo="/login">
  <PrivateComponent />
</ProtectedRoute>
```

#### `<AuthenticatedOnly>`

Show content only to authenticated users:

```typescript
<AuthenticatedOnly fallback={<LoginPrompt />}>
  <UserMenu />
</AuthenticatedOnly>
```

#### `<UnauthenticatedOnly>`

Show content only to unauthenticated users:

```typescript
<UnauthenticatedOnly fallback={<UserDashboard />}>
  <LoginForm />
</UnauthenticatedOnly>
```

## Error Handling

The system includes comprehensive error handling:

### Error Types

- **`ApiError`**: Generic API errors
- **`AuthError`**: Authentication-related errors
- **`RateLimitError`**: Rate limiting errors
- **`ValidationError`**: Form validation errors

### Automatic Error Handling

- **401 Unauthorized**: Automatically clears tokens and redirects to login
- **429 Rate Limited**: Provides wait time information
- **400 Validation**: Extracts field-specific error messages

### Manual Error Handling

```typescript
try {
  await authService.login(credentials);
} catch (error) {
  if (error instanceof AuthError) {
    // Handle auth error
  } else if (error instanceof RateLimitError) {
    console.log(`Wait ${error.waitTimeMinutes} minutes`);
  } else if (error instanceof ValidationError) {
    console.log("Field errors:", error.fields);
  }
}
```

## Best Practices

### 1. Token Security

- Tokens are stored in localStorage by default
- Consider using httpOnly cookies for production
- Tokens are automatically included in API requests
- Expired tokens are automatically cleared

### 2. Error Handling

- Always handle errors in your components
- Use the provided error handling utilities
- Show user-friendly error messages
- Clear errors when appropriate

### 3. Form Validation

- Validate on the client side for better UX
- Server-side validation is still enforced
- Use the provided validation utilities
- Show field-specific error messages

### 4. Loading States

- Always show loading indicators during async operations
- Disable form submissions during loading
- Provide feedback to users

### 5. Route Protection

- Use `<ProtectedRoute>` for pages requiring authentication
- Provide fallback content for better UX
- Consider different redirect strategies

## Environment Variables

Make sure these environment variables are set:

```env
VITE_API_BASE_URL=https://nexell-backend.onrender.com/api
```

## Rate Limiting

Be aware of these rate limits:

- **Register**: 5 attempts per 15 minutes
- **Login**: 5 attempts per 15 minutes
- **Forgot Password**: 3 attempts per 15 minutes
- **Reset Password**: 3 attempts per 15 minutes

Rate limit errors include wait time information to help users understand when they can try again.

## Password Requirements

Passwords must meet these requirements:

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%\*?&)

Use the `validation.getPasswordErrors()` function to get detailed validation feedback.
