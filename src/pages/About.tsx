import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { CTA } from "@/components/sections/CTA";

const team = [
  {
    name: "Sajad Alibrahimi",
    role: "Founder, Master Technician",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=85&auto=format&fit=crop",
    bio: "Twelve years in concours preparation. Formerly with a private collection in Geneva.",
  },
  {
    name: "Elena Vasquez",
    role: "Studio Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85&auto=format&fit=crop",
    bio: "Oversees intakes, scheduling, and client relationships. Eight years at the bench before stepping into the studio role.",
  },
  {
    name: "Marcus Whyte",
    role: "Senior Coating Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85&auto=format&fit=crop",
    bio: "Modesta and Gtechniq certified. Specializes in graphene topcoats and full-body PPF installations.",
  },
];

export default function About() {
  return (
    <>
      <section className="container-edge pt-40 pb-24 lg:pt-48 lg:pb-32">
        <RevealOnScroll>
          <p className="eyebrow mb-6">House</p>
          <h1 className="font-serif text-display-2xl text-foreground max-w-4xl">
            Founded on patience,
            <span className="block italic text-muted-foreground">refined by repetition.</span>
          </h1>
        </RevealOnScroll>
      </section>

      {/* Story */}
      <section className="bg-surface border-y border-border py-24 lg:py-40">
        <div className="container-edge grid gap-16 lg:grid-cols-12 lg:gap-20 items-start">
          <RevealOnScroll className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-lg border border-border aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=90&auto=format&fit=crop"
                alt="The atelier — controlled lighting, polished concrete floor"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={2} className="lg:col-span-7 space-y-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
            <p className="eyebrow text-primary">Origin · 2014</p>
            <p>
              NOIR began in a single bay in San Jose. The intent was modest — to offer paint
              correction at a standard that did not yet exist in the region. The first year saw
              forty cars. The second, sixty. By the fifth, we had moved into the current 4,800-square-foot
              atelier on Stockton Avenue.
            </p>
            <p>
              We have never advertised. The clientele is built entirely on referral, and the calendar
              is set in writing six weeks in advance. The atelier accepts a maximum of fourteen
              vehicles per month. This is not a constraint we apologize for — it is the constraint
              that makes the work possible.
            </p>
            <p className="text-foreground font-serif text-xl italic tracking-tight">
              "The car is not the product. The relationship is."
            </p>
            <p className="text-sm text-muted-foreground">— Sajad Alibrahimi, founder</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="container-edge py-24 lg:py-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {[
            { v: 2014, s: "", l: "Founded" },
            { v: 840, s: "+", l: "Vehicles refined" },
            { v: 14, s: "", l: "Monthly intakes" },
            { v: 4800, s: " sqft", l: "Atelier floor" },
          ].map((stat, i) => (
            <RevealOnScroll
              key={stat.l}
              delay={((i + 1) as 1 | 2 | 3 | 4)}
              className="bg-background p-8 lg:p-10"
            >
              <p className="font-serif text-display-lg text-foreground">
                <AnimatedCounter value={stat.v} suffix={stat.s} />
              </p>
              <p className="mt-3 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {stat.l}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container-edge pb-24 lg:pb-40">
        <RevealOnScroll className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">The bench</p>
          <h2 className="font-serif text-display-xl text-foreground">
            Three hands,
            <span className="italic text-muted-foreground"> one standard.</span>
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed">
            The atelier remains intentionally small. Every car is touched by the same three people,
            from intake to delivery.
          </p>
        </RevealOnScroll>

        <ul className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <RevealOnScroll
              key={member.name}
              delay={((i + 1) as 1 | 2 | 3)}
              as="li"
            >
              <div className="overflow-hidden rounded-lg border border-border bg-surface">
                <div className="relative aspect-[4/5]">
                  <img
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="font-serif text-2xl tracking-tight">{member.name}</h3>
                  <p className="mt-1 text-xs tracking-[0.18em] uppercase text-primary">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </ul>
      </section>

      <CTA
        eyebrow="Visit"
        headline="The atelier is open by appointment."
        body="Tours of the floor are offered to active and prospective clients. Bring the car or come alone — we will set aside an hour."
        primaryLabel="Arrange a visit"
      />
    </>
  );
}
