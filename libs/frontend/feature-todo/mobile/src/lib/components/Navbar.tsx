import { useState } from 'react';
import { View, TouchableOpacity, Modal, Alert } from 'react-native';
import { Text } from '@frontend/shared/mobile-ui/Text';
import { Button } from '@frontend/shared/mobile-ui/Button';
import { useRouter } from 'expo-router';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import { useTranslation } from 'react-i18next';
import { LanguageToggleSection } from '@frontend/feature-intl/mobile/sections/LanguageToggleSection';

interface NavbarProps {
  user: any;
}

export function Navbar({ user }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    setShowMenu(false);

    Alert.alert(
      t('dashboard.navbar.signOut'),
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: t('dashboard.navbar.signOut'),
          style: 'destructive',
          onPress: async () => {
            await mobileClient.auth.signOut();
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <>
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          {/* Logo/Brand */}
          <View>
            <Text className="text-xl font-semibold text-gray-900">
              {t('dashboard.navbar.title')}
            </Text>
          </View>

          {/* Hamburger Menu */}
          <TouchableOpacity
            onPress={() => setShowMenu(true)}
            className="p-2"
            accessibilityLabel="Menu"
          >
            <View className="flex flex-col gap-1">
              <View className="w-5 h-0.5 bg-gray-600" />
              <View className="w-5 h-0.5 bg-gray-600" />
              <View className="w-5 h-0.5 bg-gray-600" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          onPress={() => setShowMenu(false)}
        >
          <View className="flex-1 mt-16 justify-start items-end p-4">
            <TouchableOpacity
              onPress={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-lg min-w-48 p-2"
            >
              <View className="p-3 border-b border-gray-100">
                <LanguageToggleSection />
              </View>

              <TouchableOpacity
                onPress={handleSignOut}
                className="p-3 border-b border-gray-100"
              >
                <Text className="text-red-600 font-medium">
                  {t('dashboard.navbar.signOut')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowMenu(false)}
                className="p-3"
              >
                <Text className="text-gray-600">Cancel</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
