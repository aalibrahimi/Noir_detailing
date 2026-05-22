import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { BeforeAfter } from "@/components/shared/BeforeAfter";
import { gallery } from "@/lib/data";

export function GalleryTeaser() {
  // Feature the first three gallery items; first one uses the BA slider.
  const featured = gallery.slice(0, 3);

  return (
    <section className="bg-surface border-y border-border py-24 lg:py-40" aria-label="Selected work">
      <div className="container-edge">
        <div className="flex items-end justify-between mb-16 gap-10">
          <RevealOnScroll>
            <p className="eyebrow mb-4">Recent work</p>
            <h2 className="font-serif text-display-xl text-foreground max-w-3xl">
              Before, after,
              <span className="italic text-muted-foreground"> rarely between.</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={2} className="hidden sm:block shrink-0">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-primary group"
            >
              View archive
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </RevealOnScroll>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-8">
            <BeforeAfter
              before={featured[0].before}
              after={featured[0].after}
              beforeAlt={`${featured[0].title} before paint correction`}
              afterAlt={`${featured[0].title} after paint correction`}
              className="aspect-[16/10]"
            />
            <div className="mt-4 flex items-center justify-between text-sm">
              <p className="font-serif text-foreground">{featured[0].title}</p>
              <p className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
                {featured[0].vehicle}
              </p>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            {featured.slice(1).map((item, i) => (
              <RevealOnScroll
                key={item.id}
                delay={(i + 1) as 1 | 2}
                className="group"
              >
                <Link to={`/gallery`} aria-label={`${item.title} — view in archive`}>
                  <div className="relative overflow-hidden rounded-lg border border-border bg-surface aspect-[4/3]">
                    <img
                      src={item.thumbnail}
                      alt={`${item.title} — ${item.vehicle}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 gpu"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                    <span className="absolute left-4 top-4 text-[10px] font-medium tracking-[0.18em] uppercase text-primary">
                      {item.category}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="font-serif text-base text-foreground">{item.title}</p>
                        <p className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground mt-1">
                          {item.vehicle}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-foreground/70 transition-all duration-500 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="sm:hidden mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-primary"
          >
            View archive
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
