import { useTranslation } from 'react-i18next';

import 'react-international-phone/style.css';

import { LanguageToggle } from '@frontend/feature-intl/mobile/components/LanguageToggle';

export const LanguageToggleSection = () => {
  const { i18n } = useTranslation();

  const onChangeLocale = async (newLocale: string) => {
    try {
      // Change language using i18next
      await i18n.changeLanguage(newLocale);
    } catch (error) {
      console.warn('Failed to change language:', error);
    }
  };

  return (
    <LanguageToggle
      onChangeLocale={onChangeLocale}
      locale={i18n.language}
      size="sm"
      showFlag={true}
      showName={true}
    />
  );
};
