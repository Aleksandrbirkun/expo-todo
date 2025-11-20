import { View } from 'react-native';
import { Text } from '@frontend/shared/mobile-ui/Text';
import { Button } from '@frontend/shared/mobile-ui/Button';

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
    <View>
      {!isSignUp && (
        <Button onPress={onToggleOtp} className="py-2">
          <Text className="text-blue-600 text-center">
            {isOtpLogin ? t('login.usePassword') : t('login.useOtp')}
          </Text>
        </Button>
      )}

      <Button onPress={onToggleSignUp} className="py-2">
        <Text className="text-blue-600 text-center">
          {isSignUp
            ? t('login.alreadyHaveAccount')
            : t('login.dontHaveAccount')}
        </Text>
      </Button>
    </View>
  );
}
