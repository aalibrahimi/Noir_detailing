import type { ReactNode } from "react";
import { MotionSafe } from "./MotionSafe";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Delay index for stagger (matches fb-delay-N classes). */
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  as?: "div" | "section" | "article" | "li" | "h1" | "h2" | "h3" | "p" | "span";
}

export function RevealOnScroll({ children, className, delay = 0, as = "div" }: RevealOnScrollProps) {
  const fallbackDelay = delay > 0 ? `fb-delay-${delay}` : "";
  return (
    <MotionSafe
      as={as}
      variants={fadeUp}
      fallbackClassName={cn("fb-fade-up", fallbackDelay)}
      motionProps={delay ? { transition: { delay: delay * 0.08 } } : undefined}
      className={className}
    >
      {children}
    </MotionSafe>
  );
}
