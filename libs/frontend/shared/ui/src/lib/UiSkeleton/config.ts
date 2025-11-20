import { cva } from 'class-variance-authority';

export const skeletonStyles = cva('w-fit animate-pulse rounded-md', {
  variants: {
    variant: {
      default: 'min-h-4 bg-gray-900/20 text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
