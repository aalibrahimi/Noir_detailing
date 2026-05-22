import { useEffect, useRef, useState } from "react";
import { useMotionSupport } from "@/hooks/useMotionSupport";

/** A subtle dot cursor with a magnified ring on interactive elements. Desktop only. */
export function CustomCursor() {
  const { enabled, isFinePointer } = useMotionSupport();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled || !isFinePointer) {
      document.body.removeAttribute("data-custom-cursor");
      return;
    }

    document.body.setAttribute("data-custom-cursor", "true");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive =
        t.closest("a, button, input, textarea, [role='button'], [data-cursor='active']") !== null;
      setActive(isInteractive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.removeAttribute("data-custom-cursor");
    };
  }, [enabled, isFinePointer]);

  if (!enabled || !isFinePointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-primary"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border border-primary/60 transition-[width,height,opacity] duration-200"
        style={{
          width: active ? 56 : 36,
          height: active ? 56 : 36,
          opacity: active ? 1 : 0.5,
          marginLeft: active ? -10 : 0,
          marginTop: active ? -10 : 0,
        }}
      />
    </>
  );
}
