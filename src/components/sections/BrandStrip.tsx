import { Marquee } from "@/components/shared/Marquee";
import { brandStrip } from "@/lib/data";

export function BrandStrip() {
  return (
    <section
      className="border-y border-border bg-background py-10"
      aria-label="Marques entrusted to the atelier"
    >
      <div className="mb-8 text-center">
        <p className="eyebrow">Entrusted by collectors of</p>
      </div>
      <Marquee>
        {brandStrip.map((b) => (
          <span
            key={b.name}
            className="font-serif text-2xl md:text-3xl tracking-tight text-muted-foreground whitespace-nowrap"
          >
            {b.name}
            <span className="ml-16 text-border" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
