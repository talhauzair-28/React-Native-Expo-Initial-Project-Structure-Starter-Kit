/**
 * Notifications Stack Navigator
 *
 * Navigation stack for the notifications tab.
 *
 * @component
 * @fileoverview Notifications tab navigation stack
 * @author Template React Native Team
 * @version 1.0.0
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '@/constants/design';

// Import screens (replace with actual screens)
import { WelcomeScreen } from '@/screens';

// Import types
import { NotificationsStackParamList } from '../types';

const NotificationsStack = createNativeStackNavigator<NotificationsStackParamList>();

/**
 * Notifications Stack Navigator component
 * 
 * @returns JSX.Element
 */
export const NotificationsStackNavigator: React.FC = () => {
  return (
    <NotificationsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerBackTitle: 'Back',
        animation: 'slide_from_right',
      }}
    >
      <NotificationsStack.Screen
        name="Notifications"
        component={WelcomeScreen} // Replace with NotificationsScreen
        options={{
          title: 'Notifications',
          headerLargeTitle: true,
        }}
      />
      
      <NotificationsStack.Screen
        name="NotificationDetail"
        component={WelcomeScreen} // Replace with NotificationDetailScreen
        options={{
          title: 'Notification',
        }}
      />
    </NotificationsStack.Navigator>
  );
};

export default NotificationsStackNavigator;