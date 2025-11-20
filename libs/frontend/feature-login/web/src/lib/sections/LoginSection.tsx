'use client';

import { useState } from 'react';
import { createBrowserClient } from '@backend/feature-supabase/lib/clients/browserClient';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { UiCard, UiCardContent } from '@frontend/shared/ui/UiCard';
import { LanguageToggleSection } from '@frontend/feature-intl/web/sections/LanguageToggleSection';
import { LoginHeader } from '../components/LoginHeader';
import { LoginForm } from '../components/LoginForm';
import { LoginControls } from '../components/LoginControls';

export function LoginSection() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const t = useTranslations('login');

  // Business logic handlers
  const handleLogin = async (
    email: string,
    password: string,
    otpCode: string
  ) => {
    setIsLoading(true);
    setError(null);

    const supabase = createBrowserClient();

    try {
      if (isOtpLogin && !isSignUp) {
        if (!otpSent) {
          // Send OTP using the email OTP method
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              shouldCreateUser: false,
            },
          });

          if (error) throw error;

          setOtpSent(true);
          setError(null);
          return;
        } else {
          // Verify the OTP code
          const { error } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: 'email',
          });

          if (error) throw error;

          router.push('/dashboard');
          return;
        }
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        setError(t('checkEmail'));
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push('/dashboard');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleOtp = () => {
    setIsOtpLogin(!isOtpLogin);
    setOtpSent(false);
    setError(null);
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setOtpSent(false);
    setError(null);
    if (isSignUp) setIsOtpLogin(false);
  };

  const handleResendOtp = () => {
    setOtpSent(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <UiCard>
          <LoginHeader isSignUp={isSignUp} isOtpLogin={isOtpLogin} t={t} />

          <UiCardContent>
            <LoginForm
              isSignUp={isSignUp}
              isOtpLogin={isOtpLogin}
              otpSent={otpSent}
              error={error}
              isLoading={isLoading}
              onSubmit={handleLogin}
              onResendOtp={handleResendOtp}
              t={t}
            />

            <LoginControls
              isSignUp={isSignUp}
              isOtpLogin={isOtpLogin}
              onToggleOtp={handleToggleOtp}
              onToggleSignUp={handleToggleSignUp}
              t={t}
            />

            {/* Language Toggle */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
              <LanguageToggleSection />
            </div>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  );
}
