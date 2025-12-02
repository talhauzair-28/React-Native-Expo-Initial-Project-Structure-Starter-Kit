/**
 * Navigation Index
 *
 * Central export point for all navigation components and utilities.
 * This makes it easy to import navigation throughout the application.
 *
 * @fileoverview Main export for navigation
 * @author Template React Native Team
 * @version 1.0.0
 * @usage Import navigation components from this central location
 */

// Export main navigator
export { default as AppNavigator } from './AppNavigator';

// Export individual navigators
export { default as AuthNavigator } from './AuthNavigator';
export { default as MainTabNavigator } from './MainTabNavigator';

// Export stack navigators
export { default as HomeStackNavigator } from './stacks/HomeStackNavigator';
export { default as ExploreStackNavigator } from './stacks/ExploreStackNavigator';
export { default as FavoritesStackNavigator } from './stacks/FavoritesStackNavigator';
export { default as NotificationsStackNavigator } from './stacks/NotificationsStackNavigator';

// Export types
export * from './types';

// Export navigation utilities
export { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
export type { NavigationProp, RouteProp } from '@react-navigation/native';