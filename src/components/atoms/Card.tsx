/**
 * Card Component (Atom)
 *
 * A flexible container component that provides consistent styling and elevation.
 * Supports various variants, sizes, and interaction states.
 *
 * @component
 * @example
 * // Basic card
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 *
 * // Pressable card with custom styling
 * <Card 
 *   variant="elevated" 
 *   pressable 
 *   onPress={() => console.log('Card pressed')}
 * >
 *   <Text>Pressable card content</Text>
 * </Card>
 *
 * @usage Used in:
 * - Content containers
 * - List items
 * - Information displays
 * - Molecules: ProductCard, ProfileCard, StatsCard
 * - Organisms: CardList, Dashboard sections
 * - Screens: All screens for content grouping
 */

import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';

import {
  BORDER_RADIUS,
  CardVariant,
  Colors,
  COMPONENT_DIMENSIONS,
  ELEVATION,
  Size,
  SPACING,
} from '@/constants/design';
import { CardProps } from '@/models/props';

/**
 * Card component for content containers
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Card: React.FC<CardProps> = ({
  variant = CardVariant.DEFAULT,
  size = Size.MD,
  backgroundColor = 'surface',
  borderColor,
  borderWidth,
  borderRadius,
  elevation,
  padding,
  margin,
  width,
  height,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  pressable = false,
  onPress,
  onLongPress,
  activeOpacity = 0.7,
  disabled = false,
  style,
  children,
  loading = false,
  loadingColor,
  ...props
}) => {
  // ==========================================
  // Helper Methods
  // ==========================================
  
  /**
   * Get background color value from design system or custom color
   * @returns Background color string
   */
  const getBackgroundColor = (): string => {
    if (backgroundColor in Colors) {
      return Colors[backgroundColor as keyof typeof Colors];
    }
    return backgroundColor;
  };

  /**
   * Get border color value from design system or custom color
   * @returns Border color string or undefined
   */
  const getBorderColor = (): string | undefined => {
    if (!borderColor) return undefined;
    
    if (borderColor in Colors) {
      return Colors[borderColor as keyof typeof Colors];
    }
    return borderColor;
  };

  /**
   * Get variant-specific styles
   * @returns Variant styles object
   */
  const getVariantStyles = () => {
    const baseStyles = {
      backgroundColor: getBackgroundColor(),
      borderRadius: borderRadius ?? COMPONENT_DIMENSIONS.CARD.BORDER_RADIUS,
    };

    switch (variant) {
      case CardVariant.ELEVATED:
        return {
          ...baseStyles,
          ...ELEVATION.CARD,
        };
      case CardVariant.OUTLINED:
        return {
          ...baseStyles,
          borderWidth: borderWidth ?? 1,
          borderColor: getBorderColor() ?? Colors.border,
        };
      case CardVariant.FILLED:
        return {
          ...baseStyles,
          backgroundColor: Colors.backgroundSecondary,
        };
      default:
        return {
          ...baseStyles,
          ...ELEVATION.LOW,
        };
    }
  };

  /**
   * Get size-specific styles
   * @returns Size styles object
   */
  const getSizeStyles = () => {
    const config = {
      [Size.SM]: {
        padding: padding ?? COMPONENT_DIMENSIONS.CARD.PADDING_SM,
        margin: margin ?? SPACING.XS,
      },
      [Size.MD]: {
        padding: padding ?? COMPONENT_DIMENSIONS.CARD.PADDING,
        margin: margin ?? SPACING.SM,
      },
      [Size.LG]: {
        padding: padding ?? COMPONENT_DIMENSIONS.CARD.PADDING_LG,
        margin: margin ?? SPACING.MD,
      },
    };

    return config[size] || config[Size.MD];
  };

  /**
   * Get dimension styles
   * @returns Dimension styles object
   */
  const getDimensionStyles = () => {
    return {
      ...(width && { width }),
      ...(height && { height }),
      ...(minHeight && { minHeight }),
      ...(maxHeight && { maxHeight }),
      ...(minWidth && { minWidth }),
      ...(maxWidth && { maxWidth }),
    };
  };

  /**
   * Get elevation styles if specified
   * @returns Elevation styles object
   */
  const getElevationStyles = () => {
    if (!elevation) return {};
    
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.1,
      shadowRadius: elevation,
      elevation,
    };
  };

  // ==========================================
  // Computed Styles
  // ==========================================
  
  const computedStyle = [
    getVariantStyles(),
    getSizeStyles(),
    getDimensionStyles(),
    getElevationStyles(),
    disabled && { opacity: 0.6 },
    style,
  ];

  // ==========================================
  // Loading State
  // ==========================================
  
  if (loading) {
    return (
      <View style={computedStyle} {...props}>
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: 100,
        }}>
          <ActivityIndicator
            color={loadingColor || Colors.primary}
            size="large"
          />
        </View>
      </View>
    );
  }

  // ==========================================
  // Render
  // ==========================================
  
  // If pressable and not disabled, wrap in TouchableOpacity
  if (pressable && !disabled && (onPress || onLongPress)) {
    return (
      <TouchableOpacity
        style={computedStyle}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={activeOpacity}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  // Otherwise render as regular View
  return (
    <View style={computedStyle} {...props}>
      {children}
    </View>
  );
};

export default Card;