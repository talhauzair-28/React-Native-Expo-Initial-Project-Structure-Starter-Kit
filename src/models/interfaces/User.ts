/**
 * User Interface Definitions
 *
 * This file contains all interfaces related to user data and authentication.
 * These interfaces ensure type safety for user-related operations.
 *
 * @fileoverview User-related interface definitions
 * @author Template React Native Team
 * @version 1.0.0
 */

import { UserRole, UserStatus, Language, Theme } from '../enums';

/**
 * Base user information interface
 */
export interface BaseUser {
  /** User unique identifier */
  id: string;
  /** User email address */
  email: string;
  /** User first name */
  firstName: string;
  /** User last name */
  lastName: string;
  /** User display name */
  displayName?: string;
  /** User profile picture URL */
  avatarUrl?: string;
  /** User creation date */
  createdAt: Date;
  /** Last update date */
  updatedAt: Date;
}

/**
 * Full user interface with additional properties
 */
export interface User extends BaseUser {
  /** User role in the system */
  role: UserRole;
  /** Current user status */
  status: UserStatus;
  /** User phone number */
  phoneNumber?: string;
  /** User date of birth */
  dateOfBirth?: Date;
  /** User bio/description */
  bio?: string;
  /** User preferred language */
  preferredLanguage: Language;
  /** User preferred theme */
  preferredTheme: Theme;
  /** User timezone */
  timezone?: string;
  /** User location */
  location?: UserLocation;
  /** User preferences */
  preferences: UserPreferences;
  /** User last login date */
  lastLoginAt?: Date;
  /** Email verification status */
  isEmailVerified: boolean;
  /** Phone verification status */
  isPhoneVerified: boolean;
  /** Two-factor authentication enabled */
  isTwoFactorEnabled: boolean;
}

/**
 * User location interface
 */
export interface UserLocation {
  /** Country name */
  country?: string;
  /** Country code (ISO 3166-1 alpha-2) */
  countryCode?: string;
  /** City name */
  city?: string;
  /** State/Province name */
  state?: string;
  /** Postal/ZIP code */
  postalCode?: string;
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  /** Notification preferences */
  notifications: NotificationPreferences;
  /** Privacy preferences */
  privacy: PrivacyPreferences;
  /** Accessibility preferences */
  accessibility: AccessibilityPreferences;
  /** App-specific preferences */
  app: AppPreferences;
}

/**
 * Notification preferences interface
 */
export interface NotificationPreferences {
  /** Enable push notifications */
  pushNotifications: boolean;
  /** Enable email notifications */
  emailNotifications: boolean;
  /** Enable SMS notifications */
  smsNotifications: boolean;
  /** Notification quiet hours */
  quietHours?: {
    /** Start time for quiet hours (24-hour format) */
    start: string;
    /** End time for quiet hours (24-hour format) */
    end: string;
  };
  /** Specific notification types */
  types: {
    /** Marketing notifications */
    marketing: boolean;
    /** Security notifications */
    security: boolean;
    /** Social notifications */
    social: boolean;
    /** System notifications */
    system: boolean;
  };
}

/**
 * Privacy preferences interface
 */
export interface PrivacyPreferences {
  /** Profile visibility */
  profileVisibility: 'public' | 'friends' | 'private';
  /** Show online status */
  showOnlineStatus: boolean;
  /** Allow friend requests */
  allowFriendRequests: boolean;
  /** Show activity status */
  showActivityStatus: boolean;
  /** Data collection consent */
  dataCollectionConsent: boolean;
  /** Marketing communications consent */
  marketingConsent: boolean;
}

/**
 * Accessibility preferences interface
 */
export interface AccessibilityPreferences {
  /** Reduce motion effects */
  reduceMotion: boolean;
  /** High contrast mode */
  highContrast: boolean;
  /** Large text size */
  largeText: boolean;
  /** Screen reader support */
  screenReader: boolean;
  /** Voice commands */
  voiceCommands: boolean;
}

/**
 * App-specific preferences interface
 */
export interface AppPreferences {
  /** Auto-save enabled */
  autoSave: boolean;
  /** Default view mode */
  defaultView: 'list' | 'grid' | 'card';
  /** Items per page */
  itemsPerPage: number;
  /** Auto-refresh interval (in minutes) */
  autoRefreshInterval: number;
  /** Show tooltips */
  showTooltips: boolean;
  /** Enable animations */
  enableAnimations: boolean;
}

/**
 * User authentication interface
 */
export interface UserAuth {
  /** User ID */
  userId: string;
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
  /** Token expiration time */
  expiresAt: Date;
  /** Token type */
  tokenType: string;
  /** Granted scopes */
  scopes: string[];
}

/**
 * User session interface
 */
export interface UserSession {
  /** Session ID */
  sessionId: string;
  /** User information */
  user: User;
  /** Authentication tokens */
  auth: UserAuth;
  /** Session start time */
  startedAt: Date;
  /** Session last activity */
  lastActivityAt: Date;
  /** Session device information */
  device?: DeviceInfo;
}

/**
 * Device information interface
 */
export interface DeviceInfo {
  /** Device ID */
  id: string;
  /** Device name */
  name: string;
  /** Device type */
  type: 'mobile' | 'tablet' | 'desktop' | 'tv' | 'unknown';
  /** Operating system */
  os: string;
  /** OS version */
  osVersion: string;
  /** App version */
  appVersion: string;
  /** User agent string */
  userAgent?: string;
  /** Device fingerprint */
  fingerprint?: string;
}

/**
 * User registration request interface
 */
export interface UserRegistrationRequest {
  /** Email address */
  email: string;
  /** Password */
  password: string;
  /** Password confirmation */
  confirmPassword: string;
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Preferred language */
  preferredLanguage?: Language;
  /** Terms acceptance */
  acceptTerms: boolean;
  /** Privacy policy acceptance */
  acceptPrivacy: boolean;
  /** Marketing consent */
  marketingConsent?: boolean;
}

/**
 * User login request interface
 */
export interface UserLoginRequest {
  /** Email address or username */
  email: string;
  /** Password */
  password: string;
  /** Remember me flag */
  rememberMe?: boolean;
  /** Device information */
  device?: Partial<DeviceInfo>;
}

/**
 * User profile update request interface
 */
export interface UserUpdateRequest {
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Display name */
  displayName?: string;
  /** Bio/description */
  bio?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Date of birth */
  dateOfBirth?: Date;
  /** Location information */
  location?: Partial<UserLocation>;
  /** Profile picture URL */
  avatarUrl?: string;
}

/**
 * Password change request interface
 */
export interface PasswordChangeRequest {
  /** Current password */
  currentPassword: string;
  /** New password */
  newPassword: string;
  /** New password confirmation */
  confirmNewPassword: string;
}

/**
 * Password reset request interface
 */
export interface PasswordResetRequest {
  /** Email address */
  email: string;
}

/**
 * Password reset confirmation interface
 */
export interface PasswordResetConfirmRequest {
  /** Reset token */
  token: string;
  /** New password */
  newPassword: string;
  /** New password confirmation */
  confirmNewPassword: string;
}