import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono text-[13px] tracking-[0.02em] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out [transform-style:preserve-3d] hover:-translate-y-0.5 hover:[transform:perspective(600px)_translateY(-2px)_rotateX(6deg)] active:[transform:perspective(600px)_translateY(0)_rotateX(0deg)_scale(0.97)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none min-h-11",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-fill text-on-fill hover:bg-accent-fill-strong shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]",
        secondary:
          "bg-transparent text-ink border border-line hover:border-accent shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]",
        ghost: "bg-transparent text-ink hover:bg-surface-300",
      },
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2 text-xs",
        full: "w-full px-6 py-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
