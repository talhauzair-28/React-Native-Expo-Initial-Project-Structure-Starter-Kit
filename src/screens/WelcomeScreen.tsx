/**
 * Welcome Screen
 *
 * Initial welcome screen shown during onboarding or as a placeholder.
 * Demonstrates the use of atomic design components and i18n.
 *
 * @screen
 * @fileoverview Welcome screen component
 * @author Template React Native Team
 * @version 1.0.0
 */

import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { Button, Text, Card } from '@/components/atoms';
import { Colors, LAYOUT, SPACING } from '@/constants/design';
import { t } from '@/utils/i18n';
import { RootStackScreenProps } from '@/navigation/types';

/**
 * Welcome Screen Props
 */
type WelcomeScreenProps = RootStackScreenProps<'Welcome'>;

/**
 * Welcome Screen Component
 * 
 * @param props - Screen props from navigation
 * @returns JSX.Element
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  // ==========================================
  // Event Handlers
  // ==========================================
  
  /**
   * Handle get started button press
   */
  const handleGetStarted = () => {
    // Navigate to next screen or main app
    navigation.navigate('Tutorial');
  };

  /**
   * Handle skip button press
   */
  const handleSkip = () => {
    // Skip onboarding and go to main app
    // This would typically set onboarding as completed in Redux
    console.log('Skip onboarding');
  };

  // ==========================================
  // Render
  // ==========================================
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="h1" align="center" color="text">
            {t('onboarding.welcome.title')}
          </Text>
          
          <Text variant="h5" align="center" color="textSecondary" style={styles.subtitle}>
            {t('onboarding.welcome.subtitle')}
          </Text>
        </View>

        {/* Content Card */}
        <Card variant="elevated" style={styles.card}>
          <Text variant="body" align="center" color="textSecondary">
            {t('onboarding.welcome.description')}
          </Text>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleGetStarted}
            style={styles.primaryButton}
          >
            {t('onboarding.getStarted')}
          </Button>
          
          <Button
            variant="text"
            size="md"
            fullWidth
            onPress={handleSkip}
            style={styles.skipButton}
          >
            {t('onboarding.skip')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: LAYOUT.SCREEN_PADDING,
    paddingTop: SPACING.XL,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.XL,
  },
  subtitle: {
    marginTop: SPACING.MD,
  },
  card: {
    marginVertical: SPACING.XL,
    padding: SPACING.LG,
  },
  actions: {
    paddingBottom: SPACING.LG,
  },
  primaryButton: {
    marginBottom: SPACING.MD,
  },
  skipButton: {
    marginTop: SPACING.SM,
  },
});

export default WelcomeScreen;