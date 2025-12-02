/**
 * Screens Index
 *
 * Central export point for all screen components.
 * This makes it easy to import screens throughout the application.
 *
 * @fileoverview Main export for screen components
 * @author Template React Native Team
 * @version 1.0.0
 * @usage Import screens from this central location
 */

// Export onboarding screens
export { WelcomeScreen } from './WelcomeScreen';

// Create placeholder exports for other screens
export const TutorialScreen = WelcomeScreen;
export const PermissionsScreen = WelcomeScreen;

// Add other screens here as they are created
// Example:
// export { default as HomeScreen } from './HomeScreen';
// export { default as LoginScreen } from './LoginScreen';
// export { default as RegisterScreen } from './RegisterScreen';
// export { default as ProfileScreen } from './ProfileScreen';
// export { default as SettingsScreen } from './SettingsScreen';