// Configuration constants for EllipticalSwiper
export const SWIPER_CONFIG = {
  ITEM_SIZE: 40,
  ELLIPSE_RATIO: 0.8, // Width ratio of screen
  ELLIPSE_HEIGHT: 60,
  SCALE_FACTOR: 1.1, // Center item scaling
  SWIPE_THRESHOLD_RATIO: 0.25, // Fraction of screen width
  VELOCITY_THRESHOLD: 500,
  SPRING_CONFIG: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
} as const;