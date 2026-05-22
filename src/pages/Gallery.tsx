import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { BeforeAfter } from "@/components/shared/BeforeAfter";
import { gallery, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Ceramic", "Correction", "PPF", "Interior"] as const;
type Category = (typeof categories)[number];

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("All");
  const [open, setOpen] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <>
      <section className="container-edge pt-40 pb-16 lg:pt-48 lg:pb-20">
        <RevealOnScroll>
          <p className="eyebrow mb-6">Selected work</p>
          <h1 className="font-serif text-display-2xl text-foreground max-w-5xl">
            An archive of paint,
            <span className="block italic text-muted-foreground">restored to spec.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-base lg:text-lg text-muted-foreground leading-relaxed">
            A small selection of work from the past twelve months. Each car was photographed under
            controlled studio lighting before and after the service. Tap any image to enter the
            before/after.
          </p>
        </RevealOnScroll>

        {/* Filter chips */}
        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs tracking-[0.18em] uppercase transition-colors",
                filter === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground hover:border-muted-foreground/40",
              )}
              aria-pressed={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="container-edge pb-24 lg:pb-40">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground italic">
            No work in this category yet. Check back soon.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((item, i) => (
              <RevealOnScroll
                key={item.id}
                as="li"
                delay={(((i % 3) + 1) as 1 | 2 | 3)}
              >
                <button
                  type="button"
                  onClick={() => setOpen(item)}
                  className="group block w-full text-left"
                  aria-label={`${item.title} — open before/after`}
                >
                  <div className="relative overflow-hidden rounded-lg border border-border bg-surface aspect-[4/5]">
                    <img
                      src={item.thumbnail}
                      alt={`${item.title} — ${item.vehicle}`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] gpu"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/0 to-background/0"
                      aria-hidden="true"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge variant="primary">{item.category}</Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-serif text-lg lg:text-xl text-foreground tracking-tight">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                          {item.vehicle}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-foreground/70 transition-all duration-500 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </button>
              </RevealOnScroll>
            ))}
          </ul>
        )}
      </section>

      {/* Lightbox */}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-6xl bg-background border-border p-4 sm:p-6">
          {open && (
            <div className="space-y-4">
              <div>
                <DialogTitle>{open.title}</DialogTitle>
                <DialogDescription>{open.vehicle}</DialogDescription>
              </div>
              <BeforeAfter
                before={open.before}
                after={open.after}
                beforeAlt={`${open.title} before ${open.category.toLowerCase()}`}
                afterAlt={`${open.title} after ${open.category.toLowerCase()}`}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
