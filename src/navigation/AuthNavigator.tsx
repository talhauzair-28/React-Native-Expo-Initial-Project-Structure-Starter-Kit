/**
 * Auth Navigator
 *
 * Navigation stack for authentication screens including login, register,
 * and password recovery flows.
 *
 * @component
 * @fileoverview Authentication navigation stack
 * @author Template React Native Team
 * @version 1.0.0
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '@/constants/design';

// Import screens (replace with actual screens)
import { WelcomeScreen } from '@/screens';

// Import types
import { AuthStackParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Authentication Navigator component
 * 
 * @returns JSX.Element
 */
export const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: Colors.text,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerBackTitle: 'Back',
        animation: 'slide_from_right',
        animationDuration: 250,
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={WelcomeScreen} // Replace with LoginScreen
        options={{
          title: 'Sign In',
          headerShown: false, // Usually login screens don't show header
        }}
      />
      
      <AuthStack.Screen
        name="Register"
        component={WelcomeScreen} // Replace with RegisterScreen
        options={{
          title: 'Create Account',
          headerShown: true,
        }}
      />
      
      <AuthStack.Screen
        name="ForgotPassword"
        component={WelcomeScreen} // Replace with ForgotPasswordScreen
        options={{
          title: 'Reset Password',
          headerShown: true,
        }}
      />
      
      <AuthStack.Screen
        name="ResetPassword"
        component={WelcomeScreen} // Replace with ResetPasswordScreen
        options={{
          title: 'New Password',
          headerShown: true,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;