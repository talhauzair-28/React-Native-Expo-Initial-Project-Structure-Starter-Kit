/**
 * API Service
 *
 * Central API service for handling HTTP requests with error handling,
 * authentication, and request/response interceptors.
 *
 * @fileoverview API service configuration and utilities
 * @author Template React Native Team
 * @version 1.0.0
 */

import { API_ENDPOINTS, HTTP_STATUS } from '@/constants';
import { APIResponse } from '@/models/interfaces';
import { retryWithBackoff } from '@/utils';

/**
 * API configuration interface
 */
interface APIConfig {
  baseURL: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
}

/**
 * Request options interface
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

/**
 * API Service class
 */
class APIService {
  private config: APIConfig;
  private authToken?: string;

  constructor(config: APIConfig) {
    this.config = config;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Clear authentication token
   */
  clearAuthToken(): void {
    this.authToken = undefined;
  }

  /**
   * Get default headers
   */
  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Build full URL
   */
  private buildURL(endpoint: string): string {
    return `${this.config.baseURL}${endpoint}`;
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<APIResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      throw new Error('Failed to parse response');
    }

    if (!response.ok) {
      throw new APIError(
        data.message || `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    return {
      success: true,
      data,
      message: data.message,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: response.headers.get('x-request-id') || '',
        version: response.headers.get('api-version') || '1.0.0',
      },
    };
  }

  /**
   * Make HTTP request
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<APIResponse<T>> {
    const {
      method = 'GET',
      headers: customHeaders = {},
      body,
      timeout = this.config.timeout,
      retries = this.config.maxRetries,
    } = options;

    const url = this.buildURL(endpoint);
    const headers = {
      ...this.getDefaultHeaders(),
      ...customHeaders,
    };

    const requestConfig: RequestInit = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    };

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeout);
    });

    const requestFunction = async (): Promise<APIResponse<T>> => {
      try {
        const response = await Promise.race([
          fetch(url, requestConfig),
          timeoutPromise,
        ]);
        return this.handleResponse<T>(response);
      } catch (error) {
        if (error instanceof APIError) {
          throw error;
        }
        throw new Error(
          error instanceof Error ? error.message : 'Network error'
        );
      }
    };

    // Retry with exponential backoff
    return retryWithBackoff(requestFunction, retries, this.config.retryDelay);
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method'>): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method'>): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method'>): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<APIResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Upload file
   */
  async upload<T>(endpoint: string, file: FormData, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<APIResponse<T>> {
    const url = this.buildURL(endpoint);
    const headers = {
      ...this.getDefaultHeaders(),
      ...options?.headers,
    };

    // Remove Content-Type to let browser set it with boundary for FormData
    delete headers['Content-Type'];

    const requestConfig: RequestInit = {
      method: 'POST',
      headers,
      body: file,
    };

    try {
      const response = await fetch(url, requestConfig);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Upload failed'
      );
    }
  }
}

/**
 * Custom API Error class
 */
export class APIError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }

  /**
   * Check if error is due to authentication
   */
  isAuthError(): boolean {
    return this.status === HTTP_STATUS.UNAUTHORIZED;
  }

  /**
   * Check if error is a validation error
   */
  isValidationError(): boolean {
    return this.status === HTTP_STATUS.UNPROCESSABLE_ENTITY;
  }

  /**
   * Check if error is a server error
   */
  isServerError(): boolean {
    return this.status >= 500;
  }

  /**
   * Check if error is a network error
   */
  isNetworkError(): boolean {
    return this.status === 0 || this.message.includes('Network');
  }
}

/**
 * Create API service instance
 */
const apiConfig: APIConfig = {
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  maxRetries: 3,
  retryDelay: 1000,
};

export const apiService = new APIService(apiConfig);

/**
 * API utility functions
 */
export const apiUtils = {
  /**
   * Check if response indicates success
   */
  isSuccessResponse: <T>(response: APIResponse<T>): boolean => {
    return response.success;
  },

  /**
   * Extract error message from API error
   */
  getErrorMessage: (error: unknown): string => {
    if (error instanceof APIError) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },

  /**
   * Check if error requires authentication
   */
  requiresAuth: (error: unknown): boolean => {
    return error instanceof APIError && error.isAuthError();
  },
};

export default apiService;