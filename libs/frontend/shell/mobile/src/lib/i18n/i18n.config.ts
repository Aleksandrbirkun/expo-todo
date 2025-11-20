import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files from shared library
import en from '@frontend/feature-intl/shared/locales/en.json';
import de from '@frontend/feature-intl/shared/locales/de.json';

const LANGUAGE_STORAGE_KEY = 'user-locale';

// Get device language
const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'en';

// Initialize i18next
const initI18n = async () => {
  // Try to get saved language from AsyncStorage
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

  // If no saved language, use device language or fallback to 'en'
  const language = savedLanguage || deviceLanguage || 'en';

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

  // Listen for language changes and save to AsyncStorage
  i18n.on('languageChanged', async (lng) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  });
};

export { i18n, initI18n };
export default i18n;