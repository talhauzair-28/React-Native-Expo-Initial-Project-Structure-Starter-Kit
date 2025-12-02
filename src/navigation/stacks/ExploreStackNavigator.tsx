/**
 * Explore Stack Navigator
 *
 * Navigation stack for the explore tab including explore, category, and item screens.
 *
 * @component
 * @fileoverview Explore tab navigation stack
 * @author Template React Native Team
 * @version 1.0.0
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '@/constants/design';

// Import screens (replace with actual screens)
import { WelcomeScreen } from '@/screens';

// Import types
import { ExploreStackParamList } from '../types';

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

/**
 * Explore Stack Navigator component
 * 
 * @returns JSX.Element
 */
export const ExploreStackNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator
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
      <ExploreStack.Screen
        name="Explore"
        component={WelcomeScreen} // Replace with ExploreScreen
        options={{
          title: 'Explore',
          headerLargeTitle: true,
        }}
      />
      
      <ExploreStack.Screen
        name="Category"
        component={WelcomeScreen} // Replace with CategoryScreen
        options={({ route }) => ({
          title: route.params?.categoryName || 'Category',
        })}
      />
      
      <ExploreStack.Screen
        name="Item"
        component={WelcomeScreen} // Replace with ItemScreen
        options={{
          title: 'Item Details',
        }}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreStackNavigator;