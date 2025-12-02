/**
 * Redux Store Configuration
 *
 * Configures the Redux store with Redux Toolkit, including slices, middleware,
 * and persistence setup for React Native applications.
 *
 * @fileoverview Redux store setup and configuration
 * @author Template React Native Team
 * @version 1.0.0
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Import slice reducers
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';

/**
 * Root reducer combining all slice reducers
 */
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  // Add more reducers here as needed
});

/**
 * Redux persist configuration
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'app'], // Only persist auth and app slices
  blacklist: [], // Add slices to exclude from persistence
  version: 1,
  // Optional: Add state migration logic for version updates
  // migrate: createMigrate(migrations, { debug: __DEV__ }),
};

/**
 * Persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure Redux store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore non-serializable values in specific paths
        ignoredPaths: ['auth.user.createdAt', 'auth.user.updatedAt', 'auth.auth.expiresAt'],
      },
      // Enable development middleware only in development
      immutableCheck: __DEV__,
      actionCreatorCheck: __DEV__,
    }),
  devTools: __DEV__, // Enable Redux DevTools in development
  preloadedState: undefined, // Add preloaded state if needed
});

/**
 * Configure Redux persistor
 */
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Typed hooks for use throughout the application
 */
export type { TypedUseSelectorHook } from 'react-redux';
export { useDispatch, useSelector } from 'react-redux';

// Create typed versions of the hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Store utilities
 */
export const storeUtils = {
  /**
   * Get current state snapshot
   */
  getState: () => store.getState(),
  
  /**
   * Dispatch action
   */
  dispatch: store.dispatch,
  
  /**
   * Clear persisted state
   */
  clearPersisted: () => {
    persistor.purge();
  },
  
  /**
   * Persist current state
   */
  persist: () => {
    persistor.persist();
  },
  
  /**
   * Get specific slice state
   */
  getAuthState: () => store.getState().auth,
  getAppState: () => store.getState().app,
};

/**
 * Store selector helpers
 */
export const selectors = {
  // Auth selectors
  selectAuthUser: (state: RootState) => state.auth.user,
  selectIsAuthenticated: (state: RootState) => state.auth.isAuthenticated,
  selectAuthStatus: (state: RootState) => state.auth.status,
  selectAuthError: (state: RootState) => state.auth.error,
  selectIsCheckingAuth: (state: RootState) => state.auth.isCheckingAuth,
  
  // App selectors
  selectTheme: (state: RootState) => state.app.theme,
  selectLanguage: (state: RootState) => state.app.language,
  selectIsInitialized: (state: RootState) => state.app.isInitialized,
  selectIsLoading: (state: RootState) => state.app.isLoading,
  selectNetworkStatus: (state: RootState) => state.app.networkStatus,
  selectAppSettings: (state: RootState) => state.app.settings,
  selectModalState: (state: RootState) => state.app.modal,
  selectAppError: (state: RootState) => state.app.error,
  selectHasCompletedOnboarding: (state: RootState) => state.app.hasCompletedOnboarding,
  selectIsFirstLaunch: (state: RootState) => state.app.isFirstLaunch,
};

/**
 * Action creators for easy access
 */
export { default as authActions } from './slices/authSlice';
export { default as appActions } from './slices/appSlice';

// Export individual actions for convenience
export {
  loginUser,
  registerUser,
  logoutUser,
  checkAuthStatus,
  clearError as clearAuthError,
  setRememberMe,
  updateUserProfile,
  resetAuth,
} from './slices/authSlice';

export {
  setTheme,
  toggleTheme,
  setLanguage,
  setInitialized,
  setLoading,
  setNetworkStatus,
  setFirstLaunch,
  setOnboardingCompleted,
  setPermission,
  setPushToken,
  setDeviceInfo,
  updateSettings,
  resetSettings,
  showModal,
  hideModal,
  setError,
  clearError,
  resetApp,
} from './slices/appSlice';