import { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from 'expo-router';
import { SignInForm } from '../forms/SignInForm';
import { SignUpForm } from '../forms/SignUpForm';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import { Text } from '@frontend/shared/mobile-ui/Text';
import { Loader } from '@frontend/shared/mobile-ui/Loader';
import { LanguageToggleSection } from '@frontend/feature-intl/mobile/sections/LanguageToggleSection';
import { useToast } from '@frontend/shared/mobile-ui/Toast';

export type AuthMode = 'signin' | 'signup';

interface AuthWrapperProps {
  defaultMode?: AuthMode;
  redirectTo?: string;
  onAuthSuccess?: (user: any) => void;
  onAuthError?: (error: any) => void;
  title?: string;
  subtitle?: string;
  t?: (key: string) => string;
}

export function AuthWrapper({
  defaultMode = 'signin',
  redirectTo = '/(authenticated)/(tabs)',
  onAuthSuccess,
  onAuthError,
  title,
  subtitle,
  t,
}: AuthWrapperProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [currentMode, setCurrentMode] = useState<AuthMode>(defaultMode);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await mobileClient.auth.getSession();
    if (session) {
      handleSuccessfulAuth(session.user);
    }
  };

  const handleSuccessfulAuth = async (user: any) => {
    onAuthSuccess?.(user);

    // Show success message briefly before redirecting
    setIsRedirecting(true);

    showToast({
      title: 'Success',
      description: 'Authentication successful!',
    });

    // Delay redirect to show success message
    setTimeout(() => {
      router.replace(redirectTo as any);
    }, 1000);
  };

  const handleAuthError = (error: any) => {
    onAuthError?.(error);

    // Handle specific error actions
    if (error.message?.includes('verify')) {
      showToast({
        title: 'Verify Your Email',
        description:
          'Please check your email to verify your account before signing in.',
      });
    }
  };

  // If redirecting, show loading state
  if (isRedirecting) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.redirectingContainer}>
          <View style={styles.redirectingContent}>
            <Loader size={48} />
            <Text style={styles.redirectingTitle}>
              Authentication successful!
            </Text>
            <Text style={styles.redirectingSubtitle}>
              Redirecting you to your dashboard...
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainContainer}>
          <View style={styles.contentWrapper}>
            {/* Header */}
            {(title || subtitle) && (
              <View style={styles.headerContainer}>
                {title && (
                  <Text style={styles.headerTitle}>
                    {title}
                  </Text>
                )}
                {subtitle && (
                  <Text style={styles.headerSubtitle}>
                    {subtitle}
                  </Text>
                )}
              </View>
            )}

            {/* Auth Forms - Render only the active form */}
            <View style={styles.formContainer}>
              {currentMode === 'signin' && (
                <SignInForm
                  t={t}
                  onSuccess={handleSuccessfulAuth}
                  onError={handleAuthError}
                  onSignUpClick={() => setCurrentMode('signup')}
                />
              )}

              {currentMode === 'signup' && (
                <SignUpForm
                  t={t}
                  onSuccess={handleSuccessfulAuth}
                  onError={handleAuthError}
                  onSignInClick={() => setCurrentMode('signin')}
                />
              )}
            </View>
          </View>
          <View style={styles.languageContainer}>
            <LanguageToggleSection />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  redirectingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  redirectingContent: {
    alignItems: 'center',
  },
  redirectingTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
    marginTop: 16,
  },
  redirectingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  headerContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  headerSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  languageContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
    alignItems: 'center',
  },
});