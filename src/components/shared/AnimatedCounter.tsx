import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration,
}: AnimatedCounterProps) {
  const { ref, display } = useCounter(value, duration);
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn("tabular", className)}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
