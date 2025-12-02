/**
 * Semantic Color System
 *
 * This file maps base colors to semantic meanings and provides light/dark theme variants.
 * All components should use these semantic colors rather than base colors directly.
 *
 * @fileoverview Semantic color definitions and theme variants
 * @author Template React Native Team
 * @version 1.0.0
 */

import { BASE_COLORS } from './BaseColors';

/**
 * Light theme color mapping
 * Maps semantic meanings to specific colors for light theme
 */
export const LIGHT_THEME_COLORS = {
  // Primary colors
  primary: BASE_COLORS.BLUE_500,
  primaryLight: BASE_COLORS.BLUE_400,
  primaryDark: BASE_COLORS.BLUE_600,
  primaryBackground: BASE_COLORS.BLUE_50,
  
  // Secondary colors
  secondary: BASE_COLORS.GREEN_500,
  secondaryLight: BASE_COLORS.GREEN_400,
  secondaryDark: BASE_COLORS.GREEN_600,
  secondaryBackground: BASE_COLORS.GREEN_50,
  
  // Semantic colors
  success: BASE_COLORS.SUCCESS,
  warning: BASE_COLORS.WARNING,
  error: BASE_COLORS.ERROR,
  info: BASE_COLORS.INFO,
  
  // Background colors
  background: BASE_COLORS.WHITE,
  backgroundSecondary: BASE_COLORS.GRAY_50,
  backgroundTertiary: BASE_COLORS.GRAY_100,
  
  // Surface colors (for cards, modals, etc.)
  surface: BASE_COLORS.WHITE,
  surfaceSecondary: BASE_COLORS.GRAY_50,
  surfaceTertiary: BASE_COLORS.GRAY_100,
  
  // Border colors
  border: BASE_COLORS.GRAY_200,
  borderLight: BASE_COLORS.GRAY_100,
  borderDark: BASE_COLORS.GRAY_300,
  
  // Text colors
  text: BASE_COLORS.GRAY_900,
  textSecondary: BASE_COLORS.GRAY_600,
  textTertiary: BASE_COLORS.GRAY_500,
  textPlaceholder: BASE_COLORS.GRAY_400,
  textOnPrimary: BASE_COLORS.WHITE,
  textOnSecondary: BASE_COLORS.WHITE,
  textOnDark: BASE_COLORS.WHITE,
  
  // Interactive colors
  link: BASE_COLORS.BLUE_500,
  linkHover: BASE_COLORS.BLUE_600,
  buttonPrimary: BASE_COLORS.BLUE_500,
  buttonSecondary: BASE_COLORS.GRAY_100,
  buttonDisabled: BASE_COLORS.GRAY_300,
  
  // Status colors with backgrounds
  successBackground: BASE_COLORS.GREEN_50,
  warningBackground: BASE_COLORS.YELLOW,
  errorBackground: '#FEF2F2',
  infoBackground: BASE_COLORS.BLUE_50,
  
  // Accent colors
  accent: BASE_COLORS.GOLD,
  highlight: BASE_COLORS.YELLOW,
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.25)',
  overlayDark: 'rgba(0, 0, 0, 0.75)',
  
  // Quality/Rating colors
  excellent: BASE_COLORS.EXCELLENT,
  good: BASE_COLORS.GOOD,
  average: BASE_COLORS.AVERAGE,
  poor: BASE_COLORS.POOR,
  bad: BASE_COLORS.BAD,
} as const;

/**
 * Dark theme color mapping
 * Maps semantic meanings to specific colors for dark theme
 */
export const DARK_THEME_COLORS = {
  // Primary colors
  primary: BASE_COLORS.BLUE_400,
  primaryLight: BASE_COLORS.BLUE_300,
  primaryDark: BASE_COLORS.BLUE_500,
  primaryBackground: 'rgba(59, 130, 246, 0.1)',
  
  // Secondary colors
  secondary: BASE_COLORS.GREEN_400,
  secondaryLight: BASE_COLORS.GREEN_300,
  secondaryDark: BASE_COLORS.GREEN_500,
  secondaryBackground: 'rgba(16, 185, 129, 0.1)',
  
  // Semantic colors
  success: BASE_COLORS.SUCCESS,
  warning: BASE_COLORS.WARNING,
  error: BASE_COLORS.ERROR,
  info: BASE_COLORS.INFO,
  
  // Background colors
  background: BASE_COLORS.GRAY_900,
  backgroundSecondary: BASE_COLORS.GRAY_800,
  backgroundTertiary: BASE_COLORS.GRAY_700,
  
  // Surface colors (for cards, modals, etc.)
  surface: BASE_COLORS.GRAY_800,
  surfaceSecondary: BASE_COLORS.GRAY_700,
  surfaceTertiary: BASE_COLORS.GRAY_600,
  
  // Border colors
  border: BASE_COLORS.GRAY_600,
  borderLight: BASE_COLORS.GRAY_700,
  borderDark: BASE_COLORS.GRAY_500,
  
  // Text colors
  text: BASE_COLORS.WHITE,
  textSecondary: BASE_COLORS.GRAY_300,
  textTertiary: BASE_COLORS.GRAY_400,
  textPlaceholder: BASE_COLORS.GRAY_500,
  textOnPrimary: BASE_COLORS.WHITE,
  textOnSecondary: BASE_COLORS.WHITE,
  textOnDark: BASE_COLORS.WHITE,
  
  // Interactive colors
  link: BASE_COLORS.BLUE_400,
  linkHover: BASE_COLORS.BLUE_300,
  buttonPrimary: BASE_COLORS.BLUE_500,
  buttonSecondary: BASE_COLORS.GRAY_700,
  buttonDisabled: BASE_COLORS.GRAY_600,
  
  // Status colors with backgrounds
  successBackground: 'rgba(16, 185, 129, 0.1)',
  warningBackground: 'rgba(245, 158, 11, 0.1)',
  errorBackground: 'rgba(239, 68, 68, 0.1)',
  infoBackground: 'rgba(59, 130, 246, 0.1)',
  
  // Accent colors
  accent: BASE_COLORS.GOLD,
  highlight: BASE_COLORS.YELLOW,
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.9)',
  
  // Quality/Rating colors
  excellent: BASE_COLORS.EXCELLENT,
  good: BASE_COLORS.GOOD,
  average: BASE_COLORS.AVERAGE,
  poor: BASE_COLORS.POOR,
  bad: BASE_COLORS.BAD,
} as const;

/**
 * Default theme colors (light theme)
 */
export const Colors = LIGHT_THEME_COLORS;

/**
 * Dark theme colors
 */
export const DarkColors = DARK_THEME_COLORS;

/**
 * Type definitions for color keys
 */
export type ColorKey = keyof typeof Colors;
export type ThemeColors = typeof Colors;

/**
 * Theme type definition
 */
export type Theme = 'light' | 'dark';

/**
 * Function to get colors based on theme
 * @param theme - The theme to get colors for
 * @returns Color palette for the specified theme
 */
export const getColors = (theme: Theme): ThemeColors => {
  return theme === 'dark' ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
};

/**
 * Color opacity variants
 * Utility for creating transparent versions of colors
 */
export const OPACITY_VARIANTS = {
  TRANSPARENT: 0,
  BARELY_VISIBLE: 0.05,
  SUBTLE: 0.1,
  LIGHT: 0.2,
  MEDIUM_LIGHT: 0.3,
  MEDIUM: 0.5,
  MEDIUM_STRONG: 0.7,
  STRONG: 0.8,
  VERY_STRONG: 0.9,
  OPAQUE: 1,
} as const;

/**
 * Utility function to add opacity to any color
 * @param color - The color to add opacity to
 * @param opacity - The opacity value (0-1)
 * @returns Color with opacity applied
 */
export const addOpacity = (color: string, opacity: number): string => {
  const alpha = Math.round(opacity * 255);
  const hex = alpha.toString(16).padStart(2, '0');
  return `${color}${hex}`;
};