import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/button";

interface CTAProps {
  eyebrow?: string;
  headline?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
}

export function CTA({
  eyebrow = "Begin",
  headline = "An appointment, not a transaction.",
  body = "The atelier accepts a limited number of intakes each month. Reservations are made by consultation. We will respond within one business day.",
  primaryHref = "/booking",
  primaryLabel = "Request a consultation",
  secondaryHref = "/contact",
  secondaryLabel = "Speak with the studio",
  image = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2000&q=90&auto=format&fit=crop",
}: CTAProps) {
  return (
    <section className="relative isolate overflow-hidden" aria-label="Get in touch">
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
      </div>

      <div className="container-edge py-32 lg:py-48">
        <RevealOnScroll className="max-w-4xl">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 className="font-serif text-display-2xl text-foreground">
            {headline.split(".").map((segment, i, arr) => (
              <span key={i} className={i % 2 === 1 ? "italic text-muted-foreground" : undefined}>
                {segment}
                {i < arr.length - 1 ? "." : ""}
              </span>
            ))}
          </h2>
          <p className="mt-10 max-w-xl text-base lg:text-lg text-muted-foreground leading-relaxed">
            {body}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to={primaryHref}>
                {primaryLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
