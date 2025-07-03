// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`,
    forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
    resetPassword: `${API_BASE_URL}/auth/reset-password`,
    uploadProfilePicture: `${API_BASE_URL}/auth/upload-profile-picture`,
    deleteProfilePicture: `${API_BASE_URL}/auth/delete-profile-picture`,
  },

  // User endpoints
  user: {
    profile: `${API_BASE_URL}/user/profile`,
    updateProfile: `${API_BASE_URL}/user/profile`,
    deleteAccount: `${API_BASE_URL}/user/account`,
  },

  // Notes endpoints
  notes: {
    getAll: `${API_BASE_URL}/notes`,
    create: `${API_BASE_URL}/notes`,
    getById: (id: string) => `${API_BASE_URL}/notes/${id}`,
    update: (id: string) => `${API_BASE_URL}/notes/${id}`,
    delete: (id: string) => `${API_BASE_URL}/notes/${id}`,
    search: `${API_BASE_URL}/notes/search`,
  },

  // Tasks endpoints
  tasks: {
    getAll: `${API_BASE_URL}/tasks`,
    create: `${API_BASE_URL}/tasks`,
    getById: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    update: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    delete: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    updateStatus: (id: string) => `${API_BASE_URL}/tasks/${id}/status`,
  },

  // Calendar/Events endpoints
  calendar: {
    getEvents: `${API_BASE_URL}/calendar/events`,
    createEvent: `${API_BASE_URL}/calendar/events`,
    updateEvent: (id: string) => `${API_BASE_URL}/calendar/events/${id}`,
    deleteEvent: (id: string) => `${API_BASE_URL}/calendar/events/${id}`,
  },

  // Folders endpoints
  folders: {
    getAll: `${API_BASE_URL}/folders`,
    create: `${API_BASE_URL}/folders`,
    getById: (id: string) => `${API_BASE_URL}/folders/${id}`,
    update: (id: string) => `${API_BASE_URL}/folders/${id}`,
    delete: (id: string) => `${API_BASE_URL}/folders/${id}`,
  },
};

export { API_BASE_URL };
