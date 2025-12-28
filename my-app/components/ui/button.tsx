import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-[200%] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#cf2d4a] text-[#ffe8eee7] hover:bg-[#b21f3b]",
        outline:
          "border border-[#7a2b3c] text-[#ffe8eee7] hover:bg-[#7a2b3c]/20",
        ghost: "bg-transparent text-[#ffe8eee7] hover:bg-[#cf2d4a]/15",
      },
      size: {
        default: "h-10 px-5 rounded-full",
        sm: "h-9 px-4 rounded-full",
        lg: "h-11 px-6 rounded-full",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
