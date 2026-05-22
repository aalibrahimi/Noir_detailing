import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useMotionSupport } from "@/hooks/useMotionSupport";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { letterReveal } from "@/lib/animations";

const HEADLINE_LINE_ONE = "Paint protected";
const HEADLINE_LINE_TWO = "to the eye, & to the touch.";

export function Hero() {
  const { enabled } = useMotionSupport();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-screen-safe w-full overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 -z-10 gpu"
        style={enabled ? { y } : undefined}
      >
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2400&q=90&auto=format&fit=crop"
          alt="A polished black sports car in low studio lighting"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-edge relative z-10 grid min-h-screen-safe content-end pb-24 pt-40 lg:content-center lg:pt-32"
        style={enabled ? { opacity } : undefined}
      >
        <div className="max-w-5xl">
          <Eyebrow />
          <h1 className="mt-8 font-serif text-display-2xl text-foreground">
            <ScreenReaderText>
              {HEADLINE_LINE_ONE} {HEADLINE_LINE_TWO}
            </ScreenReaderText>
            <HeadlineLine text={HEADLINE_LINE_ONE} startIndex={0} />
            <span className="block text-muted-foreground italic">
              <HeadlineLine text={HEADLINE_LINE_TWO} startIndex={HEADLINE_LINE_ONE.length} />
            </span>
          </h1>

          <div className="mt-10 lg:mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-xl text-base lg:text-lg text-muted-foreground leading-relaxed">
              NOIR is a private detailing house. We protect, refine, and maintain the cars our clients
              keep. The work is slow, the appointments few, the result measured in years.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton asChild size="lg">
                <Link to="/booking">
                  Book a consultation <ArrowUpRight className="h-4 w-4" />
                </Link>
              </MagneticButton>
              <MagneticButton asChild variant="outline" size="lg">
                <Link to="/services">View services</Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <ScrollCue />
    </section>
  );
}

function Eyebrow() {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-primary" />
      <span className="text-xs tracking-[0.32em] uppercase text-primary">
        Atlanta · By appointment
      </span>
    </div>
  );
}

function ScreenReaderText({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

function HeadlineLine({ text, startIndex }: { text: string; startIndex: number }) {
  const { enabled } = useMotionSupport();
  const words = text.split(" ");

  if (!enabled) {
    return (
      <span className="block fb-fade-up" aria-hidden="true" style={{ animationDelay: `${startIndex * 0.01}s` }}>
        {text}
      </span>
    );
  }

  let i = startIndex;
  return (
    <span className="block" aria-hidden="true">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block gpu"
            custom={i++}
            initial="hidden"
            animate="visible"
            variants={letterReveal}
          >
            {word}
            {wi < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function ScrollCue() {
  const { enabled } = useMotionSupport();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  const Wrapper = enabled ? motion.div : "div";
  const wrapperProps = enabled
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 1.4, duration: 0.6 },
      }
    : { className: "fb-fade-in", style: { animationDelay: "1.4s" } as React.CSSProperties };

  return (
    <Wrapper
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-muted-foreground"
      {...(wrapperProps as object)}
    >
      <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
      <ArrowDown className="h-4 w-4 animate-bounce" />
    </Wrapper>
  );
}
