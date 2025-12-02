/**
 * Application Slice
 *
 * Redux slice for managing global application state including theme, language,
 * connectivity, and app-wide settings using Redux Toolkit.
 *
 * @fileoverview Application state management
 * @author Template React Native Team
 * @version 1.0.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Theme, Language, Status, NetworkStatus } from '@/models/enums';

/**
 * Application state interface
 */
export interface AppState {
  /** Current app theme */
  theme: Theme;
  /** Current app language */
  language: Language;
  /** App initialization status */
  isInitialized: boolean;
  /** App loading state */
  isLoading: boolean;
  /** Network connectivity status */
  networkStatus: NetworkStatus;
  /** App version */
  version: string;
  /** Build number */
  buildNumber: string;
  /** Is first launch after installation */
  isFirstLaunch: boolean;
  /** Has completed onboarding */
  hasCompletedOnboarding: boolean;
  /** Notification permissions granted */
  notificationPermissions: boolean;
  /** Location permissions granted */
  locationPermissions: boolean;
  /** Camera permissions granted */
  cameraPermissions: boolean;
  /** Push notification token */
  pushToken?: string;
  /** Device info */
  deviceInfo?: {
    platform: string;
    version: string;
    model: string;
    brand: string;
  };
  /** App settings */
  settings: AppSettings;
  /** Current modal state */
  modal: ModalState;
  /** Global error state */
  error: string | null;
}

/**
 * App settings interface
 */
export interface AppSettings {
  /** Enable crash reporting */
  crashReporting: boolean;
  /** Enable analytics */
  analytics: boolean;
  /** Enable performance monitoring */
  performanceMonitoring: boolean;
  /** Auto-update preferences */
  autoUpdate: boolean;
  /** Debug mode enabled */
  debugMode: boolean;
  /** Haptic feedback enabled */
  hapticFeedback: boolean;
  /** Sound effects enabled */
  soundEffects: boolean;
  /** Offline mode enabled */
  offlineMode: boolean;
  /** Data saver mode */
  dataSaver: boolean;
}

/**
 * Modal state interface
 */
export interface ModalState {
  /** Is any modal open */
  isOpen: boolean;
  /** Modal type */
  type: 'alert' | 'confirm' | 'loading' | 'custom' | null;
  /** Modal title */
  title?: string;
  /** Modal message */
  message?: string;
  /** Modal data */
  data?: any;
  /** Confirm callback */
  onConfirm?: () => void;
  /** Cancel callback */
  onCancel?: () => void;
}

/**
 * Initial application state
 */
const initialState: AppState = {
  theme: Theme.LIGHT,
  language: Language.ENGLISH,
  isInitialized: false,
  isLoading: false,
  networkStatus: NetworkStatus.ONLINE,
  version: '1.0.0',
  buildNumber: '1',
  isFirstLaunch: true,
  hasCompletedOnboarding: false,
  notificationPermissions: false,
  locationPermissions: false,
  cameraPermissions: false,
  settings: {
    crashReporting: true,
    analytics: true,
    performanceMonitoring: true,
    autoUpdate: true,
    debugMode: __DEV__,
    hapticFeedback: true,
    soundEffects: true,
    offlineMode: false,
    dataSaver: false,
  },
  modal: {
    isOpen: false,
    type: null,
  },
  error: null,
};

/**
 * Application slice
 */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /**
     * Set app theme
     */
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    
    /**
     * Toggle between light and dark theme
     */
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    },
    
    /**
     * Set app language
     */
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    
    /**
     * Set app initialization status
     */
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    
    /**
     * Set app loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    /**
     * Set network status
     */
    setNetworkStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.networkStatus = action.payload;
    },
    
    /**
     * Set first launch status
     */
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    
    /**
     * Set onboarding completion status
     */
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedOnboarding = action.payload;
    },
    
    /**
     * Set permission status
     */
    setPermission: (
      state,
      action: PayloadAction<{
        type: 'notification' | 'location' | 'camera';
        granted: boolean;
      }>
    ) => {
      switch (action.payload.type) {
        case 'notification':
          state.notificationPermissions = action.payload.granted;
          break;
        case 'location':
          state.locationPermissions = action.payload.granted;
          break;
        case 'camera':
          state.cameraPermissions = action.payload.granted;
          break;
      }
    },
    
    /**
     * Set push notification token
     */
    setPushToken: (state, action: PayloadAction<string>) => {
      state.pushToken = action.payload;
    },
    
    /**
     * Set device information
     */
    setDeviceInfo: (
      state,
      action: PayloadAction<AppState['deviceInfo']>
    ) => {
      state.deviceInfo = action.payload;
    },
    
    /**
     * Update app settings
     */
    updateSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    
    /**
     * Reset app settings to defaults
     */
    resetSettings: (state) => {
      state.settings = initialState.settings;
    },
    
    /**
     * Show modal
     */
    showModal: (state, action: PayloadAction<Omit<ModalState, 'isOpen'>>) => {
      state.modal = { ...action.payload, isOpen: true };
    },
    
    /**
     * Hide modal
     */
    hideModal: (state) => {
      state.modal = { isOpen: false, type: null };
    },
    
    /**
     * Set global error
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    /**
     * Clear global error
     */
    clearError: (state) => {
      state.error = null;
    },
    
    /**
     * Reset app state
     */
    resetApp: (state) => {
      // Preserve some persistent settings
      const preservedState = {
        theme: state.theme,
        language: state.language,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        settings: state.settings,
      };
      
      Object.assign(state, initialState, preservedState);
    },
  },
});

// Export actions
export const {
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
} = appSlice.actions;

// Export reducer
export default appSlice.reducer;