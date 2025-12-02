/**
 * Dimensions System
 *
 * This file defines all spacing, sizing, and dimensional values used throughout the app.
 * Following 8px grid system for consistent spacing and sizing.
 *
 * @fileoverview Dimension definitions for consistent spacing and sizing
 * @author Template React Native Team
 * @version 1.0.0
 * @usage Import specific dimensions in components for consistent spacing
 */

/**
 * Base spacing unit - 8px
 * All spacing should be multiples of this value
 */
export const SPACING_UNIT = 8;

/**
 * Spacing scale following 8px grid system
 */
export const SPACING = {
  /** No spacing - 0px */
  NONE: 0,
  /** Extra small spacing - 4px */
  XS: SPACING_UNIT * 0.5,
  /** Small spacing - 8px */
  SM: SPACING_UNIT,
  /** Medium spacing - 16px */
  MD: SPACING_UNIT * 2,
  /** Large spacing - 24px */
  LG: SPACING_UNIT * 3,
  /** Extra large spacing - 32px */
  XL: SPACING_UNIT * 4,
  /** 2X large spacing - 40px */
  '2XL': SPACING_UNIT * 5,
  /** 3X large spacing - 48px */
  '3XL': SPACING_UNIT * 6,
  /** 4X large spacing - 56px */
  '4XL': SPACING_UNIT * 7,
  /** 5X large spacing - 64px */
  '5XL': SPACING_UNIT * 8,
  /** 6X large spacing - 72px */
  '6XL': SPACING_UNIT * 9,
  /** 7X large spacing - 80px */
  '7XL': SPACING_UNIT * 10,
  /** 8X large spacing - 96px */
  '8XL': SPACING_UNIT * 12,
} as const;

/**
 * Icon sizes for consistent icon scaling
 */
export const ICON_SIZES = {
  /** Extra small icon - 12px */
  XS: 12,
  /** Small icon - 16px */
  SM: 16,
  /** Medium icon - 20px */
  MD: 20,
  /** Large icon - 24px */
  LG: 24,
  /** Extra large icon - 32px */
  XL: 32,
  /** 2X large icon - 40px */
  '2XL': 40,
  /** 3X large icon - 48px */
  '3XL': 48,
  /** 4X large icon - 56px */
  '4XL': 56,
  /** 5X large icon - 64px */
  '5XL': 64,
  /** 6X large icon - 72px */
  '6XL': 72,
  /** 7X large icon - 80px */
  '7XL': 80,
  /** 8X large icon - 96px */
  '8XL': 96,
} as const;

/**
 * Border radius values for consistent rounded corners
 */
export const BORDER_RADIUS = {
  /** No border radius - 0px */
  NONE: 0,
  /** Extra small border radius - 2px */
  XS: 2,
  /** Small border radius - 4px */
  SM: 4,
  /** Medium border radius - 8px */
  MD: 8,
  /** Large border radius - 12px */
  LG: 12,
  /** Extra large border radius - 16px */
  XL: 16,
  /** 2X large border radius - 20px */
  '2XL': 20,
  /** 3X large border radius - 24px */
  '3XL': 24,
  /** Full circle border radius - 9999px */
  FULL: 9999,
} as const;

/**
 * Border width values
 */
export const BORDER_WIDTH = {
  /** No border - 0px */
  NONE: 0,
  /** Thin border - 1px */
  THIN: 1,
  /** Medium border - 2px */
  MEDIUM: 2,
  /** Thick border - 4px */
  THICK: 4,
  /** Extra thick border - 8px */
  EXTRA_THICK: 8,
} as const;

/**
 * Component specific dimensions
 */
export const COMPONENT_DIMENSIONS = {
  /** Button dimensions */
  BUTTON: {
    /** Extra small button height */
    HEIGHT_XS: 28,
    /** Small button height */
    HEIGHT_SM: 32,
    /** Medium button height */
    HEIGHT_MD: 40,
    /** Large button height */
    HEIGHT_LG: 48,
    /** Extra large button height */
    HEIGHT_XL: 56,
    /** Button horizontal padding */
    PADDING_HORIZONTAL: SPACING.MD,
    /** Button vertical padding */
    PADDING_VERTICAL: SPACING.SM,
    /** Button minimum width */
    MIN_WIDTH: 64,
    /** Button border radius */
    BORDER_RADIUS: BORDER_RADIUS.MD,
  },
  /** Input field dimensions */
  INPUT: {
    /** Small input height */
    HEIGHT_SM: 36,
    /** Medium input height */
    HEIGHT_MD: 44,
    /** Large input height */
    HEIGHT_LG: 52,
    /** Input horizontal padding */
    PADDING_HORIZONTAL: SPACING.MD,
    /** Input vertical padding */
    PADDING_VERTICAL: SPACING.SM,
    /** Input border radius */
    BORDER_RADIUS: BORDER_RADIUS.SM,
    /** Input border width */
    BORDER_WIDTH: BORDER_WIDTH.THIN,
  },
  /** Card dimensions */
  CARD: {
    /** Card padding */
    PADDING: SPACING.MD,
    /** Small card padding */
    PADDING_SM: SPACING.SM,
    /** Large card padding */
    PADDING_LG: SPACING.LG,
    /** Card margin */
    MARGIN: SPACING.SM,
    /** Card border radius */
    BORDER_RADIUS: BORDER_RADIUS.LG,
    /** Card elevation (shadow) */
    ELEVATION: 3,
  },
  /** Badge dimensions */
  BADGE: {
    /** Small badge size */
    SIZE_SM: 16,
    /** Medium badge size */
    SIZE_MD: 20,
    /** Large badge size */
    SIZE_LG: 24,
    /** Badge padding horizontal */
    PADDING_HORIZONTAL: SPACING.XS,
    /** Badge padding vertical */
    PADDING_VERTICAL: 2,
    /** Badge border radius */
    BORDER_RADIUS: BORDER_RADIUS.FULL,
  },
  /** Avatar/Profile picture dimensions */
  AVATAR: {
    /** Extra small avatar size */
    SIZE_XS: 24,
    /** Small avatar size */
    SIZE_SM: 32,
    /** Medium avatar size */
    SIZE_MD: 40,
    /** Large avatar size */
    SIZE_LG: 48,
    /** Extra large avatar size */
    SIZE_XL: 64,
    /** 2X large avatar size */
    SIZE_2XL: 80,
    /** 3X large avatar size */
    SIZE_3XL: 96,
    /** Avatar border radius */
    BORDER_RADIUS: BORDER_RADIUS.FULL,
  },
  /** Progress bar dimensions */
  PROGRESS_BAR: {
    /** Small progress bar height */
    HEIGHT_SM: 4,
    /** Medium progress bar height */
    HEIGHT_MD: 8,
    /** Large progress bar height */
    HEIGHT_LG: 12,
    /** Progress bar border radius */
    BORDER_RADIUS: BORDER_RADIUS.FULL,
  },
  /** Switch dimensions */
  SWITCH: {
    /** Small switch width */
    WIDTH_SM: 40,
    /** Medium switch width */
    WIDTH_MD: 48,
    /** Large switch width */
    WIDTH_LG: 56,
    /** Small switch height */
    HEIGHT_SM: 20,
    /** Medium switch height */
    HEIGHT_MD: 24,
    /** Large switch height */
    HEIGHT_LG: 28,
    /** Switch thumb size percentage */
    THUMB_RATIO: 0.8,
    /** Switch border radius */
    BORDER_RADIUS: BORDER_RADIUS.FULL,
  },
  /** Divider dimensions */
  DIVIDER: {
    /** Thin divider height */
    HEIGHT_THIN: 1,
    /** Medium divider height */
    HEIGHT_MEDIUM: 2,
    /** Thick divider height */
    HEIGHT_THICK: 4,
  },
} as const;

/**
 * Screen layout dimensions
 */
export const LAYOUT = {
  /** Screen padding */
  SCREEN_PADDING: SPACING.MD,
  /** Screen padding horizontal */
  SCREEN_PADDING_HORIZONTAL: SPACING.MD,
  /** Screen padding vertical */
  SCREEN_PADDING_VERTICAL: SPACING.LG,
  /** Section spacing */
  SECTION_SPACING: SPACING.LG,
  /** Header height */
  HEADER_HEIGHT: 56,
  /** Large header height */
  HEADER_HEIGHT_LG: 64,
  /** Tab bar height */
  TAB_BAR_HEIGHT: 48,
  /** Bottom navigation height */
  BOTTOM_NAV_HEIGHT: 60,
  /** Floating action button size */
  FAB_SIZE: 56,
  /** Large floating action button size */
  FAB_SIZE_LG: 64,
  /** Minimum touch target size */
  TOUCH_TARGET_SIZE: 44,
  /** Status bar height (rough estimate) */
  STATUS_BAR_HEIGHT: 24,
  /** Safe area bottom padding */
  SAFE_AREA_BOTTOM: 34,
} as const;

/**
 * Grid system dimensions
 */
export const GRID = {
  /** Container max width */
  CONTAINER_MAX_WIDTH: 1200,
  /** Grid gutter (spacing between columns) */
  GUTTER: SPACING.MD,
  /** Small grid gutter */
  GUTTER_SM: SPACING.SM,
  /** Large grid gutter */
  GUTTER_LG: SPACING.LG,
  /** Grid columns */
  COLUMNS: 12,
} as const;

/**
 * Shadow/Elevation values - Cross-platform shadow system
 * 
 * Provides consistent shadows across iOS and Android platforms.
 * iOS uses shadowColor, shadowOffset, shadowOpacity, and shadowRadius.
 * Android uses elevation for Material Design shadows.
 * 
 * Usage: Apply entire shadow object to style for cross-platform compatibility.
 * Example: ...SHADOWS.MD
 */
export const SHADOWS = {
  /** No shadow - Elevation 0 */
  NONE: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  /** Extra small shadow - Elevation 1 */
  XS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  /** Small shadow - Elevation 2 */
  SM: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  /** Medium shadow - Elevation 3 (Most commonly used for cards) */
  MD: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  /** Large shadow - Elevation 4 */
  LG: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  /** Extra large shadow - Elevation 6 */
  XL: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  /** 2X large shadow - Elevation 8 */
  '2XL': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  /** 3X large shadow - Elevation 12 */
  '3XL': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  /** Maximum shadow - Elevation 16 */
  MAX: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

/**
 * Elevation levels mapping to common use cases
 * 
 * Quick reference for appropriate elevation levels:
 * - FLAT: No elevation (0) - Text, icons, dividers
 * - RAISED: Minimal elevation (1) - Buttons in resting state
 * - CARD: Standard card elevation (3) - Cards, dialogs at rest
 * - FLOATING: Floating elements (4-6) - App bars, floating action buttons
 * - MODAL: Modal/overlay elevation (8) - Navigation drawers, modal dialogs
 * - POPUP: Highest elevation (12-16) - Tooltips, dropdown menus, snackbars
 */
export const ELEVATION = {
  /** No elevation - 0 */
  FLAT: SHADOWS.NONE,
  /** Minimal elevation - 1 */
  RAISED: SHADOWS.XS,
  /** Standard elevation - 2 */
  LOW: SHADOWS.SM,
  /** Card elevation - 3 (Most common for cards) */
  CARD: SHADOWS.MD,
  /** Button elevation - 4 */
  BUTTON: SHADOWS.LG,
  /** Floating element elevation - 6 */
  FLOATING: SHADOWS.XL,
  /** Modal elevation - 8 */
  MODAL: SHADOWS['2XL'],
  /** Popup elevation - 12 */
  POPUP: SHADOWS['3XL'],
  /** Maximum elevation - 16 */
  MAXIMUM: SHADOWS.MAX,
} as const;

/**
 * Screen breakpoints for responsive design
 */
export const BREAKPOINTS = {
  /** Small screens (phones) */
  SM: 480,
  /** Medium screens (tablets portrait) */
  MD: 768,
  /** Large screens (tablets landscape) */
  LG: 1024,
  /** Extra large screens (desktops) */
  XL: 1280,
  /** 2X large screens (large desktops) */
  '2XL': 1536,
} as const;

/**
 * Z-index values for layering
 */
export const Z_INDEX = {
  /** Base level */
  BASE: 0,
  /** Dropdown menus */
  DROPDOWN: 1000,
  /** Sticky elements */
  STICKY: 1020,
  /** Fixed elements */
  FIXED: 1030,
  /** Modal backdrop */
  MODAL_BACKDROP: 1040,
  /** Modal */
  MODAL: 1050,
  /** Popover */
  POPOVER: 1060,
  /** Tooltip */
  TOOLTIP: 1070,
  /** Toast notifications */
  TOAST: 1080,
  /** Loading overlay */
  LOADING: 1090,
  /** Maximum z-index */
  MAX: 2147483647,
} as const;

/**
 * All dimensions combined for easy access
 */
export const DIMENSIONS = {
  SPACING,
  ICON_SIZES,
  BORDER_RADIUS,
  BORDER_WIDTH,
  COMPONENT_DIMENSIONS,
  LAYOUT,
  GRID,
  SHADOWS,
  ELEVATION,
  BREAKPOINTS,
  Z_INDEX,
} as const;

/**
 * Type definitions for dimension keys
 */
export type SpacingKey = keyof typeof SPACING;
export type IconSizeKey = keyof typeof ICON_SIZES;
export type BorderRadiusKey = keyof typeof BORDER_RADIUS;