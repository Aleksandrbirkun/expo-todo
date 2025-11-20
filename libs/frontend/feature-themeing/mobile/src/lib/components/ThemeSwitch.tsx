import { View, TouchableOpacity, Text } from 'react-native';
import { Palette, Sparkles } from 'lucide-react-native';
import { LucideIcon } from '@frontend/shared/mobile-ui/LucideIcon';
import { useTheme } from '../hooks/useTheme';

export interface ThemeSwitchProps {
  className?: string;
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { toggleTheme, isClassic } = useTheme();

  return (
    <TouchableOpacity
      className={`flex-row items-center py-2 px-3 rounded-lg ${
        className || ''
      }`}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <View className="mr-2">
        <LucideIcon
          icon={isClassic ? Sparkles : Palette}
          className="w-5 h-5 text-primary"
        />
      </View>
      <Text className="text-base font-medium text-foreground">
        {isClassic ? 'Classic Theme' : 'Default Theme'}
      </Text>
    </TouchableOpacity>
  );
}
