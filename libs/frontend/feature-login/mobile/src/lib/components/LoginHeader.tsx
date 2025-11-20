import { View } from 'react-native';
import { Text } from '@frontend/shared/mobile-ui/Text';

interface LoginHeaderProps {
  isSignUp: boolean;
  isOtpLogin: boolean;
  t: (key: string) => string;
}

export function LoginHeader({ isSignUp, isOtpLogin, t }: LoginHeaderProps) {
  return (
    <View className="mb-6">
      <Text className="text-2xl font-bold text-center text-gray-900">
        {isSignUp ? t('login.signUp') : (isOtpLogin ? t('login.otpSignIn') : t('login.signIn'))}
      </Text>
      <Text className="text-gray-500 text-center mt-2">
        {isOtpLogin && !isSignUp ? t('login.enterEmail') : t('login.appName')}
      </Text>
    </View>
  );
}