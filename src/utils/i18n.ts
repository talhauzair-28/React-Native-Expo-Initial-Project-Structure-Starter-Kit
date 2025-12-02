/**
 * Internationalization (i18n) Utility
 *
 * Configures and provides internationalization functionality for the app.
 * Supports multiple languages with RTL (Right-to-Left) text support.
 *
 * @fileoverview i18n configuration and utilities
 * @author Template React Native Team
 * @version 1.0.0
 */

import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';

import { Language } from '@/models/enums';

// Import translation files
import englishTranslations from '@/assets/i18n/supportedLanguages/english/app.json';
import urduTranslations from '@/assets/i18n/supportedLanguages/urdu/app.json';

/**
 * Create i18n instance
 */
const i18n = new I18n();

/**
 * Translation resources
 */
i18n.translations = {
  [Language.ENGLISH]: englishTranslations,
  [Language.URDU]: urduTranslations,
  // Add more languages here
  // [Language.ARABIC]: arabicTranslations,
};

/**
 * Configuration options
 */
i18n.defaultLocale = Language.ENGLISH;
i18n.enableFallback = true;
i18n.missingBehavior = 'guess'; // Show key if translation is missing

/**
 * Detect device locale and set initial language
 */
const deviceLocales = getLocales();
const deviceLanguage = deviceLocales[0]?.languageCode?.toLowerCase();

// Map device language codes to app languages
const languageMap: Record<string, Language> = {
  en: Language.ENGLISH,
  ur: Language.URDU,
  // Add more mappings as needed
  // ar: Language.ARABIC,
};

// Set initial locale based on device or default to English
const detectedLanguage = deviceLanguage ? languageMap[deviceLanguage] : null;
i18n.locale = detectedLanguage || Language.ENGLISH;

/**
 * RTL language configuration
 */
const RTL_LANGUAGES = [Language.URDU, Language.ARABIC];

/**
 * Check if language requires RTL layout
 * @param language - Language to check
 * @returns True if language requires RTL
 */
export const isRTLLanguage = (language: Language): boolean => {
  return RTL_LANGUAGES.includes(language);
};

/**
 * Update app language and RTL settings
 * @param language - New language to set
 */
export const changeLanguage = async (language: Language): Promise<void> => {
  try {
    // Set i18n locale
    i18n.locale = language;
    
    // Update RTL layout
    const shouldBeRTL = isRTLLanguage(language);
    const isCurrentlyRTL = I18nManager.isRTL;
    
    if (shouldBeRTL !== isCurrentlyRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      
      // Note: In a real app, you might want to restart the app
      // to apply RTL changes properly
      console.warn(
        'RTL layout changed. App restart may be required for complete effect.'
      );
    }
  } catch (error) {
    console.error('Failed to change language:', error);
    throw new Error('Failed to change language');
  }
};

/**
 * Get current language
 * @returns Current language
 */
export const getCurrentLanguage = (): Language => {
  return i18n.locale as Language;
};

/**
 * Get supported languages
 * @returns Array of supported languages
 */
export const getSupportedLanguages = (): Language[] => {
  return Object.keys(i18n.translations) as Language[];
};

/**
 * Check if language is supported
 * @param language - Language to check
 * @returns True if language is supported
 */
export const isLanguageSupported = (language: string): boolean => {
  return language in i18n.translations;
};

/**
 * Translation function with type safety
 * @param key - Translation key (dot notation supported)
 * @param options - Translation options including interpolation
 * @returns Translated string
 */
export const t = (
  key: string,
  options?: {
    count?: number;
    defaultValue?: string;
    scope?: string;
    [key: string]: any;
  }
): string => {
  try {
    return i18n.translate(key, options);
  } catch (error) {
    console.warn(`Translation failed for key: ${key}`, error);
    return options?.defaultValue || key;
  }
};

/**
 * Pluralization function
 * @param key - Base translation key
 * @param count - Number for pluralization
 * @param options - Additional options
 * @returns Pluralized translated string
 */
export const tp = (
  key: string,
  count: number,
  options?: Record<string, any>
): string => {
  return t(key, { count, ...options });
};

/**
 * Translation with scope
 * @param scope - Scope for translations
 * @param key - Translation key
 * @param options - Translation options
 * @returns Translated string
 */
export const ts = (
  scope: string,
  key: string,
  options?: Record<string, any>
): string => {
  return t(`${scope}.${key}`, options);
};

/**
 * Get language display name
 * @param language - Language code
 * @returns Display name of the language
 */
export const getLanguageDisplayName = (language: Language): string => {
  const displayNames: Record<Language, string> = {
    [Language.ENGLISH]: 'English',
    [Language.URDU]: 'اردو',
    [Language.ARABIC]: 'العربية',
  };
  
  return displayNames[language] || language;
};

/**
 * Format number based on current locale
 * @param number - Number to format
 * @param options - Formatting options
 * @returns Formatted number string
 */
export const formatNumber = (
  number: number,
  options?: Intl.NumberFormatOptions
): string => {
  try {
    const locale = getCurrentLanguage();
    // Map app languages to locale codes
    const localeMap: Record<Language, string> = {
      [Language.ENGLISH]: 'en-US',
      [Language.URDU]: 'ur-PK',
      [Language.ARABIC]: 'ar-SA',
    };
    
    const localeCode = localeMap[locale] || 'en-US';
    return new Intl.NumberFormat(localeCode, options).format(number);
  } catch (error) {
    console.warn('Number formatting failed:', error);
    return number.toString();
  }
};

/**
 * Format date based on current locale
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    const locale = getCurrentLanguage();
    const localeMap: Record<Language, string> = {
      [Language.ENGLISH]: 'en-US',
      [Language.URDU]: 'ur-PK',
      [Language.ARABIC]: 'ar-SA',
    };
    
    const localeCode = localeMap[locale] || 'en-US';
    return new Intl.DateTimeFormat(localeCode, options).format(date);
  } catch (error) {
    console.warn('Date formatting failed:', error);
    return date.toLocaleDateString();
  }
};

/**
 * Format currency based on current locale
 * @param amount - Amount to format
 * @param currency - Currency code (ISO 4217)
 * @param options - Additional formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  options?: Intl.NumberFormatOptions
): string => {
  try {
    const locale = getCurrentLanguage();
    const localeMap: Record<Language, string> = {
      [Language.ENGLISH]: 'en-US',
      [Language.URDU]: 'ur-PK',
      [Language.ARABIC]: 'ar-SA',
    };
    
    const localeCode = localeMap[locale] || 'en-US';
    return new Intl.NumberFormat(localeCode, {
      style: 'currency',
      currency,
      ...options,
    }).format(amount);
  } catch (error) {
    console.warn('Currency formatting failed:', error);
    return `${currency} ${amount}`;
  }
};

/**
 * Get text direction for current language
 * @returns Text direction ('ltr' or 'rtl')
 */
export const getTextDirection = (): 'ltr' | 'rtl' => {
  return isRTLLanguage(getCurrentLanguage()) ? 'rtl' : 'ltr';
};

/**
 * Get text alignment for current language
 * @returns Text alignment ('left' or 'right')
 */
export const getTextAlignment = (): 'left' | 'right' => {
  return isRTLLanguage(getCurrentLanguage()) ? 'right' : 'left';
};

// Export i18n instance for direct access if needed
export { i18n };

// Export default translation function
export default t;