/**
 * Navigation Types
 *
 * TypeScript type definitions for React Navigation.
 * Provides type safety for navigation parameters and screen props.
 *
 * @fileoverview Navigation type definitions
 * @author Template React Native Team
 * @version 1.0.0
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root Stack Navigator parameter list
 */
export type RootStackParamList = {
  // Authentication screens
  AuthStack: undefined;
  
  // Main app screens
  MainTabs: undefined;
  
  // Modal screens
  Modal: { content: string };
  Settings: undefined;
  Profile: undefined;
  EditProfile: { userId: string };
  
  // Onboarding screens
  Welcome: undefined;
  Tutorial: undefined;
  Permissions: undefined;
};

/**
 * Auth Stack Navigator parameter list
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

/**
 * Main Tab Navigator parameter list
 */
export type MainTabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  FavoritesTab: undefined;
  NotificationsTab: undefined;
};

/**
 * Home Stack Navigator parameter list
 */
export type HomeStackParamList = {
  Home: undefined;
  Details: { itemId: string };
  Search: { query?: string };
};

/**
 * Explore Stack Navigator parameter list
 */
export type ExploreStackParamList = {
  Explore: undefined;
  Category: { categoryId: string; categoryName: string };
  Item: { itemId: string };
};

/**
 * Favorites Stack Navigator parameter list
 */
export type FavoritesStackParamList = {
  Favorites: undefined;
  FavoriteItem: { itemId: string };
};

/**
 * Notifications Stack Navigator parameter list
 */
export type NotificationsStackParamList = {
  Notifications: undefined;
  NotificationDetail: { notificationId: string };
};

/**
 * Screen prop types for type-safe navigation
 */

// Root Stack screen props
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Auth Stack screen props
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

// Main Tab screen props
export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

// Home Stack screen props
export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// Explore Stack screen props
export type ExploreStackScreenProps<T extends keyof ExploreStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ExploreStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// Favorites Stack screen props
export type FavoritesStackScreenProps<T extends keyof FavoritesStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FavoritesStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// Notifications Stack screen props
export type NotificationsStackScreenProps<T extends keyof NotificationsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<NotificationsStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

/**
 * Utility types
 */
export type ScreenProps<
  ParamList extends Record<string, any>,
  ScreenName extends keyof ParamList
> = NativeStackScreenProps<ParamList, ScreenName>;

export type TabScreenProps<
  ParamList extends Record<string, any>,
  ScreenName extends keyof ParamList
> = BottomTabScreenProps<ParamList, ScreenName>;

/**
 * Navigation theme type
 */
export interface NavigationTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

/**
 * Tab bar icon props
 */
export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

/**
 * Screen options type
 */
export interface ScreenOptions {
  title?: string;
  headerShown?: boolean;
  headerTitle?: string;
  headerLeft?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  headerBackTitle?: string;
  headerTintColor?: string;
  headerStyle?: {
    backgroundColor?: string;
  };
  tabBarLabel?: string;
  tabBarIcon?: (props: TabBarIconProps) => React.ReactNode;
  tabBarBadge?: string | number;
  tabBarShowLabel?: boolean;
}

/**
 * Deep linking configuration types
 */
export interface LinkingConfig {
  prefixes: string[];
  config: {
    screens: Record<string, any>;
  };
}

/**
 * Navigation container state type
 */
export interface NavigationState {
  key: string;
  index: number;
  routeNames: string[];
  history?: any[];
  routes: Array<{
    key: string;
    name: string;
    params?: object;
  }>;
  type: string;
  stale: false;
}

/**
 * Screen component interface
 */
export interface ScreenComponent<T = any> {
  (props: T): React.ReactElement;
  options?: ScreenOptions | ((props: T) => ScreenOptions);
}