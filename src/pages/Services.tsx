import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/CTA";
import { services } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

export default function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [hash]);

  return (
    <>
      <PageHeader />

      <div className="container-edge pb-24 lg:pb-40 space-y-24 lg:space-y-32">
        {services.map((service, idx) => (
          <article
            key={service.id}
            id={service.id}
            className="scroll-mt-32"
            aria-labelledby={`service-${service.id}-title`}
          >
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start mb-12">
              <RevealOnScroll className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs tracking-[0.18em] uppercase text-primary tabular">
                    Discipline · {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2
                  id={`service-${service.id}-title`}
                  className="font-serif text-display-xl text-foreground mb-4"
                >
                  {service.name}
                </h2>
                <p className="font-serif text-2xl italic text-muted-foreground mb-8">
                  {service.tagline}
                </p>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {service.description}
                </p>
                <p className="mt-8 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Time in studio · <span className="text-foreground">{service.duration}</span>
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={2} className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-lg border border-border bg-surface aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={`${service.name} — atelier process`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105 gpu"
                  />
                </div>
              </RevealOnScroll>
            </div>

            {/* Pricing tiers */}
            <div className="grid gap-px bg-border border border-border rounded-lg overflow-hidden md:grid-cols-2 lg:grid-cols-3">
              {service.tiers.map((tier, ti) => (
                <RevealOnScroll
                  key={tier.name}
                  delay={((ti + 1) as 1 | 2 | 3)}
                  className={cn(
                    "bg-background p-8 lg:p-10 flex flex-col gap-6",
                    ti === 1 && "lg:bg-surface",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl text-foreground tracking-tight">
                        {tier.name}
                      </h3>
                      <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-2">
                        {tier.note}
                      </p>
                    </div>
                    {ti === 1 && <Badge variant="primary">Most requested</Badge>}
                  </div>

                  <p className="font-serif text-display-md text-foreground tabular">
                    {formatCurrency(tier.price)}
                  </p>

                  <ul className="space-y-3 text-sm text-muted-foreground flex-1">
                    {tier.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={ti === 1 ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    <Link to={`/booking?service=${service.id}&tier=${tier.name.toLowerCase()}`}>
                      Reserve <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </RevealOnScroll>
              ))}
            </div>
          </article>
        ))}
      </div>

      <CTA
        eyebrow="Tailored programs"
        headline="Not finding what you need."
        body="The atelier accepts a small number of bespoke commissions each year — full restorations, paint preservation programs, and pre-purchase inspections. Reach out and we will respond with options."
        primaryLabel="Discuss a project"
        primaryHref="/contact"
        secondaryLabel="Return to services"
        secondaryHref="/services"
      />
    </>
  );
}

function PageHeader() {
  return (
    <section className="container-edge pt-40 pb-20 lg:pt-48 lg:pb-28">
      <RevealOnScroll>
        <p className="eyebrow mb-6">Services</p>
        <h1 className="font-serif text-display-2xl text-foreground max-w-5xl">
          A complete catalog of
          <span className="block italic text-muted-foreground">paint and interior services.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
          Pricing below is for standard sedans and coupes in fair condition. SUVs, exotics, and
          vehicles with significant paint defects are quoted after inspection. All work is documented
          and warranted in writing.
        </p>
      </RevealOnScroll>
    </section>
  );
}
