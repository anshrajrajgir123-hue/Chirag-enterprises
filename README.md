# Vanguard Rebar & Structural Systems

A responsive React + TypeScript website for mechanical rebar couplers, structural splicing systems, and reinforcement hardware. The homepage includes a looping technical animation made from the supplied reference video frames.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

The development server starts on port 3000.

## Production build

```bash
npm run build
npm start
```

## Main project files

- `src/App.tsx` — page layout and homepage hero
- `src/index.css` — global styles and hero animation styling
- `src/components/` — reusable navigation, product, modal, and section components
- `src/data/siteData.ts` — product, company, and page content
- `public/assets/rebar-coupler-engineering.mp4` — supplied reference animation used in the homepage hero
- `public/assets/precision-rebar-couplers.png` — product image used in the About section

## Notes

The hero video is muted, loops automatically, and uses a poster image while loading. It respects reduced-motion preferences for the decorative CSS effects.
