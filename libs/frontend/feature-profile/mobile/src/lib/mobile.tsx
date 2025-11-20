import React from 'react';
import { View } from 'react-native';
import { Text } from '@frontend/shared/mobile-ui/Text';

/* eslint-disable-next-line */
export interface MobileProps {}

export function Mobile(props: MobileProps) {
  return (
    <View>
      <Text>Welcome to mobile!</Text>
    </View>
  );
}

export default Mobile;
