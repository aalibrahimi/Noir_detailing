import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Atelier" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Work" },
  { to: "/about", label: "House" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const { scrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the menu is open. Restore on unmount.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding] duration-500",
          scrolled
            ? "glass border-b border-border py-3"
            : "bg-transparent border-b border-transparent py-5",
        )}
      >
        <nav
          className="container-edge flex items-center justify-between"
          aria-label="Primary"
        >
          <Link
            to="/"
            aria-label="NOIR Detailing House — home"
            className="text-foreground transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "text-xs uppercase tracking-[0.22em] transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button asChild size="sm">
              <Link to="/booking">Book a consultation</Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden grid place-items-center h-11 w-11 rounded-full border border-border text-foreground bg-background/40"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((s) => !s)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu — rendered as a sibling of the header,
          mounted only when open. Solid background, z-index above header,
          scrollable middle section, footer CTA pinned at bottom. */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="lg:hidden fixed inset-0 z-[70] bg-background flex flex-col"
          style={{ height: "100dvh" }}
        >
          {/* Header row inside the overlay — matches the site nav */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
            <Link
              to="/"
              aria-label="NOIR Detailing House — home"
              className="text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <Logo />
            </Link>
            <button
              type="button"
              className="grid place-items-center h-11 w-11 rounded-full border border-border text-foreground"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable nav list */}
          <nav
            aria-label="Mobile primary"
            className="flex-1 overflow-y-auto px-6 py-8"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-baseline justify-between gap-4 py-5 font-serif text-4xl tracking-tight border-b border-border transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )
                    }
                  >
                    <span>{link.label}</span>
                    <span className="text-xs tabular tracking-[0.18em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer CTA pinned at bottom */}
          <div className="px-6 pb-8 pt-4 border-t border-border shrink-0">
            <Button asChild size="lg" className="w-full">
              <Link to="/booking" onClick={() => setMobileOpen(false)}>
                Book a consultation
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
