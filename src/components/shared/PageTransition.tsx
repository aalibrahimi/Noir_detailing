import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useMotionSupport } from "@/hooks/useMotionSupport";
import { pageTransition } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { enabled } = useMotionSupport();
  const location = useLocation();

  if (!enabled) {
    return (
      <div key={location.pathname} className="fb-fade-in" style={{ animationDuration: "300ms" }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      key={location.pathname}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
