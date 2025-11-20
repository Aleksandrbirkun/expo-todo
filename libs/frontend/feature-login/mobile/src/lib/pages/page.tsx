import { AuthWrapper } from '../components/AuthWrapper';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();

  return (
    <AuthWrapper
      defaultMode="signin"
      redirectTo="/(authenticated)/(tabs)"
      title={t('login.welcome.title', 'Welcome Back')}
      subtitle={t('login.welcome.subtitle', 'Sign in to access your account')}
      t={t}
      onAuthSuccess={(user) => {
        console.log('User authenticated:', user);
      }}
      onAuthError={(error) => {
        console.error('Authentication error:', error);
      }}
    />
  );
}