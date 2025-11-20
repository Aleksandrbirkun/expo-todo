'use client';

import {
  UiCardHeader,
  UiCardTitle,
  UiCardDescription,
} from '@frontend/shared/ui/UiCard';

interface LoginHeaderProps {
  isSignUp: boolean;
  isOtpLogin: boolean;
  t: (key: string) => string;
}

export function LoginHeader({ isSignUp, isOtpLogin, t }: LoginHeaderProps) {
  return (
    <UiCardHeader>
      <UiCardTitle className="text-center">
        {isSignUp ? t('signUp') : (isOtpLogin ? t('otpSignIn') : t('signIn'))}
      </UiCardTitle>
      <UiCardDescription className="text-center">
        {isOtpLogin && !isSignUp ? t('enterEmail') : t('appName')}
      </UiCardDescription>
    </UiCardHeader>
  );
}