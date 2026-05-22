import { type ReactNode, type ElementType, type HTMLAttributes } from "react";
import { motion, type MotionProps, type Variants } from "framer-motion";
import { useMotionSupport } from "@/hooks/useMotionSupport";
import { cn } from "@/lib/utils";

type AllowedTag = "div" | "section" | "article" | "header" | "footer" | "li" | "ul" | "span" | "p" | "h1" | "h2" | "h3";

interface MotionSafeProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Tag rendered as both motion.* and plain *. */
  as?: AllowedTag;
  children?: ReactNode;
  /** Framer Motion variants. Used when motion is enabled. */
  variants?: Variants;
  /** When motion is disabled, this class is added (e.g. `fb-fade-up fb-delay-2`). */
  fallbackClassName?: string;
  /** Forwarded motion props. */
  motionProps?: MotionProps;
  /** Initial state name (forwarded to Framer Motion). Defaults to "hidden". */
  initial?: string;
  /** Animate state name. Defaults to "visible". */
  whileInView?: string;
  /** When true, animate on viewport entry (default). When false, animate immediately. */
  inView?: boolean;
  /** Viewport options. */
  viewportAmount?: number;
  /** Animate only once. */
  once?: boolean;
}

/**
 * Wraps children in either Framer Motion or plain element with CSS fallback,
 * driven by `useMotionSupport()`. This is the ONE place we branch animations.
 */
export function MotionSafe({
  as = "div",
  children,
  variants,
  fallbackClassName,
  motionProps,
  initial = "hidden",
  whileInView = "visible",
  inView = true,
  viewportAmount = 0.25,
  once = true,
  className,
  ...rest
}: MotionSafeProps) {
  const { enabled } = useMotionSupport();

  if (!enabled) {
    const Tag = as as ElementType;
    return (
      <Tag className={cn(fallbackClassName, className)} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] as unknown as ElementType;
  const inViewProps = inView
    ? { initial, whileInView, viewport: { once, amount: viewportAmount } }
    : { initial, animate: whileInView };

  return (
    <MotionTag
      variants={variants}
      className={className}
      {...inViewProps}
      {...motionProps}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
