import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import '@frontend/feature-themeing/shared/global.css';

export default function RootIndex() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await mobileClient.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(authenticated)/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
