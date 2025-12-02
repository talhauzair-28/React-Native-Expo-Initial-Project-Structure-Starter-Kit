/**
 * Main App Component
 *
 * Root component that sets up providers, navigation, and app initialization.
 * Integrates Redux store, navigation, and theme providers.
 *
 * @component
 * @fileoverview Main application component
 * @author Template React Native Team
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';

// Redux store
import { store, persistor } from '@/store';

// Navigation
import { AppNavigator } from '@/navigation';

// Utils
import { checkAuthStatus, setInitialized } from '@/store';

// Design system
import { Colors } from '@/constants/design';

/**
 * Loading component while persistence rehydrates
 */
const LoadingComponent: React.FC = () => (
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
 * Main App Component
 * 
 * @returns JSX.Element
 */
export default function App() {
  // ==========================================
  // Effects
  // ==========================================
  
  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Perform any app initialization here
        // Examples:
        // - Load configuration
        // - Set up analytics
        // - Initialize crash reporting
        // - Load cached data
        
        // Mark app as initialized
        store.dispatch(setInitialized(true));
      } catch (error) {
        console.error('App initialization error:', error);
        // Handle initialization errors gracefully
        store.dispatch(setInitialized(true)); // Still mark as initialized to prevent infinite loading
      }
    };

    initializeApp();
  }, []);

  // ==========================================
  // Render
  // ==========================================
  
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        {/* Status bar configuration */}
        <StatusBar style="auto" backgroundColor={Colors.background} />
        
        {/* Main app navigation */}
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}