// Generic API Response Types
export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
  error?: string;
  token?: string;
}

export interface SuccessResponse<T = unknown> {
  status: "success";
  message?: string;
  data: T;
  token?: string;
}

export interface ErrorResponse {
  status: "error";
  message: string;
  error?: string;
  errors?: Record<string, string>; // For validation errors
}

// Pagination Types
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// API Error Types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export interface ValidationError extends ApiError {
  code: "VALIDATION_ERROR";
  fields: Record<string, string>;
}

export interface AuthenticationError extends ApiError {
  code: "AUTH_ERROR";
  status: 401;
}

export interface AuthorizationError extends ApiError {
  code: "AUTHORIZATION_ERROR";
  status: 403;
}

export interface NotFoundError extends ApiError {
  code: "NOT_FOUND";
  status: 404;
}

export interface RateLimitError extends ApiError {
  code: "RATE_LIMIT";
  status: 429;
  retryAfter?: number;
  resetTime?: Date;
}

export interface ServerError extends ApiError {
  code: "SERVER_ERROR";
  status: 500;
}

// Rate Limiting Types
export interface RateLimitHeaders {
  "X-RateLimit-Limit": string;
  "X-RateLimit-Remaining": string;
  "X-RateLimit-Reset": string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
}

// Request Types
export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

export interface AuthenticatedRequestConfig extends RequestConfig {
  requireAuth?: boolean;
  refreshToken?: boolean;
}

// File Upload Types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  uploadedAt: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// Search and Filter Types
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

export interface FilterOption {
  label: string;
  value: string | number;
  count?: number;
}

// Notification Types
export interface ApiNotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: string;
  variant?: "primary" | "secondary" | "danger";
}
