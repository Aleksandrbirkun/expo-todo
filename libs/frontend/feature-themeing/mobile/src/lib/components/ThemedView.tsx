import { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../hooks';

interface ThemedViewProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export function ThemedView({
  children,
  className = '',
  style,
  ...props
}: ThemedViewProps) {
  const { themeMode } = useTheme();

  return (
    <View className={`${themeMode} flex-1`} style={style} {...props}>
      {children}
    </View>
  );
}
