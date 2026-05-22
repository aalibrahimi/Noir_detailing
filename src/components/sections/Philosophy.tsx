import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { GoldDraw } from "@/components/shared/GoldDraw";

const principles = [
  {
    title: "Measured, not estimated.",
    body: "Every panel is paint-depth gauged before and after work. We document the car so you can document its history.",
  },
  {
    title: "Slow on purpose.",
    body: "We accept fewer than a dozen vehicles per month. The work moves at the pace the paint requires — no faster.",
  },
  {
    title: "No hidden compounds.",
    body: "We publish the products we use. Gtechniq, Modesta, XPEL, Sonax — each chosen, none sponsored.",
  },
  {
    title: "A relationship, not a service.",
    body: "Most clients return for annual decontamination and renewal. The cars get better with each visit, not worse.",
  },
];

export function Philosophy() {
  return (
    <section className="bg-surface border-y border-border py-24 lg:py-40" aria-label="House principles">
      <div className="container-edge">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <RevealOnScroll className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-4">
                <GoldDraw width={32} />
                <p className="eyebrow !text-primary !tracking-[0.3em]">Philosophy</p>
              </div>
              <h2 className="font-serif text-display-xl text-foreground">
                We refine.
                <span className="block italic text-muted-foreground">We do not rush.</span>
              </h2>
              <p className="mt-8 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                The atelier was founded on a simple idea — that a car deserves the same patience a
                watchmaker brings to a movement. Four principles guide every car we touch.
              </p>
            </div>
          </RevealOnScroll>

          <ul className="lg:col-span-7 space-y-px bg-border rounded-lg overflow-hidden border border-border">
            {principles.map((p, i) => (
              <RevealOnScroll
                key={p.title}
                delay={((i + 1) as 1 | 2 | 3 | 4)}
                as="li"
                className="bg-background p-8 lg:p-12 grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-12 items-start"
              >
                <span className="font-serif text-display-md text-primary leading-none tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-foreground tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
