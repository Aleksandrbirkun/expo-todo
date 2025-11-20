import { cva } from 'class-variance-authority';

export const tableContainerVariants = cva(
  'relative w-full overflow-x-auto',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableHeaderVariants = cva(
  '[&_tr]:border-b',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableBodyVariants = cva(
  '[&_tr:last-child]:border-0',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableFooterVariants = cva(
  'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableRowVariants = cva(
  'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableHeadVariants = cva(
  'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableCellVariants = cva(
  'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const tableCaptionVariants = cva(
  'text-muted-foreground mt-4 text-sm',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
