import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

/** Draggable before/after image slider with keyboard support. Pure CSS — no Framer. */
export function BeforeAfter({ before, after, beforeAlt, afterAlt, className }: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(rect.right, Math.max(rect.left, clientX));
    const pct = ((x - rect.left) / rect.width) * 100;
    setPosition(pct);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPosition(0);
    if (e.key === "End") setPosition(100);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate w-full overflow-hidden rounded-lg border border-border bg-surface select-none",
        className,
      )}
      style={{ aspectRatio: "16 / 10" }}
    >
      <img
        src={after}
        alt={afterAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover gpu"
      />
      <div
        className="absolute inset-0 overflow-hidden gpu"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Labels */}
      <span className="absolute left-4 top-4 z-10 rounded-full bg-background/80 px-3 py-1 text-[10px] font-medium tracking-[0.18em] uppercase text-foreground">
        Before
      </span>
      <span className="absolute right-4 top-4 z-10 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-medium tracking-[0.18em] uppercase text-primary-foreground">
        After
      </span>

      {/* Handle */}
      <button
        type="button"
        aria-label="Before/after slider — drag or use arrow keys"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onMouseDown={() => (dragging.current = true)}
        onTouchStart={() => (dragging.current = true)}
        onKeyDown={onKey}
        className="absolute top-0 z-20 h-full w-1 -translate-x-1/2 bg-primary/90 outline-none focus-visible:bg-primary cursor-ew-resize"
        style={{ left: `${position}%` }}
      >
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ba-handle-pulse"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="-ml-1">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
