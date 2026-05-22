# NOIR Detailing House

A premium, multi-page auto detailing website built with React, TypeScript, Tailwind, shadcn/ui, and Framer Motion.

## Stack

- React 18 + Vite + TypeScript (strict)
- Tailwind CSS v3 with custom design tokens
- shadcn/ui (New York style, neutral base)
- Framer Motion with Safari progressive enhancement
- React Router v6

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Architecture

- `src/components/ui` — shadcn primitives
- `src/components/sections` — page sections (Hero, Services, etc.)
- `src/components/shared` — Nav, Footer, MotionSafe wrapper, custom cursor
- `src/pages` — Home, Services, Gallery, About, Booking, Contact
- `src/hooks` — `useMotionSupport`, `useScrollProgress`, `useMagnetic`, `useCounter`
- `src/lib` — utilities, data, animation configs
- `src/styles` — `globals.css` (tokens) + `animations.css` (CSS fallbacks)

## Safari compatibility

Motion is gated behind `useMotionSupport()`. The `<MotionSafe>` wrapper falls back to CSS keyframes on Safari <16, when `prefers-reduced-motion` is set, or when `backdrop-filter` isn't supported. All `backdrop-filter` uses include `-webkit-backdrop-filter`. `100dvh` is used with a `100vh` fallback. Transforms use `translate3d(0,0,0)` to engage hardware acceleration.
