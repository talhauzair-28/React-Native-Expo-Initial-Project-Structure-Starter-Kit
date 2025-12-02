/**
 * Favorites Stack Navigator
 *
 * Navigation stack for the favorites tab.
 *
 * @component
 * @fileoverview Favorites tab navigation stack
 * @author Template React Native Team
 * @version 1.0.0
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '@/constants/design';

// Import screens (replace with actual screens)
import { WelcomeScreen } from '@/screens';

// Import types
import { FavoritesStackParamList } from '../types';

const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

/**
 * Favorites Stack Navigator component
 * 
 * @returns JSX.Element
 */
export const FavoritesStackNavigator: React.FC = () => {
  return (
    <FavoritesStack.Navigator
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
      <FavoritesStack.Screen
        name="Favorites"
        component={WelcomeScreen} // Replace with FavoritesScreen
        options={{
          title: 'Favorites',
          headerLargeTitle: true,
        }}
      />
      
      <FavoritesStack.Screen
        name="FavoriteItem"
        component={WelcomeScreen} // Replace with FavoriteItemScreen
        options={{
          title: 'Favorite Item',
        }}
      />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesStackNavigator;