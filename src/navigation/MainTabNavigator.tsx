/**
 * Main Tab Navigator
 *
 * Bottom tab navigation for the main application screens.
 * Includes Home, Explore, Favorites, and Notifications tabs.
 *
 * @component
 * @fileoverview Main tab navigation
 * @author Template React Native Team
 * @version 1.0.0
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, LAYOUT } from '@/constants/design';
import { useAppSelector, selectors } from '@/store';

// Import stack navigators
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { ExploreStackNavigator } from './stacks/ExploreStackNavigator';
import { FavoritesStackNavigator } from './stacks/FavoritesStackNavigator';
import { NotificationsStackNavigator } from './stacks/NotificationsStackNavigator';

// Import types
import { MainTabParamList, TabBarIconProps } from './types';

const MainTab = createBottomTabNavigator<MainTabParamList>();

/**
 * Get tab bar icon based on route name
 */
const getTabBarIcon = (routeName: keyof MainTabParamList) => {
  return ({ focused, color, size }: TabBarIconProps) => {
    let iconName: keyof typeof Ionicons.glyphMap;

    switch (routeName) {
      case 'HomeTab':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'ExploreTab':
        iconName = focused ? 'compass' : 'compass-outline';
        break;
      case 'FavoritesTab':
        iconName = focused ? 'heart' : 'heart-outline';
        break;
      case 'NotificationsTab':
        iconName = focused ? 'notifications' : 'notifications-outline';
        break;
      default:
        iconName = 'ellipse-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  };
};

/**
 * Main Tab Navigator component
 * 
 * @returns JSX.Element
 */
export const MainTabNavigator: React.FC = () => {
  const theme = useAppSelector(selectors.selectTheme);

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? LAYOUT.TAB_BAR_HEIGHT + 20 : LAYOUT.TAB_BAR_HEIGHT,
          paddingTop: 5,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
        // Hide tab bar on specific screens if needed
        // tabBarStyle: { display: 'none' }, // Use this in screen options to hide tab bar
      })}
      initialRouteName="HomeTab"
      backBehavior="history"
    >
      <MainTab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          // Optional: Add badge to tab
          // tabBarBadge: 3,
        }}
      />

      <MainTab.Screen
        name="ExploreTab"
        component={ExploreStackNavigator}
        options={{
          title: 'Explore',
          tabBarLabel: 'Explore',
        }}
      />

      <MainTab.Screen
        name="FavoritesTab"
        component={FavoritesStackNavigator}
        options={{
          title: 'Favorites',
          tabBarLabel: 'Favorites',
        }}
      />

      <MainTab.Screen
        name="NotificationsTab"
        component={NotificationsStackNavigator}
        options={{
          title: 'Notifications',
          tabBarLabel: 'Notifications',
          // Show badge for unread notifications
          // tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;