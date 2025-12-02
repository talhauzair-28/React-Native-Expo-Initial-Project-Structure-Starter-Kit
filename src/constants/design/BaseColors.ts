/**
 * Base Color Palette
 *
 * This file contains the fundamental color definitions used throughout the app.
 * All theme colors should be derived from these base colors.
 *
 * @fileoverview Base color definitions for the Template React Native app
 * @author Template React Native Team
 * @version 1.0.0
 */

/**
 * Primary brand colors - Modern blue theme
 */
export const PRIMARY_COLORS = {
  /** Main brand color - Modern blue */
  BLUE_500: '#3B82F6',
  /** Lighter variant of brand color */
  BLUE_400: '#60A5FA',
  /** Darker variant of brand color */
  BLUE_600: '#2563EB',
  /** Very light brand color for backgrounds */
  BLUE_50: '#EFF6FF',
  /** Light brand color for subtle elements */
  BLUE_100: '#DBEAFE',
} as const;

/**
 * Color dump for quick access to common colors
 */
export const COLOR_DUMP = {
  PINK: '#EC4899',
  ORANGE: '#F97316',
  YELLOW: '#EAB308',
  GREEN: '#10B981',
  BLUE: '#3B82F6',
  PURPLE: '#8B5CF6',
  RED: '#EF4444',
  GRAY: '#6B7280',
  DARK_GRAY: '#4B5563',
  VERY_DARK_GRAY: '#374151',
  NEAR_BLACK: '#1F2937',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
} as const;

/**
 * Secondary colors - Complementary to primary
 */
export const SECONDARY_COLORS = {
  /** Secondary brand color - Emerald green */
  GREEN_500: '#10B981',
  /** Lighter secondary color */
  GREEN_400: '#34D399',
  /** Darker secondary color */
  GREEN_600: '#059669',
  /** Light secondary background */
  GREEN_50: '#ECFDF5',
  /** Light secondary elements */
  GREEN_100: '#D1FAE5',
} as const;

/**
 * Semantic colors for status indication
 */
export const SEMANTIC_COLORS = {
  /** Success state color */
  SUCCESS: '#10B981',
  /** Warning state color */
  WARNING: '#F59E0B',
  /** Error state color */
  ERROR: '#EF4444',
  /** Info state color */
  INFO: '#3B82F6',
} as const;

/**
 * Neutral colors for text and backgrounds
 */
export const NEUTRAL_COLORS = {
  /** Pure white */
  WHITE: '#FFFFFF',
  /** Pure black */
  BLACK: '#000000',
  /** Very light gray for backgrounds */
  GRAY_50: '#F9FAFB',
  /** Light gray for subtle backgrounds */
  GRAY_100: '#F3F4F6',
  /** Light gray for borders */
  GRAY_200: '#E5E7EB',
  /** Medium light gray */
  GRAY_300: '#D1D5DB',
  /** Medium gray for inactive elements */
  GRAY_400: '#9CA3AF',
  /** Medium dark gray for secondary text */
  GRAY_500: '#6B7280',
  /** Dark gray for secondary text */
  GRAY_600: '#4B5563',
  /** Darker gray for primary text */
  GRAY_700: '#374151',
  /** Very dark gray for headings */
  GRAY_800: '#1F2937',
  /** Near black for main text */
  GRAY_900: '#111827',
} as const;

/**
 * Accent colors for special use cases
 */
export const ACCENT_COLORS = {
  /** Gold color for premium features */
  GOLD: '#F59E0B',
  /** Indigo for creative elements */
  INDIGO: '#6366F1',
  /** Teal for nature/health themes */
  TEAL: '#14B8A6',
  /** Rose for romantic/social features */
  ROSE: '#F43F5E',
  /** Violet for artistic elements */
  VIOLET: '#8B5CF6',
} as const;

/**
 * Quality rating colors (star ratings, grades)
 */
export const QUALITY_COLORS = {
  /** Excellent quality (5 stars) */
  EXCELLENT: '#10B981',
  /** Good quality (4 stars) */
  GOOD: '#84CC16',
  /** Average quality (3 stars) */
  AVERAGE: '#F59E0B',
  /** Poor quality (2 stars) */
  POOR: '#F97316',
  /** Bad quality (1 star) */
  BAD: '#EF4444',
} as const;

/**
 * Background gradient colors
 */
export const GRADIENT_COLORS = {
  /** Primary gradient start */
  PRIMARY_START: '#3B82F6',
  /** Primary gradient end */
  PRIMARY_END: '#1D4ED8',
  /** Secondary gradient start */
  SECONDARY_START: '#10B981',
  /** Secondary gradient end */
  SECONDARY_END: '#047857',
  /** Sunset gradient colors */
  SUNSET_START: '#F97316',
  SUNSET_END: '#DC2626',
  /** Ocean gradient colors */
  OCEAN_START: '#0EA5E9',
  OCEAN_END: '#0284C7',
} as const;

/**
 * All base colors combined for easy access
 */
export const BASE_COLORS = {
  ...PRIMARY_COLORS,
  ...SECONDARY_COLORS,
  ...SEMANTIC_COLORS,
  ...NEUTRAL_COLORS,
  ...ACCENT_COLORS,
  ...QUALITY_COLORS,
  ...GRADIENT_COLORS,
  ...COLOR_DUMP,
} as const;

/**
 * Type for all available base colors
 */
export type BaseColorKey = keyof typeof BASE_COLORS;