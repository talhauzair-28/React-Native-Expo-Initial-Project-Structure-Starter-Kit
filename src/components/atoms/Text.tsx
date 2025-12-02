/**
 * Text Component (Atom)
 *
 * A typography component that provides consistent text styling throughout the app.
 * Integrates with the design system's typography variants and semantic colors.
 *
 * @component
 * @example
 * // Basic text with variant
 * <Text variant="h1" color="text">
 *   Welcome to the App
 * </Text>
 *
 * // Body text with custom styling
 * <Text variant="body" align="center" truncate>
 *   This is some body text that will be truncated if too long
 * </Text>
 *
 * @usage Used in:
 * - All text display throughout the application
 * - Headers, paragraphs, labels, captions
 * - Molecules: Card, FormField, NavigationItem
 * - Organisms: All organisms for text content
 * - Screens: All screens for text display
 */

import React from 'react';
import { Text as RNText } from 'react-native';

import { Colors, getTypographyStyle } from '@/constants/design';
import { TextProps } from '@/models/props';

/**
 * Text component for consistent typography
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'text',
  align = 'left',
  transform = 'none',
  decoration = 'none',
  weight,
  size,
  lineHeight,
  letterSpacing,
  opacity = 1,
  selectable = false,
  truncate = false,
  style,
  children,
  rtl = false,
  textDirection = 'auto',
  ...props
}) => {
  // ==========================================
  // Helper Methods
  // ==========================================
  
  /**
   * Get color value from design system or use custom color
   * @returns Color string
   */
  const getColorValue = (): string => {
    // Check if color exists in design system
    if (color in Colors) {
      return Colors[color as keyof typeof Colors];
    }
    // Use custom color if provided
    return color;
  };

  /**
   * Get base typography styles from variant
   * @returns Typography style object
   */
  const getBaseStyles = () => {
    return getTypographyStyle(variant);
  };

  /**
   * Get text alignment style
   * @returns Text alignment
   */
  const getTextAlign = () => {
    if (rtl && align === 'left') {
      return 'right';
    }
    if (rtl && align === 'right') {
      return 'left';
    }
    return align;
  };

  // ==========================================
  // Computed Styles
  // ==========================================
  
  const baseStyles = getBaseStyles();
  
  const computedStyle = [
    baseStyles,
    {
      color: getColorValue(),
      textAlign: getTextAlign(),
      textTransform: transform,
      textDecorationLine: decoration,
      opacity,
      writingDirection: textDirection,
      ...(weight && { fontWeight: weight }),
      ...(size && { fontSize: size }),
      ...(lineHeight && { lineHeight }),
      ...(letterSpacing && { letterSpacing }),
      ...(truncate && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    },
    style,
  ];

  // ==========================================
  // Props Configuration
  // ==========================================
  
  const textProps = {
    ...props,
    selectable,
    ...(truncate && {
      numberOfLines: 1,
      ellipsizeMode: 'tail' as const,
    }),
  };

  // ==========================================
  // Render
  // ==========================================
  
  return (
    <RNText {...textProps} style={computedStyle}>
      {children}
    </RNText>
  );
};

export default Text;