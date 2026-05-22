import { useEffect, useState } from "react";

export interface MotionSupport {
  /** True when full Framer Motion is allowed. */
  enabled: boolean;
  /** User has requested reduced motion. */
  prefersReducedMotion: boolean;
  /** Browser is Safari (any version). */
  isSafari: boolean;
  /** Safari version number, or null when not Safari. */
  safariVersion: number | null;
  /** backdrop-filter (or -webkit-) is supported. */
  supportsBackdropBlur: boolean;
  /** Pointer is a fine cursor (desktop). */
  isFinePointer: boolean;
}

const initial: MotionSupport = {
  enabled: false, // assume off until we've measured (avoids SSR hydration jank)
  prefersReducedMotion: false,
  isSafari: false,
  safariVersion: null,
  supportsBackdropBlur: false,
  isFinePointer: false,
};

function detectSafariVersion(ua: string): number | null {
  // Chromium on Mac includes "Safari" in UA — exclude Chrome/Edge/Brave.
  const isChromiumOrEdge = /(Chrome|Chromium|Edg|OPR|Brave)\//i.test(ua);
  const isSafariUA = /Safari\//i.test(ua) && !isChromiumOrEdge;
  if (!isSafariUA) return null;
  const m = ua.match(/Version\/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  return parseFloat(m[1]);
}

export function useMotionSupport(): MotionSupport {
  const [state, setState] = useState<MotionSupport>(initial);

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const ua = navigator.userAgent;
    const safariVersion = detectSafariVersion(ua);
    const isSafari = safariVersion !== null;

    const supportsBackdropBlur =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      (CSS.supports("backdrop-filter", "blur(10px)") ||
        CSS.supports("-webkit-backdrop-filter", "blur(10px)"));

    const compute = (): MotionSupport => {
      const prefersReducedMotion = reducedQuery.matches;
      const safariOk = !isSafari || (safariVersion ?? 0) >= 16;
      const enabled = !prefersReducedMotion && safariOk;
      return {
        enabled,
        prefersReducedMotion,
        isSafari,
        safariVersion,
        supportsBackdropBlur,
        isFinePointer: fineQuery.matches,
      };
    };

    setState(compute());

    const onReduced = () => setState(compute());
    const onFine = () => setState(compute());

    // Cross-browser listener attach (older Safari needs addListener).
    if (reducedQuery.addEventListener) reducedQuery.addEventListener("change", onReduced);
    else reducedQuery.addListener(onReduced);

    if (fineQuery.addEventListener) fineQuery.addEventListener("change", onFine);
    else fineQuery.addListener(onFine);

    return () => {
      if (reducedQuery.removeEventListener) reducedQuery.removeEventListener("change", onReduced);
      else reducedQuery.removeListener(onReduced);
      if (fineQuery.removeEventListener) fineQuery.removeEventListener("change", onFine);
      else fineQuery.removeListener(onFine);
    };
  }, []);

  return state;
}
