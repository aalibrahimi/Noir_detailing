import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gpu",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-gold-400 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-surface hover:border-muted-foreground/40",
        ghost: "bg-transparent text-foreground hover:bg-surface",
        link: "text-primary underline-gold p-0 h-auto",
        secondary:
          "bg-surface text-foreground hover:bg-surface-elevated border border-border",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-full",
        sm: "h-9 px-4 rounded-full text-xs",
        lg: "h-14 px-8 rounded-full text-sm tracking-wide",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
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
