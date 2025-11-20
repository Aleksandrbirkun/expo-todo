import { useMemo } from 'react';
import { View } from 'react-native';
import { ParsedCountry } from 'react-international-phone';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@frontend/shared/mobile-ui/Select/Select';
import { locales } from '@frontend/feature-intl/shared/config/locales';
import { cn } from '@shared/utils/cn';
import CountryFlag from 'react-native-country-flag';

interface LanguageToggleProps {
  locale?: string;
  onChangeLocale: (locale: string) => void;
  className?: string;
  showFlag?: boolean;
  showName?: boolean;
  size?: 'sm' | 'default';
}

export function LanguageToggle({
  locale,
  onChangeLocale,
  className,
  showName = true,
  showFlag = true,
  size = 'default',
}: LanguageToggleProps) {
  const list = useMemo(() => {
    const variants: {
      [key: string]: {
        key: string;
        displayName: string;
        iso2: ParsedCountry['iso2'];
      };
    } = {
      en: { key: 'en', iso2: 'us', displayName: 'English' },
      de: { key: 'de', iso2: 'de', displayName: 'German' },
    };

    return locales?.map((l) => variants?.[l]);
  }, []);

  const currentOption = list?.find((item) => item?.key === locale);
  const defaultValue = currentOption
    ? { value: currentOption.key, label: currentOption.displayName }
    : undefined;

  const handleValueChange = (
    option: { value: string; label: string } | undefined
  ) => {
    if (option?.value) {
      onChangeLocale(option.value);
    }
  };

  return (
    <View className={cn('flex-row items-center gap-2.5', className)}>
      <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
        <SelectTrigger className={'flex flex-row gap-2'} size={size}>
          <CountryFlag
            isoCode={list.find((item) => item.key === locale)?.iso2 || 'us'}
            size={12}
          />
          <SelectValue placeholder={'Language'} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {list?.map(({ key, displayName, iso2 }) => (
            <SelectItem
              label={displayName}
              key={key}
              value={key}
              icon={<CountryFlag isoCode={iso2} size={12} />}
              className="mb-1 flex-row items-center gap-2 p-2 last:mb-0"
            />
          ))}
        </SelectContent>
      </Select>
    </View>
  );
}
