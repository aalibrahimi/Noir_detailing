import { motion } from "framer-motion";
import { useMotionSupport } from "@/hooks/useMotionSupport";
import { cn } from "@/lib/utils";

interface GoldDrawProps {
  className?: string;
  /** Width of the line in px when fully drawn. */
  width?: number;
  /** Delay relative to viewport entry (s). */
  delay?: number;
  /** Animate immediately rather than on viewport entry. */
  immediate?: boolean;
}

/**
 * A gold hairline that draws in from the left when scrolled into view.
 * Used under section eyebrows / above headings.
 */
export function GoldDraw({
  className,
  width = 64,
  delay = 0,
  immediate = false,
}: GoldDrawProps) {
  const { enabled } = useMotionSupport();

  if (!enabled) {
    return (
      <span
        aria-hidden="true"
        className={cn("block h-px bg-primary fb-fade-in", className)}
        style={{ width, animationDelay: `${delay}s` }}
      />
    );
  }

  const viewportProps = immediate
    ? { initial: { scaleX: 0 }, animate: { scaleX: 1 } }
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true, amount: 0.6 },
      };

  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-px bg-primary origin-left", className)}
      style={{ width }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...viewportProps}
    />
  );
}
