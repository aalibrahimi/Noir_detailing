import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll position when navigating between routes. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
