/**
 * Common Enums
 *
 * This file contains all the common enumerations used throughout the application.
 * These enums provide type-safe constants for consistent values across components.
 *
 * @fileoverview Common enumerations for the application
 * @author Template React Native Team
 * @version 1.0.0
 */

/**
 * Size enumeration for consistent sizing across components
 */
export enum Size {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  '2XL' = '2xl',
  '3XL' = '3xl',
}

/**
 * Icon size enumeration for consistent icon sizing
 */
export enum IconSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  '2XL' = '2xl',
  '3XL' = '3xl',
}

/**
 * Spacing size enumeration for consistent spacing
 */
export enum SpacingSize {
  NONE = 'none',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  '2XL' = '2xl',
  '3XL' = '3xl',
}

/**
 * Status enumeration for various states
 */
export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * Button variant enumeration
 */
export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  OUTLINED = 'outlined',
  TEXT = 'text',
  LINK = 'link',
}

/**
 * Badge variant enumeration
 */
export enum BadgeVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  NEUTRAL = 'neutral',
}

/**
 * Card variant enumeration
 */
export enum CardVariant {
  DEFAULT = 'default',
  ELEVATED = 'elevated',
  OUTLINED = 'outlined',
  FILLED = 'filled',
}

/**
 * Input variant enumeration
 */
export enum InputVariant {
  DEFAULT = 'default',
  OUTLINED = 'outlined',
  FILLED = 'filled',
  UNDERLINED = 'underlined',
}

/**
 * Progress variant enumeration
 */
export enum ProgressVariant {
  LINEAR = 'linear',
  CIRCULAR = 'circular',
  DETERMINATE = 'determinate',
  INDETERMINATE = 'indeterminate',
}

/**
 * Display variant enumeration
 */
export enum DisplayVariant {
  INLINE = 'inline',
  BLOCK = 'block',
  FLEX = 'flex',
  GRID = 'grid',
  HIDDEN = 'hidden',
}

/**
 * Theme enumeration
 */
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

/**
 * Language enumeration
 */
export enum Language {
  ENGLISH = 'en',
  URDU = 'ur',
  ARABIC = 'ar',
}

/**
 * Time period enumeration
 */
export enum TimePeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  CUSTOM = 'custom',
}

/**
 * Day of week enumeration
 */
export enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

/**
 * Priority enumeration
 */
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

/**
 * Category enumeration for generic categorization
 */
export enum Category {
  PERSONAL = 'personal',
  WORK = 'work',
  HEALTH = 'health',
  EDUCATION = 'education',
  SOCIAL = 'social',
  ENTERTAINMENT = 'entertainment',
  OTHER = 'other',
}

/**
 * Quality level enumeration for ratings
 */
export enum QualityLevel {
  EXCELLENT = 5,
  GOOD = 4,
  AVERAGE = 3,
  POOR = 2,
  BAD = 1,
}

/**
 * Quality description enumeration
 */
export enum QualityDescription {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  AVERAGE = 'average',
  POOR = 'poor',
  BAD = 'bad',
  NOT_COMPLETED = 'not_completed',
}

/**
 * Grade enumeration for performance assessment
 */
export enum Grade {
  A_PLUS = 'A+',
  A = 'A',
  B_PLUS = 'B+',
  B = 'B',
  C_PLUS = 'C+',
  C = 'C',
  D = 'D',
  F = 'F',
}

/**
 * Achievement level enumeration
 */
export enum AchievementLevel {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond',
}

/**
 * Streak milestone enumeration
 */
export enum StreakMilestone {
  BEGINNER = 7,
  INTERMEDIATE = 30,
  ADVANCED = 90,
  EXPERT = 180,
  MASTER = 365,
}

/**
 * Screen orientation enumeration
 */
export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

/**
 * Network status enumeration
 */
export enum NetworkStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CONNECTING = 'connecting',
  RECONNECTING = 'reconnecting',
}

/**
 * API method enumeration
 */
export enum APIMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * Storage key enumeration for consistent storage keys
 */
export enum StorageKey {
  USER_PREFERENCES = 'user_preferences',
  THEME_PREFERENCE = 'theme_preference',
  LANGUAGE_PREFERENCE = 'language_preference',
  NOTIFICATION_SETTINGS = 'notification_settings',
  ONBOARDING_COMPLETED = 'onboarding_completed',
  USER_DATA = 'user_data',
  CACHE_DATA = 'cache_data',
}

/**
 * Animation duration enumeration
 */
export enum AnimationDuration {
  FAST = 150,
  NORMAL = 300,
  SLOW = 500,
  EXTRA_SLOW = 1000,
}

/**
 * Animation easing enumeration
 */
export enum AnimationEasing {
  LINEAR = 'linear',
  EASE = 'ease',
  EASE_IN = 'ease-in',
  EASE_OUT = 'ease-out',
  EASE_IN_OUT = 'ease-in-out',
}

/**
 * Modal type enumeration
 */
export enum ModalType {
  ALERT = 'alert',
  CONFIRM = 'confirm',
  PROMPT = 'prompt',
  CUSTOM = 'custom',
  BOTTOM_SHEET = 'bottom_sheet',
}

/**
 * Notification type enumeration
 */
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Permission status enumeration
 */
export enum PermissionStatus {
  GRANTED = 'granted',
  DENIED = 'denied',
  NEVER_ASK_AGAIN = 'never_ask_again',
  UNDETERMINED = 'undetermined',
}