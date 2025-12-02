/**
 * Constants Index
 *
 * Central export point for all constants, design tokens, and enums.
 * This makes it easy to import constants throughout the application.
 *
 * @fileoverview Main export for application constants
 * @author Template React Native Team
 * @version 1.0.0
 * @usage Import constants from this central location
 */

// Export all design system tokens
export * from './design';

// Export all enums
export * from './enums';

/**
 * Application constants
 */
export const APP_CONFIG = {
  /** App name */
  NAME: 'React Native Template',
  /** App version */
  VERSION: '1.0.0',
  /** App description */
  DESCRIPTION: 'A comprehensive React Native template with best practices',
  /** Default language */
  DEFAULT_LANGUAGE: 'en',
  /** Supported languages */
  SUPPORTED_LANGUAGES: ['en', 'ur'],
  /** Default theme */
  DEFAULT_THEME: 'light',
  /** API timeout in milliseconds */
  API_TIMEOUT: 10000,
  /** Max retry attempts for API calls */
  MAX_RETRY_ATTEMPTS: 3,
} as const;

/**
 * Screen names constants for navigation
 */
export const SCREEN_NAMES = {
  // Main screens
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  ABOUT: 'About',
  
  // Authentication screens
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  
  // Onboarding screens
  WELCOME: 'Welcome',
  TUTORIAL: 'Tutorial',
  PERMISSIONS: 'Permissions',
  
  // Tab screens
  DASHBOARD: 'Dashboard',
  EXPLORE: 'Explore',
  FAVORITES: 'Favorites',
  NOTIFICATIONS: 'Notifications',
  
  // Modal screens
  EDIT_PROFILE: 'EditProfile',
  CHANGE_PASSWORD: 'ChangePassword',
  HELP: 'Help',
  FEEDBACK: 'Feedback',
} as const;

/**
 * API endpoints constants
 */
export const API_ENDPOINTS = {
  // Base URL (should be environment-specific)
  BASE_URL: 'https://api.example.com',
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  
  // User endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    DELETE_ACCOUNT: '/user/delete',
    CHANGE_PASSWORD: '/user/change-password',
  },
  
  // Content endpoints
  CONTENT: {
    LIST: '/content',
    DETAIL: '/content/:id',
    CREATE: '/content',
    UPDATE: '/content/:id',
    DELETE: '/content/:id',
  },
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  // Success codes
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Client error codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  
  // Server error codes
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  
  // Authentication errors
  INVALID_CREDENTIALS: 'Invalid email or password.',
  ACCOUNT_NOT_FOUND: 'Account not found.',
  ACCOUNT_DISABLED: 'Account has been disabled.',
  TOKEN_EXPIRED: 'Session expired. Please login again.',
  
  // Validation errors
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters long.',
  PASSWORDS_DONT_MATCH: 'Passwords do not match.',
  
  // General errors
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
  FEATURE_UNAVAILABLE: 'This feature is currently unavailable.',
  PERMISSION_DENIED: 'Permission denied.',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  // Authentication success
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  REGISTRATION_SUCCESS: 'Registration successful!',
  PASSWORD_RESET_SUCCESS: 'Password reset successfully!',
  
  // Profile success
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  
  // General success
  SAVE_SUCCESS: 'Changes saved successfully!',
  DELETE_SUCCESS: 'Item deleted successfully!',
  COPY_SUCCESS: 'Copied to clipboard!',
} as const;

/**
 * Validation rules
 */
export const VALIDATION = {
  // Password rules
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
  
  // Email rules
  EMAIL: {
    MAX_LENGTH: 254,
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  
  // Name rules
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    REGEX: /^[a-zA-Z\s]+$/,
  },
  
  // Username rules
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    REGEX: /^[a-zA-Z0-9_]+$/,
  },
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  // Pagination
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Search
  SEARCH_DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 3,
  MAX_SEARCH_RESULTS: 50,
  
  // Cache
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_CACHE_SIZE: 50,
  
  // Animation
  ANIMATION_DURATION: 300,
  STAGGER_DELAY: 100,
  
  // Retry
  RETRY_DELAY: 1000,
  EXPONENTIAL_BACKOFF: true,
} as const;

/**
 * Feature flags
 */
export const FEATURE_FLAGS = {
  // Development features
  DEBUG_MODE: __DEV__,
  ENABLE_LOGGING: __DEV__,
  SHOW_PERFORMANCE_METRICS: __DEV__,
  
  // Production features
  ENABLE_ANALYTICS: true,
  ENABLE_CRASH_REPORTING: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_BIOMETRIC_AUTH: true,
  
  // Experimental features
  ENABLE_OFFLINE_MODE: false,
  ENABLE_VOICE_COMMANDS: false,
  ENABLE_AR_FEATURES: false,
} as const;

/**
 * Type exports for constants
 */
export type ScreenName = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type SuccessMessageKey = keyof typeof SUCCESS_MESSAGES;