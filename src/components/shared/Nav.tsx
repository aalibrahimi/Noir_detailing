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

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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

  return (
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
          className="lg:hidden grid place-items-center h-10 w-10 rounded-full border border-border text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((s) => !s)}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[60px] bottom-0 bg-background border-t border-border transition-transform duration-500 ease-out",
          mobileOpen ? "translate-y-0" : "-translate-y-[110%] pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col p-8 gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "block py-4 font-serif text-3xl tracking-tight border-b border-border",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="px-8 pt-4">
          <Button asChild size="lg" className="w-full">
            <Link to="/booking">Book a consultation</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
