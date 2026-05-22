import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionSupport } from "@/hooks/useMotionSupport";

/** First-paint loader. Animates the brand mark, then dissolves. */
export function Loader() {
  const [visible, setVisible] = useState(true);
  const { enabled } = useMotionSupport();

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(t);
  }, []);

  if (!enabled) {
    if (!visible) return null;
    return (
      <div
        className="fixed inset-0 z-[200] grid place-items-center bg-background fb-fade-in"
        aria-hidden="true"
        style={{ animationDuration: "200ms" }}
      >
        <BrandMark />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-background"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrandMark />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BrandMark() {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="22" stroke="hsl(var(--primary))" strokeWidth="1" />
        <path
          d="M16 32V16h2l14 13V16h2v16h-2L18 19v13h-2Z"
          fill="hsl(var(--primary))"
        />
      </svg>
      <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
        Noir
      </span>
    </div>
  );
}
