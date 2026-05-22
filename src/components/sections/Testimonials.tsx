import { Quote } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { testimonials } from "@/lib/data";

const stats = [
  { value: 12, suffix: "+", label: "Years in practice" },
  { value: 840, suffix: "", label: "Vehicles refined" },
  { value: 98, suffix: "%", label: "Returning clientele" },
  { value: 5, suffix: " yr", label: "Coating warranty" },
];

export function Testimonials() {
  return (
    <section className="container-edge py-24 lg:py-40" aria-label="Client testimonials">
      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden mb-24">
        {stats.map((s, i) => (
          <RevealOnScroll
            key={s.label}
            delay={((i + 1) as 1 | 2 | 3 | 4)}
            className="bg-background p-8 lg:p-10"
          >
            <p className="font-serif text-display-lg text-foreground">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-xs tracking-[0.18em] uppercase text-muted-foreground">
              {s.label}
            </p>
          </RevealOnScroll>
        ))}
      </div>

      {/* Quotes */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <RevealOnScroll className="lg:col-span-4">
          <p className="eyebrow mb-4">Voices</p>
          <h2 className="font-serif text-display-lg text-foreground">
            Quietly spoken,
            <span className="block italic text-muted-foreground">often returned.</span>
          </h2>
        </RevealOnScroll>

        <ul className="lg:col-span-8 grid gap-px bg-border border border-border rounded-lg overflow-hidden">
          {testimonials.map((t, i) => (
            <RevealOnScroll
              key={t.id}
              delay={((i + 1) as 1 | 2 | 3)}
              as="li"
              className="bg-background p-8 lg:p-12"
            >
              <Quote className="h-5 w-5 text-primary mb-6" aria-hidden="true" />
              <blockquote className="font-serif text-xl lg:text-2xl leading-relaxed text-foreground tracking-tight">
                {t.quote}
              </blockquote>
              <footer className="mt-6 flex items-center gap-4 text-xs tracking-[0.16em] uppercase">
                <span className="text-foreground">{t.name}</span>
                <span className="h-px w-6 bg-border" aria-hidden="true" />
                <span className="text-muted-foreground">{t.vehicle}</span>
              </footer>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}
