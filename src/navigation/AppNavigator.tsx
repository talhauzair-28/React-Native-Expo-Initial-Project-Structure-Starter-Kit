/**
 * App Navigator
 *
 * Main navigation component that handles authentication flow and app navigation.
 * Integrates with Redux for authentication state and provides type-safe navigation.
 *
 * @component
 * @fileoverview Main application navigator
 * @author Template React Native Team
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import { useAppDispatch, useAppSelector, selectors, checkAuthStatus } from '@/store';
import { Colors, getColors } from '@/constants/design';
import { Theme } from '@/models/enums';

// Import navigators
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
// Import screens
import { WelcomeScreen, TutorialScreen, PermissionsScreen } from '@/screens';

// Import types
import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * App Navigator component
 * 
 * @returns JSX.Element
 */
export const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const isAuthenticated = useAppSelector(selectors.selectIsAuthenticated);
  const isCheckingAuth = useAppSelector(selectors.selectIsCheckingAuth);
  const isInitialized = useAppSelector(selectors.selectIsInitialized);
  const theme = useAppSelector(selectors.selectTheme);
  const isFirstLaunch = useAppSelector(selectors.selectIsFirstLaunch);
  const hasCompletedOnboarding = useAppSelector(selectors.selectHasCompletedOnboarding);

  // Check authentication status on app start
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  /**
   * Get navigation theme based on current theme
   */
  const getNavigationTheme = () => {
    const colors = getColors(theme);
    
    const customTheme = {
      ...(theme === Theme.DARK ? DarkTheme : DefaultTheme),
      colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.error,
      },
    };
    
    return customTheme;
  };

  /**
   * Loading screen component
   */
  const LoadingScreen = () => (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.background,
    }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );

  /**
   * Determine which navigator to show based on app state
   */
  const getInitialRouteName = (): keyof RootStackParamList => {
    if (isFirstLaunch || !hasCompletedOnboarding) {
      return 'Welcome';
    }
    
    if (isAuthenticated) {
      return 'MainTabs';
    }
    
    return 'AuthStack';
  };

  // Show loading screen while checking authentication
  if (isCheckingAuth || !isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={getNavigationTheme()}>
      <RootStack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      >
        {/* Onboarding Screens */}
        {(isFirstLaunch || !hasCompletedOnboarding) ? (
          <>
            <RootStack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Tutorial"
              component={TutorialScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="Permissions"
              component={PermissionsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            {/* Authentication Flow */}
            {!isAuthenticated && (
              <RootStack.Screen
                name="AuthStack"
                component={AuthNavigator}
                options={{ headerShown: false }}
              />
            )}

            {/* Main App Flow */}
            {isAuthenticated && (
              <RootStack.Screen
                name="MainTabs"
                component={MainTabNavigator}
                options={{ headerShown: false }}
              />
            )}

            {/* Modal Screens */}
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
              <RootStack.Screen
                name="Settings"
                component={WelcomeScreen} // Replace with SettingsScreen
                options={{
                  headerShown: true,
                  title: 'Settings',
                  headerLeft: undefined,
                }}
              />
              <RootStack.Screen
                name="Profile"
                component={WelcomeScreen} // Replace with ProfileScreen
                options={{
                  headerShown: true,
                  title: 'Profile',
                }}
              />
              <RootStack.Screen
                name="EditProfile"
                component={WelcomeScreen} // Replace with EditProfileScreen
                options={{
                  headerShown: true,
                  title: 'Edit Profile',
                }}
              />
            </RootStack.Group>

            {/* Full Screen Modal */}
            <RootStack.Group screenOptions={{ 
              presentation: 'fullScreenModal',
              animation: 'slide_from_bottom',
            }}>
              <RootStack.Screen
                name="Modal"
                component={WelcomeScreen} // Replace with ModalScreen
                options={{
                  headerShown: true,
                  title: 'Modal',
                }}
              />
            </RootStack.Group>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;