'use client';

import { usePathname, useRouter } from 'next/navigation';

import 'react-international-phone/style.css';

import { LanguageToggle } from '@frontend/feature-intl/web/components/LanguageToggle';
import { useLocale } from 'next-intl';

export const LanguageToggleSection = () => {
  const router = useRouter();
  const path = usePathname();
  const locale = useLocale();

  const onChangeLocale = (locale: string) => {
    router.replace(`/${locale}/${path}`);
  };
  return (
    <LanguageToggle
      onChangeLocale={onChangeLocale}
      locale={locale}
      variant={'home'}
      size={'small'}
    />
  );
};
