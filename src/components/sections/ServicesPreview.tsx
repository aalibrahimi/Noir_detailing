import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { GoldDraw } from "@/components/shared/GoldDraw";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ServicesPreview() {
  return (
    <section className="container-edge py-24 lg:py-40" aria-label="Services">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 mb-20">
        <RevealOnScroll className="lg:col-span-5">
          <div className="flex items-center gap-4 mb-4">
            <GoldDraw width={32} />
            <p className="eyebrow !text-primary !tracking-[0.3em]">Services</p>
          </div>
          <h2 className="font-serif text-display-xl text-foreground">
            Six disciplines.
            <span className="block text-muted-foreground italic">One standard.</span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={1} className="lg:col-span-6 lg:col-start-7 self-end">
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
            Every car that enters the atelier is measured, photographed, and assigned a service plan
            before any product touches the paint. We do not upsell. We tell you what the car needs
            and what it does not.
          </p>
        </RevealOnScroll>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {services.map((service, i) => (
          <RevealOnScroll
            key={service.id}
            delay={(((i % 3) + 1) as 1 | 2 | 3)}
            as="li"
            className="group"
          >
            <Link
              to={`/services#${service.id}`}
              className={cn(
                "block bg-background p-8 lg:p-10 h-full transition-colors duration-500",
                "hover:bg-surface focus-visible:bg-surface",
              )}
            >
              <div className="flex items-start justify-between mb-12">
                <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-500 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl text-foreground tracking-tight mb-3">
                {service.name}
              </h3>
              <p className="font-serif italic text-muted-foreground mb-6">{service.tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="pt-6 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground tracking-[0.16em] uppercase">
                  {service.duration}
                </span>
                <span className="text-primary font-medium tracking-wider">
                  From ${service.tiers[0].price.toLocaleString()}
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </ul>
    </section>
  );
}
