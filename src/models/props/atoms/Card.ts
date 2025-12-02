/**
 * Card Component Props
 *
 * Type definitions for Card atom component props.
 * Provides a flexible container with consistent styling and elevation.
 *
 * @fileoverview Card component prop definitions
 * @author Template React Native Team
 * @version 1.0.0
 */

import { ReactNode } from 'react';
import { ViewProps, ViewStyle } from 'react-native';

import { CardVariant, Size } from '@/models/enums';
import { ColorKey } from '@/constants/design';

/**
 * Props for the Card component
 * @interface CardProps
 * @extends React Native ViewProps
 */
export interface CardProps extends ViewProps {
  /**
   * Card variant for different visual styles
   * @default CardVariant.DEFAULT
   */
  variant?: CardVariant;

  /**
   * Card size affecting padding and spacing
   * @default Size.MD
   */
  size?: Size.SM | Size.MD | Size.LG;

  /**
   * Card background color from design system
   * @default 'surface'
   */
  backgroundColor?: ColorKey | string;

  /**
   * Card border color from design system
   */
  borderColor?: ColorKey | string;

  /**
   * Card border width
   * @default 1 (for outlined variant)
   */
  borderWidth?: number;

  /**
   * Card border radius override
   */
  borderRadius?: number;

  /**
   * Card elevation (shadow) level
   * @default 3
   */
  elevation?: number;

  /**
   * Card padding override
   */
  padding?: number;

  /**
   * Card margin override
   */
  margin?: number;

  /**
   * Card width
   */
  width?: number | string;

  /**
   * Card height
   */
  height?: number | string;

  /**
   * Card minimum height
   */
  minHeight?: number;

  /**
   * Card maximum height
   */
  maxHeight?: number;

  /**
   * Card minimum width
   */
  minWidth?: number;

  /**
   * Card maximum width
   */
  maxWidth?: number;

  /**
   * Enable card press interaction
   * @default false
   */
  pressable?: boolean;

  /**
   * Card press handler
   */
  onPress?: () => void;

  /**
   * Card long press handler
   */
  onLongPress?: () => void;

  /**
   * Press feedback opacity
   * @default 0.7
   */
  activeOpacity?: number;

  /**
   * Disable card interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom style overrides
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Children content
   */
  children?: ReactNode;

  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint for screen readers
   */
  accessibilityHint?: string;

  /**
   * Accessibility role
   */
  accessibilityRole?: 'button' | 'none' | 'text';

  /**
   * Test ID for automated testing
   */
  testID?: string;

  /**
   * Enable loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Loading indicator color
   */
  loadingColor?: string;
}