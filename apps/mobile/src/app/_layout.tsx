import { Stack } from 'expo-router';
import { PortalHost } from 'libs/frontend/shared/mobile-ui/src/lib/@Primitives/components/Portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { i18n, initI18n } from '@frontend/shell/mobile/i18n/index';
import { ToastProvider } from '@frontend/shared/mobile-ui/Toast';
import { ThemeProvider } from '@frontend/feature-themeing/mobile/providers/ThemeProvider';
import '@frontend/feature-themeing/shared/global.css';
import { AppState } from 'react-native';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import { useEffect, useState } from 'react';
import { ThemedView } from '@frontend/feature-themeing/mobile/components/ThemedView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    mobileClient.auth.startAutoRefresh();
  } else {
    mobileClient.auth.stopAutoRefresh();
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  const [i18nInitialized, setI18nInitialized] = useState(false);
  useEffect(() => {
    initI18n().then(() => {
      setI18nInitialized(true);
    });
  }, []);

  if (!i18nInitialized) {
    return null; // Or a loading screen
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemedView>
          <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <ToastProvider>
                  <Stack screenOptions={{ headerShown: false }} />
                  <PortalHost />
                </ToastProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </I18nextProvider>
        </ThemedView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
