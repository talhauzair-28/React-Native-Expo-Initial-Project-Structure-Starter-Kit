/**
 * Typography System
 *
 * This file defines the complete typography system for the Template React Native app.
 * It includes font families, sizes, weights, and line heights following Material Design principles.
 *
 * @fileoverview Typography definitions for consistent text styling
 * @author Template React Native Team
 * @version 1.0.0
 * @usage Import specific typography styles in components
 */

import { TextStyle } from 'react-native';

/**
 * Font family definitions
 * Using system fonts for better performance and consistency
 */
export const FONT_FAMILIES = {
  /** Primary font family - system default */
  PRIMARY: 'System',
  /** Secondary font family - for special text */
  SECONDARY: 'System',
  /** Monospace font for code/numbers */
  MONOSPACE: 'Courier New',
  /** Font for Arabic/RTL text */
  RTL: 'Arial', // Replace with proper RTL font
} as const;

/**
 * Font weights following standard naming conventions
 */
export const FONT_WEIGHTS = {
  /** Light font weight - 300 */
  LIGHT: '300' as TextStyle['fontWeight'],
  /** Regular font weight - 400 */
  REGULAR: '400' as TextStyle['fontWeight'],
  /** Medium font weight - 500 */
  MEDIUM: '500' as TextStyle['fontWeight'],
  /** Semibold font weight - 600 */
  SEMIBOLD: '600' as TextStyle['fontWeight'],
  /** Bold font weight - 700 */
  BOLD: '700' as TextStyle['fontWeight'],
  /** Extra bold font weight - 800 */
  EXTRA_BOLD: '800' as TextStyle['fontWeight'],
} as const;

/**
 * Font sizes following 8px grid system
 */
export const FONT_SIZES = {
  /** Extra small text - 10px */
  XS: 10,
  /** Small text - 12px */
  SM: 12,
  /** Base text size - 14px */
  BASE: 14,
  /** Medium text - 16px */
  MD: 16,
  /** Large text - 18px */
  LG: 18,
  /** Extra large text - 20px */
  XL: 20,
  /** 2X large text - 24px */
  '2XL': 24,
  /** 3X large text - 28px */
  '3XL': 28,
  /** 4X large text - 32px */
  '4XL': 32,
  /** 5X large text - 36px */
  '5XL': 36,
  /** 6X large text - 40px */
  '6XL': 40,
  /** 7X large text - 48px */
  '7XL': 48,
  /** 8X large text - 56px */
  '8XL': 56,
  /** 9X large text - 64px */
  '9XL': 64,
} as const;

/**
 * Line heights for optimal readability
 */
export const LINE_HEIGHTS = {
  /** Tight line height - 1.2 */
  TIGHT: 1.2,
  /** Normal line height - 1.4 */
  NORMAL: 1.4,
  /** Relaxed line height - 1.6 */
  RELAXED: 1.6,
  /** Loose line height - 1.8 */
  LOOSE: 1.8,
} as const;

/**
 * Letter spacing values for different text styles
 */
export const LETTER_SPACING = {
  /** Tight letter spacing */
  TIGHT: -0.5,
  /** Normal letter spacing */
  NORMAL: 0,
  /** Wide letter spacing */
  WIDE: 0.5,
  /** Extra wide letter spacing */
  EXTRA_WIDE: 1,
} as const;

/**
 * Typography variants for different text elements
 * Each variant includes fontSize, lineHeight, and fontWeight
 */
export const TYPOGRAPHY_VARIANTS = {
  /** Display text - Largest heading */
  display: {
    fontSize: FONT_SIZES['6XL'],
    lineHeight: FONT_SIZES['6XL'] * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  /** Main page heading - H1 */
  h1: {
    fontSize: FONT_SIZES['4XL'],
    lineHeight: FONT_SIZES['4XL'] * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.TIGHT,
  },
  /** Section heading - H2 */
  h2: {
    fontSize: FONT_SIZES['3XL'],
    lineHeight: FONT_SIZES['3XL'] * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Subsection heading - H3 */
  h3: {
    fontSize: FONT_SIZES['2XL'],
    lineHeight: FONT_SIZES['2XL'] * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Card title - H4 */
  h4: {
    fontSize: FONT_SIZES.XL,
    lineHeight: FONT_SIZES.XL * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Small heading - H5 */
  h5: {
    fontSize: FONT_SIZES.LG,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Smallest heading - H6 */
  h6: {
    fontSize: FONT_SIZES.MD,
    lineHeight: FONT_SIZES.MD * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Large body text */
  bodyLarge: {
    fontSize: FONT_SIZES.LG,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Regular body text */
  body: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Small body text */
  bodySmall: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Large caption text */
  captionLarge: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.WIDE,
  },
  /** Caption text */
  caption: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.WIDE,
  },
  /** Small caption text */
  captionSmall: {
    fontSize: FONT_SIZES.XS,
    lineHeight: FONT_SIZES.XS * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.EXTRA_WIDE,
  },
  /** Large button text */
  buttonLarge: {
    fontSize: FONT_SIZES.LG,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.WIDE,
  },
  /** Button text */
  button: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.WIDE,
  },
  /** Small button text */
  buttonSmall: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.EXTRA_WIDE,
  },
  /** Input label text */
  label: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Input text */
  input: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Tab text */
  tab: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.WIDE,
  },
  /** Badge text */
  badge: {
    fontSize: FONT_SIZES.XS,
    lineHeight: FONT_SIZES.XS * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.EXTRA_WIDE,
  },
  /** Link text */
  link: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** Code/monospace text */
  code: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.MONOSPACE,
    letterSpacing: LETTER_SPACING.NORMAL,
  },
} as const;

/**
 * Special typography for RTL languages
 */
export const RTL_TYPOGRAPHY = {
  /** RTL body text */
  rtlBody: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.LOOSE,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.RTL,
    textAlign: 'right' as TextStyle['textAlign'],
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** RTL heading text */
  rtlHeading: {
    fontSize: FONT_SIZES.LG,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.RTL,
    textAlign: 'right' as TextStyle['textAlign'],
    letterSpacing: LETTER_SPACING.NORMAL,
  },
  /** RTL caption text */
  rtlCaption: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.RTL,
    textAlign: 'center' as TextStyle['textAlign'],
    letterSpacing: LETTER_SPACING.NORMAL,
  },
} as const;

/**
 * Combined typography system
 */
export const TYPOGRAPHY = {
  ...TYPOGRAPHY_VARIANTS,
  ...RTL_TYPOGRAPHY,
} as const;

/**
 * Typography variant keys type
 */
export type TypographyVariant = keyof typeof TYPOGRAPHY;

/**
 * Utility function to get typography style
 * @param variant - Typography variant name
 * @returns TextStyle object for the variant
 */
export const getTypographyStyle = (variant: TypographyVariant): TextStyle => {
  return TYPOGRAPHY[variant];
};

/**
 * Text decoration utilities
 */
export const TEXT_DECORATIONS = {
  none: 'none' as TextStyle['textDecorationLine'],
  underline: 'underline' as TextStyle['textDecorationLine'],
  strikethrough: 'line-through' as TextStyle['textDecorationLine'],
  underlineStrikethrough: 'underline line-through' as TextStyle['textDecorationLine'],
} as const;

/**
 * Text transform utilities
 */
export const TEXT_TRANSFORMS = {
  none: 'none' as TextStyle['textTransform'],
  uppercase: 'uppercase' as TextStyle['textTransform'],
  lowercase: 'lowercase' as TextStyle['textTransform'],
  capitalize: 'capitalize' as TextStyle['textTransform'],
} as const;

/**
 * Text alignment utilities
 */
export const TEXT_ALIGNMENTS = {
  left: 'left' as TextStyle['textAlign'],
  center: 'center' as TextStyle['textAlign'],
  right: 'right' as TextStyle['textAlign'],
  justify: 'justify' as TextStyle['textAlign'],
} as const;