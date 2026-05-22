import { useEffect, useRef } from "react";

interface MagneticOptions {
  /** Distance in px the cursor can pull the element. */
  strength?: number;
  /** Activation radius in px around the element. */
  radius?: number;
  /** Disable on touch / when motion is off. */
  enabled?: boolean;
}

/** Subtle magnetic-button effect. Falls back to no-op when disabled. */
export function useMagnetic<T extends HTMLElement>({
  strength = 18,
  radius = 80,
  enabled = true,
}: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const max = Math.max(rect.width, rect.height) / 2 + radius;
      if (dist < max) {
        const ratio = 1 - dist / max;
        targetX = (dx / max) * strength * ratio;
        targetY = (dy / max) * strength * ratio;
      } else {
        targetX = 0;
        targetY = 0;
      }
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = "";
    };
  }, [strength, radius, enabled]);

  return ref;
}
