import React from 'react';
import { TextClassContext } from '../Text/Text';
import { type VariantProps } from 'class-variance-authority';
import { Pressable } from 'react-native';
import { cn } from '@shared/utils/cn';
import { buttonVariants, buttonTextVariants } from './config';
import { Loader } from '../Loader/Loader';

// Create context for variant propagation
const ButtonContext = React.createContext<{
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
}>({ variant: 'default', size: 'default' });

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  loading,
  ...props
}: ButtonProps) {
  return (
    <ButtonContext.Provider value={{ variant, size }}>
      <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
        <Pressable
          className={cn(
            props.disabled && 'opacity-50',
            buttonVariants({ variant, size }),
            className
          )}
          role="button"
          {...props}
        >
          {loading ? <Loader className={'size-10'} /> : children}
        </Pressable>
      </TextClassContext.Provider>
    </ButtonContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
