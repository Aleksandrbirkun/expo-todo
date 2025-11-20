import { AuthWrapper } from '../components/AuthWrapper';
import { useTranslation } from 'react-i18next';

export default function SignUpPage() {
  const { t } = useTranslation();

  return (
    <AuthWrapper
      defaultMode="signup"
      redirectTo="/(authenticated)/(tabs)"
      title={t('signup.welcome.title', 'Create Account')}
      subtitle={t('signup.welcome.subtitle', 'Sign up to get started')}
      t={t}
      onAuthSuccess={(user) => {
        console.log('User registered:', user);
      }}
      onAuthError={(error) => {
        console.error('Registration error:', error);
      }}
    />
  );
}