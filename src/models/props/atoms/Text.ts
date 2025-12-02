/**
 * Text Component Props
 *
 * Type definitions for Text atom component props.
 * Extends React Native TextProps with custom typography system integration.
 *
 * @fileoverview Text component prop definitions
 * @author Template React Native Team
 * @version 1.0.0
 */

import { ReactNode } from 'react';
import { TextProps as RNTextProps, TextStyle } from 'react-native';

import { TypographyVariant } from '@/constants/design';
import { ColorKey } from '@/constants/design';

/**
 * Props for the Text component
 * @interface TextProps
 * @extends React Native TextProps
 */
export interface TextProps extends RNTextProps {
  /**
   * Typography variant from design system
   * @default 'body'
   */
  variant?: TypographyVariant;

  /**
   * Text color from design system
   * Uses semantic color names for consistency
   */
  color?: ColorKey | string;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'justify';

  /**
   * Text transform
   */
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';

  /**
   * Text decoration
   */
  decoration?: 'none' | 'underline' | 'line-through' | 'underline line-through';

  /**
   * Font weight override
   */
  weight?: '300' | '400' | '500' | '600' | '700' | '800';

  /**
   * Font size override (use sparingly, prefer variant)
   */
  size?: number;

  /**
   * Line height override (use sparingly, prefer variant)
   */
  lineHeight?: number;

  /**
   * Letter spacing override
   */
  letterSpacing?: number;

  /**
   * Text opacity
   * @default 1
   */
  opacity?: number;

  /**
   * Enable text selection
   * @default false
   */
  selectable?: boolean;

  /**
   * Truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Custom style overrides
   */
  style?: TextStyle | TextStyle[];

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
   * Test ID for automated testing
   */
  testID?: string;

  /**
   * Enable RTL support
   * @default false
   */
  rtl?: boolean;

  /**
   * Text direction for RTL languages
   */
  textDirection?: 'ltr' | 'rtl' | 'auto';
}