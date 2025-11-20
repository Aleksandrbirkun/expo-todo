import { cva, VariantProps } from 'class-variance-authority';
import { useMemo } from 'react';
import { FlagImage, ParsedCountry } from 'react-international-phone';

import {
  UiSelect,
  UiSelectContent,
  UiSelectItem,
  UiSelectTrigger,
  UiSelectValue,
} from '@frontend/shared/ui/UiSelect';
import { locales } from '@frontend/feature-intl/shared/config/locales';
import { cn } from '@shared/utils/cn';
import { UiText } from '@frontend/shared/ui/UiText';

const toggleStyles = cva('', {
  variants: {
    variant: {
      transparent: 'bg-transparent hover:bg-primary/10',
      primary:
        'bg-primary-700 [&>svg]:text-white border-gray-600 hover:bg-primary-700/70 rounded-xl',
      home: 'bg-transparent hover:opacity-80 rounded-xl [&>svg]:text-white',
    },
    size: {
      small: 'p-1 text-sm',
      default: 'p-2 sm:py-2.5 text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

interface LanguageToggleProps extends VariantProps<typeof toggleStyles> {
  locale?: string;
  onChangeLocale: (locale: string) => void;
  className?: string;
  showFlag?: boolean;
  showName?: boolean;
}

export function LanguageToggle({
  locale,
  onChangeLocale,
  className,
  showName = true,
  variant,
  size,
  showFlag = true,
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

  return (
    <div className={cn('text-secondary flex items-center gap-2.5', className)}>
      <UiSelect defaultValue={locale || ''} onValueChange={onChangeLocale}>
        <UiSelectTrigger className={toggleStyles({ variant, size })}>
          <UiSelectValue />
        </UiSelectTrigger>
        <UiSelectContent className={'w-[var(--radix-select-trigger-width)]'}>
          {list?.map(({ key, displayName, iso2 }) => (
            <UiSelectItem
              key={key}
              value={key}
              className={
                'text-secondary mb-1 flex items-center justify-center gap-2 !p-2 last:mb-0'
              }
            >
              <div className={'flex items-center gap-2'}>
                {showFlag && <FlagImage className={'size-6'} iso2={iso2} />}
                {showName && (
                  <UiText variant={'body4-medium'} color={'primary'}>
                    {displayName}
                  </UiText>
                )}
              </div>
            </UiSelectItem>
          ))}
        </UiSelectContent>
      </UiSelect>
    </div>
  );
}
