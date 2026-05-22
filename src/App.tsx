import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/shared/Footer";
import { Loader } from "@/components/shared/Loader";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { PageTransition } from "@/components/shared/PageTransition";
import Home from "@/pages/Home";

const Services = lazy(() => import("@/pages/Services"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const About = lazy(() => import("@/pages/About"));
const Booking = lazy(() => import("@/pages/Booking"));
const Contact = lazy(() => import("@/pages/Contact"));

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen-safe bg-background text-foreground noise">
      <Loader />
      <CustomCursor />
      <ScrollToTop />
      <Nav />
      <main id="main" className="relative">
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageFallback />} key={location.pathname}>
            <PageTransition>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
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
        <a
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-primary"
        >
          Return home
        </a>
      </div>
    </section>
  );
}
