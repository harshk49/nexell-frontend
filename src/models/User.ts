// User Model Types
export interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  profilePicture?: ProfilePicture | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProfilePicture {
  url: string;
  publicId: string;
  originalName: string;
}

// User-related data transfer objects
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile?: string;
  profilePicture?: string;
}

export interface UpdateUserData {
  name?: string;
  mobile?: string;
  profilePicture?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
  profilePicture?: ProfilePicture | null;
  createdAt: string;
  updatedAt: string;
}

// User preferences and settings
export interface UserPreferences {
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  language: string;
  timezone: string;
}

// User activity and status
export interface UserActivity {
  lastLogin: string;
  isOnline: boolean;
  lastSeen: string;
}

export interface UserStats {
  totalNotes: number;
  totalTasks: number;
  completedTasks: number;
  totalFolders: number;
}
