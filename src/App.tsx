import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/shared/Footer";
import { Loader } from "@/components/shared/Loader";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { useMotionSupport } from "@/hooks/useMotionSupport";
import Home from "@/pages/Home";

const Services = lazy(() => import("@/pages/Services"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const About = lazy(() => import("@/pages/About"));
const Booking = lazy(() => import("@/pages/Booking"));
const Contact = lazy(() => import("@/pages/Contact"));

export default function App() {
  return (
    <div className="relative min-h-screen-safe bg-background text-foreground noise">
      <Loader />
      <ScrollToTop />
      <Nav />
      <main id="main" className="relative">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

// IMPORTANT: motion.div must be the DIRECT keyed child of AnimatePresence so
// Framer Motion can coordinate enter/exit. Wrapping Suspense (or any non-motion
// component) as the direct child causes mode="wait" to hang — the old child
// never finishes exiting, so the new route never mounts.
function AnimatedRoutes() {
  const location = useLocation();
  const { enabled } = useMotionSupport();

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  if (!enabled) {
    return (
      <div key={location.pathname} className="fb-fade-in" style={{ animationDuration: "300ms" }}>
        <Suspense fallback={<PageFallback />}>{routes}</Suspense>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Suspense fallback={<PageFallback />}>{routes}</Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function PageFallback() {
  return (
    <div className="min-h-screen-safe grid place-items-center" aria-label="Loading page" role="status">
      <div className="h-6 w-6 rounded-full border-2 border-border border-t-primary animate-spin" />
    </div>
  );
}

function NotFound() {
  return (
    <section className="container-edge min-h-screen-safe grid place-items-center text-center pt-40 pb-24">
      <div>
        <p className="eyebrow mb-6">404</p>
        <h1 className="font-serif text-display-xl text-foreground">
          Off-route.
          <span className="block italic text-muted-foreground">Quietly so.</span>
        </h1>
        <p className="mt-6 text-muted-foreground">The page you were looking for has moved or never existed.</p>
        <a href="/" className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-primary">
          Return home
        </a>
      </div>
    </section>
  );
}
