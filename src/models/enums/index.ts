/**
 * Model Enums Index
 *
 * Central export point for all model-specific enumerations.
 * Re-exports common enums from constants and adds model-specific enums.
 *
 * @fileoverview Model enumeration exports
 * @author Template React Native Team
 * @version 1.0.0
 */

// Re-export common enums from constants
export {
  Size,
  IconSize,
  SpacingSize,
  Status,
  ButtonVariant,
  BadgeVariant,
  CardVariant,
  InputVariant,
  ProgressVariant,
  DisplayVariant,
  Theme,
  Language,
  TimePeriod,
  DayOfWeek,
  Priority,
  Category,
  QualityLevel,
  QualityDescription,
  Grade,
  AchievementLevel,
  StreakMilestone,
  Orientation,
  NetworkStatus,
  APIMethod,
  StorageKey,
  AnimationDuration,
  AnimationEasing,
  ModalType,
  NotificationType,
  PermissionStatus,
} from '@/constants/enums';

/**
 * User role enumeration
 */
export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
  GUEST = 'guest',
}

/**
 * User status enumeration
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  BANNED = 'banned',
}

/**
 * Content type enumeration
 */
export enum ContentType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  LINK = 'link',
}

/**
 * Task status enumeration
 */
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done',
  CANCELLED = 'cancelled',
  ARCHIVED = 'archived',
}

/**
 * Notification preference enumeration
 */
export enum NotificationPreference {
  ALL = 'all',
  IMPORTANT_ONLY = 'important_only',
  NONE = 'none',
}

/**
 * Privacy level enumeration
 */
export enum PrivacyLevel {
  PUBLIC = 'public',
  FRIENDS = 'friends',
  PRIVATE = 'private',
}

/**
 * Sort order enumeration
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * File format enumeration
 */
export enum FileFormat {
  PDF = 'pdf',
  DOC = 'doc',
  DOCX = 'docx',
  XLS = 'xls',
  XLSX = 'xlsx',
  PPT = 'ppt',
  PPTX = 'pptx',
  TXT = 'txt',
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
}

/**
 * Image format enumeration
 */
export enum ImageFormat {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  GIF = 'gif',
  SVG = 'svg',
  WEBP = 'webp',
  HEIC = 'heic',
}

/**
 * Video format enumeration
 */
export enum VideoFormat {
  MP4 = 'mp4',
  MOV = 'mov',
  AVI = 'avi',
  WMV = 'wmv',
  FLV = 'flv',
  WEBM = 'webm',
  M4V = 'm4v',
}

/**
 * Audio format enumeration
 */
export enum AudioFormat {
  MP3 = 'mp3',
  WAV = 'wav',
  AAC = 'aac',
  FLAC = 'flac',
  OGG = 'ogg',
  M4A = 'm4a',
}

/**
 * Currency enumeration
 */
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  PKR = 'PKR',
  SAR = 'SAR',
  AED = 'AED',
  INR = 'INR',
  CAD = 'CAD',
  AUD = 'AUD',
  JPY = 'JPY',
  CNY = 'CNY',
}

/**
 * Country code enumeration (ISO 3166-1 alpha-2)
 */
export enum CountryCode {
  US = 'US',
  UK = 'GB',
  PK = 'PK',
  SA = 'SA',
  AE = 'AE',
  IN = 'IN',
  CA = 'CA',
  AU = 'AU',
  JP = 'JP',
  CN = 'CN',
  DE = 'DE',
  FR = 'FR',
}