import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useMotionSupport } from "@/hooks/useMotionSupport";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonProps {
  strength?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 14, ...rest }, _ref) => {
    const { enabled, isFinePointer } = useMotionSupport();
    const magRef = useMagnetic<HTMLDivElement>({
      strength,
      enabled: enabled && isFinePointer,
    });

    return (
      <div ref={magRef} className="inline-flex">
        <Button
          className={cn("transition-transform duration-300", className)}
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </Button>
      </div>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
