/**
 * Home Stack Navigator
 *
 * Navigation stack for the home tab including home, details, and search screens.
 *
 * @component
 * @fileoverview Home tab navigation stack
 * @author Template React Native Team
 * @version 1.0.0
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '@/constants/design';

// Import screens (replace with actual screens)
import { WelcomeScreen } from '@/screens';

// Import types
import { HomeStackParamList } from '../types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Home Stack Navigator component
 * 
 * @returns JSX.Element
 */
export const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
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
      <HomeStack.Screen
        name="Home"
        component={WelcomeScreen} // Replace with HomeScreen
        options={{
          title: 'Home',
          headerLargeTitle: true, // iOS large title
        }}
      />
      
      <HomeStack.Screen
        name="Details"
        component={WelcomeScreen} // Replace with DetailsScreen
        options={{
          title: 'Details',
        }}
      />
      
      <HomeStack.Screen
        name="Search"
        component={WelcomeScreen} // Replace with SearchScreen
        options={{
          title: 'Search',
          headerSearchBarOptions: {
            placeholder: 'Search...',
            hideWhenScrolling: false,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;