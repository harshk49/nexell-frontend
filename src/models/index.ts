// Main Models Export
export * from "./User";
export * from "./Auth";
export * from "./Api";
export * from "./Note";
export * from "./Task";
export * from "./Folder";
export * from "./Calendar";

// Common Types
export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserOwnedEntity extends BaseEntity {
  userId: string;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface FormState<T = Record<string, unknown>> extends LoadingState {
  data: T;
  errors: Record<string, string>;
  isDirty: boolean;
  isValid: boolean;
}

export interface ListState<T> extends LoadingState {
  items: T[];
  selectedItems: string[];
  filters: Record<string, unknown>;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchQuery?: string;
}

export interface PaginatedListState<T> extends ListState<T> {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Modal and Dialog Types
export interface ModalState {
  isOpen: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closable?: boolean;
}

export interface ConfirmDialogState extends ModalState {
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Theme and Settings Types
export interface AppTheme {
  mode: "light" | "dark" | "system";
  primaryColor: string;
  fontSize: "sm" | "md" | "lg";
  compact: boolean;
}

export interface AppSettings {
  theme: AppTheme;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  notifications: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    allowAnalytics: boolean;
  };
}

// Search and Navigation Types
export interface SearchResult<T = unknown> {
  type: "note" | "task" | "folder" | "event";
  item: T;
  score: number;
  highlights: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  path: string;
  badge?: string | number;
  children?: NavigationItem[];
}

export interface Breadcrumb {
  label: string;
  path?: string;
  isActive?: boolean;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type EntityId = string;

export type Timestamp = string;

export type Color = string;

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type SortOrder = "asc" | "desc";

export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ComponentVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
