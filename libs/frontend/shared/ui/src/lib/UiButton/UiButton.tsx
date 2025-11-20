import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@shared/utils/cn';
import { buttonVariants } from './config';
import { Loader2 } from 'lucide-react';

export interface UiButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function UiButton({
  className,
  variant,
  size,
  loading,
  asChild = false,
  ...props
}: UiButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <>
        {loading && <Loader2 className={'absolute w-[40%] animate-spin'} />}
        {props.children}
      </>
    </Comp>
  );
}

export { UiButton, buttonVariants };
