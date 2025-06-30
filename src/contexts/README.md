# Models and Contexts Documentation

This documentation covers the type definitions (models) and React contexts for the Nexell Frontend application.

## Structure

```
src/
├── models/                 # Type definitions and interfaces
│   ├── index.ts           # Main exports
│   ├── User.ts            # User-related types
│   ├── Auth.ts            # Authentication types
│   ├── Api.ts             # API response types
│   ├── Note.ts            # Note-related types
│   ├── Task.ts            # Task-related types
│   ├── Folder.ts          # Folder-related types
│   └── Calendar.ts        # Calendar/Event types
│
└── contexts/              # React contexts for state management
    ├── index.tsx          # Provider components exports
    ├── hooks.ts           # Context hooks exports
    ├── auth.ts            # Auth context definition
    ├── AuthContext.tsx    # Auth provider component
    ├── useAuthContext.ts  # Auth context hook
    ├── AppContext.tsx     # App provider component
    └── useAppContext.ts   # App context hook
```

## Models (Type Definitions)

### Core Models

#### User Types (`User.ts`)

```typescript
import type {
  User,
  ProfilePicture,
  CreateUserData,
  UpdateUserData,
} from "@/models";

// Main user interface
interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  profilePicture?: ProfilePicture | null;
  createdAt: string;
  updatedAt: string;
}
```

#### Authentication Types (`Auth.ts`)

```typescript
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  AuthContextType,
} from "@/models";

// Login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data
interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile?: string;
}
```

#### API Types (`Api.ts`)

```typescript
import type { ApiResponse, SuccessResponse, ErrorResponse } from "@/models";

// Generic API response
interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
  error?: string;
  token?: string;
}
```

### Domain Models

#### Notes (`Note.ts`)

```typescript
import type { Note, CreateNoteData, UpdateNoteData } from "@/models";
```

#### Tasks (`Task.ts`)

```typescript
import type { Task, CreateTaskData, TaskStatus, TaskPriority } from "@/models";
```

#### Folders (`Folder.ts`)

```typescript
import type { Folder, CreateFolderData, FolderTree } from "@/models";
```

#### Calendar (`Calendar.ts`)

```typescript
import type { CalendarEvent, CreateEventData, EventStatus } from "@/models";
```

### Usage Example

```typescript
// Import specific types
import type { User, LoginCredentials, Note, Task } from "@/models";

// Use in component
interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<User>;
}

function LoginForm({ onLogin }: LoginFormProps) {
  // Component implementation
}
```

## Contexts (State Management)

### Authentication Context

#### Setup

```typescript
import { AuthProvider } from "@/contexts";

function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}
```

#### Usage

```typescript
import { useAuthContext } from "@/contexts/hooks";

function LoginComponent() {
  const { user, login, logout, loading, error, isAuthenticated } =
    useAuthContext();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      // User is now logged in
    } catch (err) {
      // Handle error
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          Welcome, {user?.name}!<button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
```

### App Context

#### Setup

```typescript
import { AppProvider } from "@/contexts";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <YourAppComponents />
      </AuthProvider>
    </AppProvider>
  );
}
```

#### Usage

```typescript
import { useAppContext } from "@/contexts/hooks";

function ThemeToggle() {
  const { theme, toggleTheme, updateTheme } = useAppContext();

  return <button onClick={toggleTheme}>Current: {theme.mode} mode</button>;
}

function NotificationExample() {
  const { addNotification, notifications } = useAppContext();

  const showSuccess = () => {
    addNotification({
      type: "success",
      title: "Success!",
      message: "Operation completed successfully.",
    });
  };

  return (
    <div>
      <button onClick={showSuccess}>Show Success</button>
      <div>
        {notifications.map((notification) => (
          <div key={notification.id}>
            {notification.title}: {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Combined Providers

For convenience, use the combined providers:

```typescript
import { Providers } from "@/contexts";

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Providers>
  );
}
```

## Best Practices

### Type Safety

```typescript
// Always use proper typing
import type { User } from "@/models";

// Good
const updateUser = (user: User, updates: Partial<User>): User => {
  return { ...user, ...updates };
};

// Avoid 'any'
const updateUser = (user: any, updates: any): any => {
  return { ...user, ...updates };
};
```

### Context Usage

```typescript
// Always check for context availability
function MyComponent() {
  const { user } = useAuthContext(); // This will throw if outside provider

  // Or use optional chaining if context might not be available
  return <div>{user?.name}</div>;
}
```

### Error Handling

```typescript
function LoginForm() {
  const { login, error, clearError } = useAuthContext();

  useEffect(() => {
    // Clear errors when component mounts
    clearError();
  }, [clearError]);

  const handleSubmit = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
    } catch (err) {
      // Error is automatically set in context
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error">
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}
      {/* Form fields */}
    </form>
  );
}
```

### Loading States

```typescript
function Dashboard() {
  const { user, loading } = useAuthContext();
  const { globalLoading } = useAppContext();

  if (loading || globalLoading) {
    return <LoadingSpinner />;
  }

  return <DashboardContent user={user} />;
}
```

## Advanced Usage

### Custom Context Hooks

```typescript
// Create custom hooks that combine multiple contexts
import { useAuthContext } from "@/contexts/hooks";
import { useAppContext } from "@/contexts/hooks";

export const useDashboard = () => {
  const { user, isAuthenticated } = useAuthContext();
  const { theme, notifications } = useAppContext();

  return {
    user,
    isAuthenticated,
    theme,
    hasNotifications: notifications.length > 0,
  };
};
```

### Type Guards

```typescript
import type { User } from "@/models";

// Type guard for user authentication
export const isAuthenticatedUser = (user: User | null): user is User => {
  return user !== null && typeof user._id === "string";
};

// Usage
function UserProfile() {
  const { user } = useAuthContext();

  if (!isAuthenticatedUser(user)) {
    return <LoginPrompt />;
  }

  // TypeScript now knows user is not null
  return <div>Welcome, {user.name}!</div>;
}
```

This structure provides a solid foundation for type-safe state management and consistent data handling throughout your application.
