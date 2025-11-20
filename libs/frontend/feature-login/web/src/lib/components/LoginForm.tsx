'use client';

import { useState } from 'react';
import { UiTextInput } from '@frontend/shared/ui/UiTextInput';
import { UiButton } from '@frontend/shared/ui/UiButton';
import {
  UiInputOTP,
  UiInputOTPGroup,
  UiInputOTPSlot,
} from '@frontend/shared/ui/UiInputOtp';

interface LoginFormProps {
  isSignUp: boolean;
  isOtpLogin: boolean;
  otpSent: boolean;
  error: string | null;
  isLoading: boolean;
  onSubmit: (email: string, password: string, otpCode: string) => void;
  onResendOtp: () => void;
  t: (key: string) => string;
}

export function LoginForm({
  isSignUp,
  isOtpLogin,
  otpSent,
  error,
  isLoading,
  onSubmit,
  onResendOtp,
  t,
}: LoginFormProps) {
  // Only UI state - no business logic
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, otpCode);
  };

  const handleResendOtp = () => {
    setOtpCode('');
    onResendOtp();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <UiTextInput
          label={t('email')}
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('email')}
          disabled={isLoading}
        />

        {!isOtpLogin && (
          <UiTextInput
            label={t('password')}
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('password')}
            disabled={isLoading}
          />
        )}

        {isOtpLogin && otpSent && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t('otpCode')}
            </label>
            <UiInputOTP
              containerClassName={'mx-auto w-full flex justify-center'}
              maxLength={6}
              value={otpCode}
              onChange={setOtpCode}
              disabled={isLoading}
            >
              <UiInputOTPGroup>
                <UiInputOTPSlot index={0} />
                <UiInputOTPSlot index={1} />
                <UiInputOTPSlot index={2} />
                <UiInputOTPSlot index={3} />
                <UiInputOTPSlot index={4} />
                <UiInputOTPSlot index={5} />
              </UiInputOTPGroup>
            </UiInputOTP>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md text-center">
          {error}
        </div>
      )}

      {otpSent && !isSignUp && (
        <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md text-center">
          {t('otpSent')}
        </div>
      )}

      <UiButton
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        size="lg"
        className="w-full"
      >
        {isSignUp
          ? t('signUpButton')
          : isOtpLogin
          ? otpSent
            ? t('verifyOtp')
            : t('sendOtp')
          : t('signInButton')}
      </UiButton>

      {isOtpLogin && otpSent && (
        <UiButton
          type="button"
          onClick={handleResendOtp}
          variant="ghost"
          size="sm"
          className="w-full mt-2"
          disabled={isLoading}
        >
          {t('resendOtp')}
        </UiButton>
      )}
    </form>
  );
}
