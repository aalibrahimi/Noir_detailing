import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  /** Single image. Same source is shown on both halves — the "before" half
      receives a CSS treatment that simulates an unpolished surface. */
  image: string;
  alt: string;
  className?: string;
}

/**
 * Draggable before/after slider. Both halves render the SAME source image —
 * the left half gets desaturate/dim/blur + a dusty overlay to read as the
 * pre-detail state. This is honest about being a visual simulation; in
 * production each gallery item would carry an actual before photograph.
 */
export function BeforeAfter({ image, alt, className }: BeforeAfterProps) {
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
      {/* AFTER — the true polished image, on the right */}
      <img
        src={image}
        alt={`${alt} — after detail`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover gpu"
      />

      {/* BEFORE — same image, clipped to the left of the handle, with
          desaturate + dim filter and a dust/haze overlay on top */}
      <div
        className="absolute inset-0 overflow-hidden gpu"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "saturate(0.35) brightness(0.72) contrast(0.88) blur(0.4px)",
          }}
        />
        {/* Dust / haze overlay — warm grey wash + subtle vignette */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(180deg, rgba(120,110,95,0.35) 0%, rgba(80,75,68,0.28) 60%, rgba(40,38,35,0.32) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
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
