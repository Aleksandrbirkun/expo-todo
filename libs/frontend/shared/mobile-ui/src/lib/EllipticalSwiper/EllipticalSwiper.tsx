import { useRef } from 'react';
import {
  View,
  Image,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_SIZE = 80;
const SPACING = 30;

export interface SwiperItem {
  id: string;
  image: string;
}

export interface EllipticalSwiperProps {
  items: SwiperItem[];
  onItemChange?: (index: number) => void;
}

export function EllipticalSwiper({
  items,
  onItemChange,
}: EllipticalSwiperProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const handleOnMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / (ITEM_SIZE + SPACING)
    );
    onItemChange?.(newIndex);
  };

  const renderItem = ({ item, index }: { item: SwiperItem; index: number }) => {
    const inputRange = [
      (index - 2) * (ITEM_SIZE + SPACING),
      (index - 1) * (ITEM_SIZE + SPACING),
      index * (ITEM_SIZE + SPACING),
      (index + 1) * (ITEM_SIZE + SPACING),
      (index + 2) * (ITEM_SIZE + SPACING),
    ];

    // Scale animation - center item is 20% bigger
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 0.9, 1.2, 0.9, 0.8],
      extrapolate: 'clamp',
    });

    // Elliptical trajectory - items move up as they approach center
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [30, 15, -10, 15, 30], // Center item goes up more
      extrapolate: 'clamp',
    });

    // Horizontal curve for ellipse effect
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-25, -15, 0, 15, 25], // Creates curve effect
      extrapolate: 'clamp',
    });

    // Opacity - only 3 items visible (center + 1 on each side)
    const opacity = scrollX.interpolate({
      inputRange: [
        (index - 2) * (ITEM_SIZE + SPACING),
        (index - 1.5) * (ITEM_SIZE + SPACING),
        (index - 1) * (ITEM_SIZE + SPACING),
        index * (ITEM_SIZE + SPACING),
        (index + 1) * (ITEM_SIZE + SPACING),
        (index + 1.5) * (ITEM_SIZE + SPACING),
        (index + 2) * (ITEM_SIZE + SPACING),
      ],
      outputRange: [0, 0, 0.7, 1, 0.7, 0, 0], // Fade in/out at edges
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          width: ITEM_SIZE,
          marginHorizontal: SPACING / 2,
          transform: [{ scale }, { translateY }, { translateX }],
          opacity,
        }}
      >
        <View
          style={{
            width: ITEM_SIZE,
            height: ITEM_SIZE,
            borderRadius: ITEM_SIZE / 2,
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              borderRadius: ITEM_SIZE / 2,
            }}
            resizeMode="cover"
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        height: 140,
        width: '100%',
        overflow: 'hidden', // Hide items outside visible area
      }}
    >
      <Animated.FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE + SPACING}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: (SCREEN_WIDTH - ITEM_SIZE) / 2,
          alignItems: 'center',
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleOnMomentumScrollEnd}
        renderItem={renderItem}
      />
    </View>
  );
}
