/**
 * Design System Index
 *
 * Central export point for all design system tokens including colors, typography, dimensions, and enums.
 * This makes it easy to import design tokens throughout the application.
 *
 * @fileoverview Main export for design system tokens
 * @author Template React Native Team
 * @version 1.0.0
 * @usage Import design tokens from this central location
 */

// Export all base colors
export * from './BaseColors';

// Export semantic colors
export {
  Colors,
  DarkColors,
  LIGHT_THEME_COLORS,
  DARK_THEME_COLORS,
  getColors,
  addOpacity,
  OPACITY_VARIANTS,
} from './Colors';
export type { ColorKey, ThemeColors, Theme } from './Colors';

// Export typography system
export {
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  LETTER_SPACING,
  TYPOGRAPHY,
  getTypographyStyle,
  TEXT_DECORATIONS,
  TEXT_TRANSFORMS,
  TEXT_ALIGNMENTS,
} from './Typography';
export type { TypographyVariant } from './Typography';

// Export dimensions system
export {
  SPACING_UNIT,
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
  DIMENSIONS,
} from './Dimensions';
export type { SpacingKey, IconSizeKey, BorderRadiusKey } from './Dimensions';