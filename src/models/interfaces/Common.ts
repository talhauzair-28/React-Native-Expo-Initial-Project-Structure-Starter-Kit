/**
 * Common Interface Definitions
 *
 * This file contains common interfaces used throughout the application.
 * These interfaces provide consistent typing for shared data structures.
 *
 * @fileoverview Common interface definitions
 * @author Template React Native Team
 * @version 1.0.0
 */

import { Status, Priority, SortOrder } from '../enums';

/**
 * Base entity interface with common fields
 */
export interface BaseEntity {
  /** Unique identifier */
  id: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
  /** Optional deletion timestamp (for soft delete) */
  deletedAt?: Date;
}

/**
 * API response wrapper interface
 */
export interface APIResponse<T = any> {
  /** Indicates if the request was successful */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if request failed */
  message?: string;
  /** Additional error details */
  errors?: Record<string, string[]>;
  /** Response metadata */
  meta?: ResponseMetadata;
}

/**
 * Response metadata interface
 */
export interface ResponseMetadata {
  /** Request timestamp */
  timestamp: string;
  /** Request ID for tracking */
  requestId: string;
  /** API version */
  version: string;
  /** Request duration in milliseconds */
  duration?: number;
}

/**
 * Pagination parameters interface
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Field to sort by */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
}

/**
 * Pagination metadata interface
 */
export interface PaginationMeta {
  /** Current page number */
  currentPage: number;
  /** Number of items per page */
  perPage: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
  /** Does previous page exist */
  hasPreviousPage: boolean;
  /** Does next page exist */
  hasNextPage: boolean;
  /** Previous page number */
  previousPage?: number;
  /** Next page number */
  nextPage?: number;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T = any> extends APIResponse<T[]> {
  /** Pagination metadata */
  pagination: PaginationMeta;
}

/**
 * Search parameters interface
 */
export interface SearchParams extends PaginationParams {
  /** Search query string */
  query?: string;
  /** Search filters */
  filters?: Record<string, any>;
  /** Fields to include in results */
  include?: string[];
  /** Fields to exclude from results */
  exclude?: string[];
}

/**
 * File upload interface
 */
export interface FileUpload {
  /** File unique identifier */
  id: string;
  /** Original filename */
  name: string;
  /** File MIME type */
  mimeType: string;
  /** File size in bytes */
  size: number;
  /** File URL */
  url: string;
  /** Alternative text for accessibility */
  alt?: string;
  /** File description */
  description?: string;
  /** Upload timestamp */
  uploadedAt: Date;
  /** Uploader user ID */
  uploadedBy: string;
}

/**
 * Address interface
 */
export interface Address {
  /** Street address line 1 */
  street1: string;
  /** Street address line 2 */
  street2?: string;
  /** City name */
  city: string;
  /** State/Province name */
  state: string;
  /** Postal/ZIP code */
  postalCode: string;
  /** Country name */
  country: string;
  /** Country code (ISO 3166-1 alpha-2) */
  countryCode: string;
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
}

/**
 * Contact information interface
 */
export interface ContactInfo {
  /** Primary email address */
  email?: string;
  /** Phone number */
  phone?: string;
  /** Website URL */
  website?: string;
  /** Social media links */
  socialMedia?: SocialMediaLinks;
  /** Physical address */
  address?: Address;
}

/**
 * Social media links interface
 */
export interface SocialMediaLinks {
  /** Facebook profile URL */
  facebook?: string;
  /** Twitter profile URL */
  twitter?: string;
  /** Instagram profile URL */
  instagram?: string;
  /** LinkedIn profile URL */
  linkedin?: string;
  /** YouTube channel URL */
  youtube?: string;
  /** TikTok profile URL */
  tiktok?: string;
  /** GitHub profile URL */
  github?: string;
}

/**
 * Notification interface
 */
export interface Notification extends BaseEntity {
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Notification type */
  type: 'info' | 'success' | 'warning' | 'error';
  /** Notification priority */
  priority: Priority;
  /** Is notification read */
  isRead: boolean;
  /** Recipient user ID */
  userId: string;
  /** Related entity type */
  entityType?: string;
  /** Related entity ID */
  entityId?: string;
  /** Notification data */
  data?: Record<string, any>;
  /** Read timestamp */
  readAt?: Date;
  /** Expiration timestamp */
  expiresAt?: Date;
}

/**
 * Task interface
 */
export interface Task extends BaseEntity {
  /** Task title */
  title: string;
  /** Task description */
  description?: string;
  /** Task status */
  status: Status;
  /** Task priority */
  priority: Priority;
  /** Due date */
  dueDate?: Date;
  /** Assigned user ID */
  assignedTo?: string;
  /** Task creator user ID */
  createdBy: string;
  /** Task completion date */
  completedAt?: Date;
  /** Task tags */
  tags?: string[];
  /** Task attachments */
  attachments?: FileUpload[];
  /** Parent task ID */
  parentId?: string;
  /** Task progress percentage */
  progress: number;
}

/**
 * Comment interface
 */
export interface Comment extends BaseEntity {
  /** Comment content */
  content: string;
  /** Author user ID */
  authorId: string;
  /** Parent entity type */
  entityType: string;
  /** Parent entity ID */
  entityId: string;
  /** Parent comment ID (for replies) */
  parentId?: string;
  /** Comment attachments */
  attachments?: FileUpload[];
  /** Is comment edited */
  isEdited: boolean;
  /** Edit timestamp */
  editedAt?: Date;
  /** Like count */
  likeCount: number;
  /** Reply count */
  replyCount: number;
}

/**
 * Rating interface
 */
export interface Rating extends BaseEntity {
  /** Rating value (1-5) */
  value: number;
  /** Optional review text */
  review?: string;
  /** Reviewer user ID */
  userId: string;
  /** Rated entity type */
  entityType: string;
  /** Rated entity ID */
  entityId: string;
  /** Rating helpfulness votes */
  helpfulVotes: number;
}

/**
 * Analytics event interface
 */
export interface AnalyticsEvent {
  /** Event name */
  name: string;
  /** Event properties */
  properties?: Record<string, any>;
  /** Event timestamp */
  timestamp: Date;
  /** User ID (if available) */
  userId?: string;
  /** Session ID */
  sessionId: string;
  /** Device information */
  device?: DeviceInfo;
  /** Location information */
  location?: GeolocationPosition;
}

/**
 * Device information interface
 */
export interface DeviceInfo {
  /** Device type */
  type: 'mobile' | 'tablet' | 'desktop';
  /** Operating system */
  os: string;
  /** OS version */
  osVersion: string;
  /** Browser name */
  browser?: string;
  /** Browser version */
  browserVersion?: string;
  /** Screen resolution */
  screenResolution?: string;
  /** Viewport size */
  viewportSize?: string;
}

/**
 * Error interface
 */
export interface AppError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error details */
  details?: Record<string, any>;
  /** Error stack trace */
  stack?: string;
  /** Timestamp when error occurred */
  timestamp: Date;
  /** User ID (if available) */
  userId?: string;
  /** Request ID */
  requestId?: string;
}

/**
 * Configuration interface
 */
export interface AppConfig {
  /** Application name */
  appName: string;
  /** Application version */
  appVersion: string;
  /** Environment */
  environment: 'development' | 'staging' | 'production';
  /** API base URL */
  apiBaseUrl: string;
  /** Feature flags */
  features: Record<string, boolean>;
  /** External service configurations */
  services: Record<string, any>;
}

/**
 * Health check interface
 */
export interface HealthCheck {
  /** Overall health status */
  status: 'healthy' | 'unhealthy' | 'degraded';
  /** Timestamp of health check */
  timestamp: Date;
  /** Individual service statuses */
  services: Record<string, ServiceHealth>;
  /** System information */
  system: SystemInfo;
}

/**
 * Service health interface
 */
export interface ServiceHealth {
  /** Service status */
  status: 'up' | 'down' | 'degraded';
  /** Response time in milliseconds */
  responseTime?: number;
  /** Error message if service is down */
  error?: string;
  /** Additional service-specific data */
  data?: Record<string, any>;
}

/**
 * System information interface
 */
export interface SystemInfo {
  /** Application uptime in milliseconds */
  uptime: number;
  /** Memory usage information */
  memory: MemoryUsage;
  /** CPU usage percentage */
  cpu?: number;
  /** Disk usage information */
  disk?: DiskUsage;
}

/**
 * Memory usage interface
 */
export interface MemoryUsage {
  /** Total memory in bytes */
  total: number;
  /** Used memory in bytes */
  used: number;
  /** Free memory in bytes */
  free: number;
  /** Usage percentage */
  percentage: number;
}

/**
 * Disk usage interface
 */
export interface DiskUsage {
  /** Total disk space in bytes */
  total: number;
  /** Used disk space in bytes */
  used: number;
  /** Available disk space in bytes */
  available: number;
  /** Usage percentage */
  percentage: number;
}