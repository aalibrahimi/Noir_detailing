import { type ReactNode } from "react";
import { useMotionSupport } from "@/hooks/useMotionSupport";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
}

/**
 * Infinite marquee. Uses Tailwind's `animate-marquee` (Framer-free, pure CSS)
 * so it works identically on Safari. Respects prefers-reduced-motion.
 */
export function Marquee({ children, className, reverse = false }: MarqueeProps) {
  const { prefersReducedMotion } = useMotionSupport();
  const animClass = prefersReducedMotion
    ? ""
    : reverse
    ? "animate-marquee-reverse"
    : "animate-marquee";

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent_0,black_8%,black_92%,transparent_100%)]",
        className,
      )}
    >
      <div className={cn("flex shrink-0 items-center gap-16 pr-16", animClass)}>
        {children}
      </div>
      <div className={cn("flex shrink-0 items-center gap-16 pr-16", animClass)} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
