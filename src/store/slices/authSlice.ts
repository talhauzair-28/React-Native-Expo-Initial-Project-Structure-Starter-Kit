/**
 * Authentication Slice
 *
 * Redux slice for managing authentication state including user login, logout,
 * registration, and session management using Redux Toolkit.
 *
 * @fileoverview Authentication state management
 * @author Template React Native Team
 * @version 1.0.0
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { Status } from '@/models/enums';
import { User, UserAuth, UserLoginRequest, UserRegistrationRequest } from '@/models/interfaces';

/**
 * Authentication state interface
 */
export interface AuthState {
  /** Current user information */
  user: User | null;
  /** Authentication tokens */
  auth: UserAuth | null;
  /** Authentication status */
  status: Status;
  /** Error message if authentication fails */
  error: string | null;
  /** Is user authenticated */
  isAuthenticated: boolean;
  /** Is authentication being checked on app startup */
  isCheckingAuth: boolean;
  /** Remember me preference */
  rememberMe: boolean;
}

/**
 * Initial authentication state
 */
const initialState: AuthState = {
  user: null,
  auth: null,
  status: Status.IDLE,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  rememberMe: false,
};

/**
 * Async thunk for user login
 */
export const loginUser = createAsyncThunk<
  { user: User; auth: UserAuth },
  UserLoginRequest,
  { rejectValue: string }
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await authService.login(credentials);
      
      // Mock response for template
      const mockResponse = {
        user: {
          id: '1',
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          role: 'user' as const,
          status: 'active' as const,
          preferredLanguage: 'en' as const,
          preferredTheme: 'light' as const,
          preferences: {
            notifications: {
              pushNotifications: true,
              emailNotifications: true,
              smsNotifications: false,
              types: {
                marketing: false,
                security: true,
                social: true,
                system: true,
              },
            },
            privacy: {
              profileVisibility: 'public' as const,
              showOnlineStatus: true,
              allowFriendRequests: true,
              showActivityStatus: true,
              dataCollectionConsent: true,
              marketingConsent: false,
            },
            accessibility: {
              reduceMotion: false,
              highContrast: false,
              largeText: false,
              screenReader: false,
              voiceCommands: false,
            },
            app: {
              autoSave: true,
              defaultView: 'list' as const,
              itemsPerPage: 20,
              autoRefreshInterval: 5,
              showTooltips: true,
              enableAnimations: true,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          isEmailVerified: true,
          isPhoneVerified: false,
          isTwoFactorEnabled: false,
        } as User,
        auth: {
          userId: '1',
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: new Date(Date.now() + 3600000), // 1 hour
          tokenType: 'Bearer',
          scopes: ['read', 'write'],
        } as UserAuth,
      };

      return mockResponse;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

/**
 * Async thunk for user registration
 */
export const registerUser = createAsyncThunk<
  { user: User; auth: UserAuth },
  UserRegistrationRequest,
  { rejectValue: string }
>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await authService.register(userData);
      
      // Mock response for template
      const mockResponse = {
        user: {
          id: '2',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: 'user' as const,
          status: 'active' as const,
          preferredLanguage: userData.preferredLanguage || 'en',
          preferredTheme: 'light' as const,
          preferences: {
            notifications: {
              pushNotifications: true,
              emailNotifications: true,
              smsNotifications: false,
              types: {
                marketing: userData.marketingConsent || false,
                security: true,
                social: true,
                system: true,
              },
            },
            privacy: {
              profileVisibility: 'public' as const,
              showOnlineStatus: true,
              allowFriendRequests: true,
              showActivityStatus: true,
              dataCollectionConsent: true,
              marketingConsent: userData.marketingConsent || false,
            },
            accessibility: {
              reduceMotion: false,
              highContrast: false,
              largeText: false,
              screenReader: false,
              voiceCommands: false,
            },
            app: {
              autoSave: true,
              defaultView: 'list' as const,
              itemsPerPage: 20,
              autoRefreshInterval: 5,
              showTooltips: true,
              enableAnimations: true,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          isEmailVerified: false,
          isPhoneVerified: false,
          isTwoFactorEnabled: false,
        } as User,
        auth: {
          userId: '2',
          accessToken: 'mock-access-token-new',
          refreshToken: 'mock-refresh-token-new',
          expiresAt: new Date(Date.now() + 3600000), // 1 hour
          tokenType: 'Bearer',
          scopes: ['read', 'write'],
        } as UserAuth,
      };

      return mockResponse;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

/**
 * Async thunk for user logout
 */
export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // await authService.logout();
      
      // Mock logout for template
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
    }
  }
);

/**
 * Async thunk for checking authentication status
 */
export const checkAuthStatus = createAsyncThunk<
  { user: User; auth: UserAuth } | null,
  void,
  { rejectValue: string }
>(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual token validation
      // const response = await authService.validateToken();
      
      // Mock response for template
      const storedToken = 'mock-stored-token'; // This would come from secure storage
      
      if (!storedToken) {
        return null;
      }

      // Mock validation response
      return {
        user: {
          id: '1',
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'user' as const,
          status: 'active' as const,
          preferredLanguage: 'en' as const,
          preferredTheme: 'light' as const,
          preferences: {
            notifications: {
              pushNotifications: true,
              emailNotifications: true,
              smsNotifications: false,
              types: {
                marketing: false,
                security: true,
                social: true,
                system: true,
              },
            },
            privacy: {
              profileVisibility: 'public' as const,
              showOnlineStatus: true,
              allowFriendRequests: true,
              showActivityStatus: true,
              dataCollectionConsent: true,
              marketingConsent: false,
            },
            accessibility: {
              reduceMotion: false,
              highContrast: false,
              largeText: false,
              screenReader: false,
              voiceCommands: false,
            },
            app: {
              autoSave: true,
              defaultView: 'list' as const,
              itemsPerPage: 20,
              autoRefreshInterval: 5,
              showTooltips: true,
              enableAnimations: true,
            },
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          isEmailVerified: true,
          isPhoneVerified: false,
          isTwoFactorEnabled: false,
        } as User,
        auth: {
          userId: '1',
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: new Date(Date.now() + 3600000), // 1 hour
          tokenType: 'Bearer',
          scopes: ['read', 'write'],
        } as UserAuth,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Auth check failed');
    }
  }
);

/**
 * Authentication slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Clear authentication error
     */
    clearError: (state) => {
      state.error = null;
    },
    
    /**
     * Set remember me preference
     */
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    
    /**
     * Update user profile
     */
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    /**
     * Reset authentication state
     */
    resetAuth: (state) => {
      state.user = null;
      state.auth = null;
      state.status = Status.IDLE;
      state.error = null;
      state.isAuthenticated = false;
      state.isCheckingAuth = false;
    },
  },
  extraReducers: (builder) => {
    // Login user cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.user;
        state.auth = action.payload.auth;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      });

    // Register user cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.user = action.payload.user;
        state.auth = action.payload.auth;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload || 'Registration failed';
        state.isAuthenticated = false;
      });

    // Logout user cases
    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.auth = null;
        state.status = Status.IDLE;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload || 'Logout failed';
      });

    // Check auth status cases
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.auth = action.payload.auth;
          state.isAuthenticated = true;
          state.status = Status.SUCCESS;
        } else {
          state.user = null;
          state.auth = null;
          state.isAuthenticated = false;
          state.status = Status.IDLE;
        }
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isCheckingAuth = false;
        state.user = null;
        state.auth = null;
        state.isAuthenticated = false;
        state.status = Status.ERROR;
        state.error = action.payload || 'Auth check failed';
      });
  },
});

// Export actions
export const { clearError, setRememberMe, updateUserProfile, resetAuth } = authSlice.actions;

// Export reducer
export default authSlice.reducer;