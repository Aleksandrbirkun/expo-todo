import { useEffect, useState } from 'react';
import { useColorScheme, View, ActivityIndicator } from 'react-native';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';

export default function AuthenticatedLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await mobileClient.auth.getSession();

      if (session) {
        setIsAuthenticated(true);
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.replace('/login');
    } finally {
      setIsLoading(false);
      SplashScreen.hideAsync();
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}