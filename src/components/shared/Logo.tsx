import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showMark?: boolean;
  variant?: "default" | "stacked";
}

export function Logo({ className, showMark = true, variant = "default" }: LogoProps) {
  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-start gap-1", className)}>
        <Mark />
        <span className="font-serif text-base tracking-tight">NOIR</span>
        <span className="text-[9px] tracking-[0.32em] uppercase text-muted-foreground">
          Detailing House
        </span>
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {showMark && <Mark />}
      <div className="flex flex-col leading-none">
        <span className="font-serif text-lg tracking-tight">NOIR</span>
        <span className="text-[8px] tracking-[0.32em] uppercase text-muted-foreground mt-0.5">
          Detailing House
        </span>
      </div>
    </div>
  );
}

function Mark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="14" cy="14" r="13" stroke="currentColor" strokeOpacity="0.5" />
      <path
        d="M9 19V9h1.2l8.4 7.8V9H20v10h-1.2L10.4 11.2V19H9Z"
        fill="currentColor"
      />
    </svg>
  );
}
