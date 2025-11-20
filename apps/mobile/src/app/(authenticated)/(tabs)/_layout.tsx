import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { ActionTabButton } from '@frontend/shell/mobile/components/ActionTabButton';

export default function TabLayout() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleActionPress = useCallback(() => {
    // Navigate to add todo page or show modal
    router.push('/(authenticated)/add-todo');
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home', { defaultValue: 'Home' }),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="action-tab"
        options={{
          tabBarButton: () => <ActionTabButton onPress={handleActionPress} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile', { defaultValue: 'Profile' }),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
