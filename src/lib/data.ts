/* Production content for NOIR Detailing House.
   All copy is intentionally restrained — no exclamation points, no superlatives. */

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  image: string;
  tiers: Array<{
    name: string;
    price: number;
    note: string;
    inclusions: string[];
  }>;
}

export const services: Service[] = [
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    tagline: "Five years of glass.",
    description:
      "A multi-layer 9H ceramic system, applied in a controlled environment after a full decontamination and refinement of the paint surface. The coating cures to a hydrophobic, UV-stable shell that protects against light marring, road salts, and oxidation.",
    duration: "2 — 3 days",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=90&auto=format&fit=crop",
    tiers: [
      {
        name: "Signature",
        price: 1850,
        note: "Single layer, three-year",
        inclusions: [
          "Two-stage decontamination",
          "One-step paint refinement",
          "9H ceramic — single layer",
          "Wheel face and exhaust tips coated",
          "Three-year warranty",
        ],
      },
      {
        name: "Atelier",
        price: 2950,
        note: "Most requested",
        inclusions: [
          "Three-stage decontamination",
          "Two-step paint correction",
          "9H ceramic — dual layer with topcoat",
          "All wheels (face + barrels), calipers, exhaust",
          "Glass coating included",
          "Five-year warranty",
        ],
      },
      {
        name: "Reserve",
        price: 4450,
        note: "Concours-level",
        inclusions: [
          "Full decontamination protocol",
          "Three-step paint correction",
          "9H ceramic — triple layer with graphene topcoat",
          "Trim, plastics, and interior leather coated",
          "Annual maintenance for two years",
          "Lifetime warranty (transferable)",
        ],
      },
    ],
  },
  {
    id: "paint-correction",
    name: "Paint Correction",
    tagline: "The clearcoat, restored.",
    description:
      "A measured, machine-polished refinement of the clearcoat. We remove swirls, wash marring, and oxidation while preserving as much factory paint as possible. Each panel is paint-depth-gauged before and after.",
    duration: "1 — 4 days",
    image:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1920&q=90&auto=format&fit=crop",
    tiers: [
      {
        name: "One-step",
        price: 850,
        note: "Gloss enhancement",
        inclusions: [
          "Removes light swirls and haze",
          "Restores 60 — 70% of clarity",
          "Single-pass polish, finishing wax",
          "Best for newer or daily vehicles",
        ],
      },
      {
        name: "Two-step",
        price: 1650,
        note: "Show-paint finish",
        inclusions: [
          "Removes 85 — 95% of defects",
          "Compound + polish, hand-finished panels",
          "Paint-depth gauged",
          "Pre-coating prep included",
        ],
      },
      {
        name: "Three-step",
        price: 2750,
        note: "Concours preparation",
        inclusions: [
          "Removes deep scratches and sanding marks",
          "Wet-sanding where appropriate",
          "Multi-stage refinement to near-100%",
          "Documented before/after gauging",
        ],
      },
    ],
  },
  {
    id: "interior",
    name: "Interior Deep Clean",
    tagline: "Quiet, exact.",
    description:
      "A panel-by-panel reset of every interior surface. Leathers are pH-cleaned and conditioned, fabrics are steam-extracted, and HVAC vents are flushed. Headliners receive a low-moisture clean to avoid sag.",
    duration: "1 day",
    image:
      "https://images.unsplash.com/photo-1503945438517-f65904a52ce6?w=1920&q=90&auto=format&fit=crop",
    tiers: [
      {
        name: "Refresh",
        price: 420,
        note: "Maintenance interior",
        inclusions: [
          "Vacuum, wipe-down, glass interior",
          "Leather wipe and condition",
          "Mat shampoo and dressing",
        ],
      },
      {
        name: "Restoration",
        price: 780,
        note: "Full interior reset",
        inclusions: [
          "Steam extraction on fabrics and carpets",
          "Leather pH-balanced clean and condition",
          "Headliner low-moisture clean",
          "HVAC vent decontamination and ozone",
        ],
      },
    ],
  },
  {
    id: "ppf",
    name: "Paint Protection Film",
    tagline: "Invisible. Permanent.",
    description:
      "A precision-cut self-healing urethane film applied to the panels most exposed to road damage. Edges are wrapped where possible. We use only XPEL Ultimate Plus and STEK Dynoshield films.",
    duration: "2 — 5 days",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=90&auto=format&fit=crop",
    tiers: [
      {
        name: "Track Pack",
        price: 1450,
        note: "High-impact areas",
        inclusions: [
          "Partial hood, full fenders",
          "Front bumper, mirror caps",
          "Headlight covers",
          "Ten-year film warranty",
        ],
      },
      {
        name: "Full Front",
        price: 3250,
        note: "Most requested",
        inclusions: [
          "Full hood, full fenders, full bumper",
          "Mirror caps, headlights, A-pillars",
          "Door cups and door edges",
          "Ten-year film warranty",
        ],
      },
      {
        name: "Full Body",
        price: 7800,
        note: "Total coverage",
        inclusions: [
          "Every painted exterior panel",
          "Edges wrapped where possible",
          "Optional satin or gloss finish",
          "Twelve-year film warranty",
        ],
      },
    ],
  },
  {
    id: "engine",
    name: "Engine Bay Detail",
    tagline: "Concours-ready.",
    description:
      "A controlled, low-pressure clean of the engine bay. All electronics are masked, surfaces are degreased and steamed, and rubber, plastics, and aluminum are dressed to a natural satin finish — never shiny.",
    duration: "Half day",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&q=90&auto=format&fit=crop",
    tiers: [
      {
        name: "Bay Detail",
        price: 320,
        note: "Standard service",
        inclusions: [
          "Electronic masking and protection",
          "Degrease, steam, and rinse",
          "Aluminum polish where appropriate",
          "Plastic, rubber, and hose dressing",
        ],
      },
    ],
  },
  {
    id: "headlights",
    name: "Headlight Restoration",
    tagline: "Optical clarity.",
    description:
      "A multi-grit wet-sand followed by machine polish and a fresh UV-stable clearcoat. The lens is returned to factory transmission, not just surface-shined.",
    duration: "2 — 4 hours",
    image:
      "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=1920&q=90&auto=format&fit=crop",
    tiers: [
      {
        name: "Restoration",
        price: 240,
        note: "Per pair",
        inclusions: [
          "Multi-grit wet-sand",
          "Machine polish and refinement",
          "UV-stable clearcoat applied",
          "Two-year clarity warranty",
        ],
      },
    ],
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Ceramic" | "Correction" | "PPF" | "Interior";
  vehicle: string;
  before: string;
  after: string;
  thumbnail: string;
}

export const gallery: GalleryItem[] = [
  {
    id: "porsche-992",
    title: "Porsche 992 Turbo S",
    category: "Ceramic",
    vehicle: "Atelier coating, two-step correction",
    before:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "g-wagon",
    title: "Mercedes-AMG G63",
    category: "PPF",
    vehicle: "Full front, satin finish",
    before:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "f8",
    title: "Ferrari F8 Tributo",
    category: "Correction",
    vehicle: "Three-step concours preparation",
    before:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "rolls",
    title: "Rolls-Royce Cullinan",
    category: "Interior",
    vehicle: "Full interior restoration",
    before:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "r8",
    title: "Audi R8 V10",
    category: "Ceramic",
    vehicle: "Reserve coating, graphene topcoat",
    before:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "911gt3",
    title: "Porsche 911 GT3 RS",
    category: "PPF",
    vehicle: "Full body, gloss finish",
    before:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "lambo",
    title: "Lamborghini Huracán",
    category: "Correction",
    vehicle: "Two-step paint refinement",
    before:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "bentley",
    title: "Bentley Continental GT",
    category: "Ceramic",
    vehicle: "Atelier coating with glass",
    before:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=85&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1600&q=85&auto=format&fit=crop",
    thumbnail:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200&q=85&auto=format&fit=crop",
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  vehicle: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "I have used three different shops in the city over the last decade. None compare. The paint looks deeper than the day I took delivery, and they explained every step of what they were doing and why.",
    name: "Daniel R.",
    vehicle: "Porsche 992 GT3",
  },
  {
    id: "t2",
    quote:
      "NOIR treats the car as a piece of work, not a job ticket. The PPF edges are seamless — I genuinely cannot see them. Worth every cent.",
    name: "Catherine L.",
    vehicle: "Mercedes-AMG GT",
  },
  {
    id: "t3",
    quote:
      "Three of my collection cars live here for their annual service. The maintenance program is the reason my paint still gauges within spec after five years.",
    name: "Markus T.",
    vehicle: "Private collection",
  },
];

export interface Brand {
  name: string;
}

export const brandStrip: Brand[] = [
  { name: "Porsche" },
  { name: "Aston Martin" },
  { name: "Ferrari" },
  { name: "Lamborghini" },
  { name: "Bentley" },
  { name: "Rolls-Royce" },
  { name: "McLaren" },
  { name: "Mercedes-AMG" },
  { name: "Audi Sport" },
  { name: "BMW M" },
];

export const studio = {
  brandName: "NOIR",
  brandSuffix: "Detailing House",
  tagline: "A private atelier for ceramic, correction, and protection film.",
  address: "1408 Stockton Avenue, Suite 200",
  city: "San Jose, CA 95126",
  phone: "+1 (404) 555-0182",
  email: "atelier@noirdetailinghouse.com",
  hours: [
    { day: "Monday — Friday", time: "By appointment, 9 — 6" },
    { day: "Saturday", time: "By appointment, 10 — 4" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    instagram: "noir.detailing",
    youtube: "@noirdetailing",
  },};
