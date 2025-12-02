/**
 * Button Component (Atom)
 *
 * A customizable button component with consistent styling and behavior.
 * Built on top of react-native-elements Button with design system integration.
 *
 * @component
 * @example
 * // Primary button
 * <Button variant="primary" size="large" onPress={handlePress}>
 *   Submit
 * </Button>
 *
 * // Secondary button with icon
 * <Button variant="secondary" size="medium" leftIcon={{ name: "check" }}>
 *   Complete
 * </Button>
 *
 * @usage Used in:
 * - Form submissions and actions
 * - Navigation elements
 * - Call-to-action elements
 * - Molecules: FormField, NavigationItem
 * - Organisms: Throughout all organisms for user actions
 * - Screens: All screens for user interactions
 */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';

import {
  BORDER_RADIUS,
  ButtonVariant,
  Colors,
  COMPONENT_DIMENSIONS,
  Size,
  TYPOGRAPHY,
} from '@/constants/design';
import { ButtonProps } from '@/models/props';

/**
 * Button component for consistent user interactions
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.PRIMARY,
  size = Size.MD,
  buttonStyle,
  titleStyle,
  leftIcon,
  rightIcon,
  children,
  disabled = false,
  loading = false,
  loadingColor,
  fullWidth = false,
  minWidth,
  maxWidth,
  elevation,
  title,
  ...props
}) => {
  // ==========================================
  // Helper Methods
  // ==========================================
  
  /**
   * Get background color based on variant
   * @returns Background color string
   */
  const getBackgroundColor = (): string => {
    if (disabled) {
      return Colors.buttonDisabled;
    }

    switch (variant) {
      case ButtonVariant.PRIMARY:
        return Colors.primary;
      case ButtonVariant.SECONDARY:
        return Colors.secondary;
      case ButtonVariant.SUCCESS:
        return Colors.success;
      case ButtonVariant.WARNING:
        return Colors.warning;
      case ButtonVariant.ERROR:
        return Colors.error;
      case ButtonVariant.INFO:
        return Colors.info;
      case ButtonVariant.OUTLINED:
      case ButtonVariant.TEXT:
      case ButtonVariant.LINK:
        return 'transparent';
      default:
        return Colors.primary;
    }
  };

  /**
   * Get border configuration based on variant
   * @returns Border configuration object
   */
  const getBorderConfig = () => {
    if (variant === ButtonVariant.OUTLINED) {
      return {
        borderWidth: 1,
        borderColor: disabled ? Colors.buttonDisabled : Colors.primary,
      };
    }
    return {};
  };

  /**
   * Get size-specific styles
   * @returns Size-related styles object
   */
  const getSizeStyles = () => {
    const config = {
      [Size.SM]: {
        height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_SM,
        paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL * 0.75,
      },
      [Size.MD]: {
        height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_MD,
        paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL,
      },
      [Size.LG]: {
        height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_LG,
        paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL * 1.25,
      },
      [Size.XL]: {
        height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_XL,
        paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL * 1.5,
      },
    };

    return config[size] || config[Size.MD];
  };

  /**
   * Get title typography style based on size
   * @returns Typography style object
   */
  const getTitleTypography = () => {
    const config = {
      [Size.SM]: TYPOGRAPHY.buttonSmall,
      [Size.MD]: TYPOGRAPHY.button,
      [Size.LG]: TYPOGRAPHY.buttonLarge,
      [Size.XL]: TYPOGRAPHY.buttonLarge,
    };

    return config[size] || config[Size.MD];
  };

  /**
   * Get title color based on variant
   * @returns Color string for title text
   */
  const getTitleColor = (): string => {
    if (disabled) {
      return Colors.textTertiary;
    }

    switch (variant) {
      case ButtonVariant.OUTLINED:
      case ButtonVariant.TEXT:
      case ButtonVariant.LINK:
        return Colors.primary;
      default:
        return Colors.textOnPrimary;
    }
  };

  /**
   * Get icon configuration with proper sizing
   * @param icon - Icon configuration
   * @returns Processed icon configuration
   */
  const processIcon = (icon: typeof leftIcon) => {
    if (!icon) return undefined;

    const iconSizeMap = {
      [Size.SM]: 16,
      [Size.MD]: 20,
      [Size.LG]: 24,
      [Size.XL]: 28,
    };

    return {
      ...icon,
      size: icon.size || iconSizeMap[size] || 20,
      color: icon.color || getTitleColor(),
    };
  };

  // ==========================================
  // Styles
  // ==========================================
  
  const computedButtonStyle = [
    {
      borderRadius: BORDER_RADIUS.MD,
      backgroundColor: getBackgroundColor(),
      ...getBorderConfig(),
      ...getSizeStyles(),
      ...(fullWidth && { width: '100%' }),
      ...(minWidth && { minWidth }),
      ...(maxWidth && { maxWidth }),
      ...(elevation && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: elevation / 2 },
        shadowOpacity: 0.1,
        shadowRadius: elevation,
        elevation,
      }),
    },
    buttonStyle,
  ];

  const computedTitleStyle = [
    {
      color: getTitleColor(),
      ...getTitleTypography(),
    },
    titleStyle,
  ];

  // ==========================================
  // Loading State
  // ==========================================
  
  if (loading) {
    return (
      <RNEButton
        {...props}
        disabled={true}
        buttonStyle={computedButtonStyle}
        titleStyle={[computedTitleStyle, { opacity: 0 }]}
        title={title || 'Loading...'}
      >
        <ActivityIndicator
          color={loadingColor || getTitleColor()}
          size="small"
          style={{ position: 'absolute' }}
        />
      </RNEButton>
    );
  }

  // ==========================================
  // Render
  // ==========================================
  
  return (
    <RNEButton
      {...props}
      disabled={disabled}
      buttonStyle={computedButtonStyle}
      titleStyle={computedTitleStyle}
      title={children ? undefined : title}
      icon={processIcon(leftIcon)}
      iconRight={!!rightIcon}
      iconContainerStyle={
        rightIcon ? { marginLeft: 8 } : leftIcon ? { marginRight: 8 } : undefined
      }
    >
      {children}
    </RNEButton>
  );
};

export default Button;