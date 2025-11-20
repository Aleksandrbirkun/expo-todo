import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import { Text } from '@frontend/shared/mobile-ui/Text';
import { Button } from '@frontend/shared/mobile-ui/Button';
import { Avatar } from '@frontend/shared/mobile-ui/Avatar';
import { Loader } from '@frontend/shared/mobile-ui/Loader';
import { LucideIcon } from '@frontend/shared/mobile-ui/LucideIcon';
import { LogOut, Mail, Bell, Shield, HelpCircle, FileText, ChevronRight, Languages } from 'lucide-react-native';
import { LanguageToggleSection } from '@frontend/feature-intl/mobile/sections/LanguageToggleSection';

interface UserProfile {
  email: string;
  id: string;
}

export function ProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const {
        data: { user },
      } = await mobileClient.auth.getUser();
      if (user) {
        setUser({
          email: user.email || '',
          id: user.id,
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      t('profile.signOut', { defaultValue: 'Sign Out' }),
      t('profile.signOutConfirm', {
        defaultValue: 'Are you sure you want to sign out?',
      }),
      [
        {
          text: t('common.cancel', { defaultValue: 'Cancel' }),
          style: 'cancel',
        },
        {
          text: t('common.confirm', { defaultValue: 'Confirm' }),
          style: 'destructive',
          onPress: async () => {
            try {
              await mobileClient.auth.signOut();
              router.replace('/login');
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert(
                t('common.error', { defaultValue: 'Error' }),
                t('profile.signOutError', {
                  defaultValue: 'Failed to sign out. Please try again.',
                })
              );
            }
          },
        },
      ]
    );
  };

  const ProfileSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const ProfileItem = ({
    icon,
    label,
    value,
    onPress,
  }: {
    icon: React.ComponentType<any>;
    label: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.profileItemLeft}>
        <LucideIcon icon={icon} size={20} style={styles.profileItemIcon} />
        <Text style={styles.profileItemLabel}>{label}</Text>
      </View>
      <View style={styles.profileItemRight}>
        {value && (
          <Text style={styles.profileItemValue}>{value}</Text>
        )}
        {onPress && (
          <LucideIcon icon={ChevronRight} size={20} style={styles.profileItemIcon} />
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerLoadingContainer}>
          <View style={styles.loaderWrapper}>
            <Loader size={40} />
          </View>
          <Text style={styles.loadingText}>
            {t('common.loading', { defaultValue: 'Loading...' })}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {t('profile.title', { defaultValue: 'Profile' })}
          </Text>
        </View>

        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Avatar
              source={{ uri: undefined }}
              fallback={user?.email?.charAt(0).toUpperCase() || 'U'}
              size="xl"
              alt="User Avatar"
            />
          </View>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* Account Section */}
        <ProfileSection
          title={t('profile.account', { defaultValue: 'Account' })}
        >
          <ProfileItem
            icon={Mail}
            label={t('profile.email', { defaultValue: 'Email' })}
            value={user?.email}
          />
        </ProfileSection>

        {/* Settings Section */}
        <ProfileSection
          title={t('profile.settings', { defaultValue: 'Settings' })}
        >
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <LucideIcon icon={Languages} size={20} style={styles.profileItemIcon} />
              <Text style={styles.settingItemLabel}>
                {t('profile.language', { defaultValue: 'Language' })}
              </Text>
            </View>
            <View style={styles.settingItemRight}>
              <LanguageToggleSection />
            </View>
          </View>
          <ProfileItem
            icon={Bell}
            label={t('profile.notifications', {
              defaultValue: 'Notifications',
            })}
            onPress={() => {}}
          />
          <ProfileItem
            icon={Shield}
            label={t('profile.privacy', { defaultValue: 'Privacy' })}
            onPress={() => {}}
          />
        </ProfileSection>

        {/* About Section */}
        <ProfileSection title={t('profile.about', { defaultValue: 'About' })}>
          <ProfileItem
            icon={HelpCircle}
            label={t('profile.help', { defaultValue: 'Help & Support' })}
            onPress={() => {}}
          />
          <ProfileItem
            icon={FileText}
            label={t('profile.terms', { defaultValue: 'Terms of Service' })}
            onPress={() => {}}
          />
        </ProfileSection>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <Button
            variant="destructive"
            onPress={handleSignOut}
          >
            <View style={styles.signOutButtonContent}>
              <LucideIcon icon={LogOut} size={20} style={styles.signOutIcon} />
              <Text style={styles.signOutText}>
                {t('profile.signOut', { defaultValue: 'Sign Out' })}
              </Text>
            </View>
          </Button>
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#333',
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  sectionContent: {
    backgroundColor: 'white',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileItemIcon: {
    color: '#666',
  },
  profileItemLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  profileItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  settingItemRight: {
    alignItems: 'flex-end',
  },
  signOutContainer: {
    marginTop: 8,
    marginHorizontal: 20,
  },
  signOutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutIcon: {
    color: 'white',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#666',
  },
});