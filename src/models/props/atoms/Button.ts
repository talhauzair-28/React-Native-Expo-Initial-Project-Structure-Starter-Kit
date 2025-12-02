/**
 * Button Component Props
 *
 * Type definitions for Button atom component props.
 * Extends react-native-elements ButtonProps with custom design system integration.
 *
 * @fileoverview Button component prop definitions
 * @author Template React Native Team
 * @version 1.0.0
 */

import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { ButtonProps as RNEButtonProps } from 'react-native-elements';

import { ButtonVariant, Size, IconSize } from '@/models/enums';

/**
 * Props for the Button component
 * @interface ButtonProps
 * @extends RNEButtonProps from react-native-elements
 */
export interface ButtonProps extends Omit<RNEButtonProps, 'buttonStyle' | 'titleStyle'> {
  /**
   * Button style variant
   * @default ButtonVariant.PRIMARY
   */
  variant?:
    | ButtonVariant.PRIMARY
    | ButtonVariant.SECONDARY
    | ButtonVariant.SUCCESS
    | ButtonVariant.WARNING
    | ButtonVariant.ERROR
    | ButtonVariant.INFO
    | ButtonVariant.OUTLINED
    | ButtonVariant.TEXT
    | ButtonVariant.LINK;

  /**
   * Button size affecting padding and text size
   * @default Size.MD
   */
  size?: Size.SM | Size.MD | Size.LG | Size.XL;

  /**
   * Additional button container styles
   */
  buttonStyle?: ViewStyle | ViewStyle[];

  /**
   * Additional title text styles
   */
  titleStyle?: TextStyle | TextStyle[];

  /**
   * Icon to display before the title
   */
  leftIcon?: {
    name: string;
    type?: string;
    size?: IconSize;
    color?: string;
  };

  /**
   * Icon to display after the title
   */
  rightIcon?: {
    name: string;
    type?: string;
    size?: IconSize;
    color?: string;
  };

  /**
   * Custom content to render instead of title
   */
  children?: ReactNode;

  /**
   * Button disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Button loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Loading indicator color
   */
  loadingColor?: string;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Minimum width for the button
   */
  minWidth?: number;

  /**
   * Maximum width for the button
   */
  maxWidth?: number;

  /**
   * Button elevation (shadow)
   */
  elevation?: number;

  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint for screen readers
   */
  accessibilityHint?: string;

  /**
   * Test ID for automated testing
   */
  testID?: string;
}