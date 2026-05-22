import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { studio } from "@/lib/data";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    window.setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-edge py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-8">
            <Logo />
            <p className="font-serif text-2xl leading-[1.3] tracking-tight max-w-md text-foreground">
              A private atelier for ceramic, correction, and protection film. Appointment only.
            </p>

            <form onSubmit={onSubmit} className="max-w-md">
              <label htmlFor="newsletter" className="eyebrow block mb-3">
                Subscribe to The Quiet Brief
              </label>
              <div className="flex gap-2">
                <Input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="flex-1"
                  aria-describedby="newsletter-help"
                />
                <Button type="submit" size="icon" aria-label="Subscribe">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p
                id="newsletter-help"
                className="text-xs text-muted-foreground mt-2"
                aria-live="polite"
              >
                {submitted
                  ? "Confirmation sent. Welcome."
                  : "Four times a year. Field notes, restoration journals, no marketing."}
              </p>
            </form>
          </div>

          <div className="lg:col-span-7 grid gap-12 sm:grid-cols-3">
            <div>
              <h4 className="eyebrow mb-5">House</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Philosophy</Link>
                </li>
                <li>
                  <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-muted-foreground hover:text-foreground transition-colors">Selected Work</Link>
                </li>
                <li>
                  <Link to="/booking" className="text-muted-foreground hover:text-foreground transition-colors">Book</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="eyebrow mb-5">Atelier</h4>
              <address className="space-y-3 text-sm not-italic text-muted-foreground">
                <p>{studio.address}</p>
                <p>{studio.city}</p>
                <p>
                  <a href={`tel:${studio.phone.replace(/\s/g, "")}`} className="hover:text-foreground transition-colors">
                    {studio.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${studio.email}`} className="hover:text-foreground transition-colors">
                    {studio.email}
                  </a>
                </p>
              </address>
            </div>

            <div>
              <h4 className="eyebrow mb-5">Elsewhere</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`https://instagram.com/${studio.social.instagram}`}
                    rel="noreferrer"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={`https://youtube.com/${studio.social.youtube}`}
                    rel="noreferrer"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                  >
                    <Youtube className="h-4 w-4" /> YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-edge flex flex-col-reverse sm:flex-row gap-4 sm:items-center sm:justify-between py-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NOIR Detailing House. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-foreground transition-colors">Imprint</Link>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
