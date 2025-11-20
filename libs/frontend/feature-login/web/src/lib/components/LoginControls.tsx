'use client';

import { UiButton } from '@frontend/shared/ui/UiButton';

interface LoginControlsProps {
  isSignUp: boolean;
  isOtpLogin: boolean;
  onToggleOtp: () => void;
  onToggleSignUp: () => void;
  t: (key: string) => string;
}

export function LoginControls({
  isSignUp,
  isOtpLogin,
  onToggleOtp,
  onToggleSignUp,
  t,
}: LoginControlsProps) {
  return (
    <div className="text-center space-y-2">
      {!isSignUp && (
        <UiButton
          type="button"
          onClick={onToggleOtp}
          variant="ghost"
          size="sm"
          className="w-full"
        >
          {isOtpLogin ? t('usePassword') : t('useOtp')}
        </UiButton>
      )}
      
      <UiButton
        type="button"
        onClick={onToggleSignUp}
        variant="ghost"
        size="sm"
        className="w-full"
      >
        {isSignUp
          ? t('alreadyHaveAccount')
          : t('dontHaveAccount')}
      </UiButton>
    </div>
  );
}