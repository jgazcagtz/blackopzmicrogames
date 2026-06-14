# BlackOpz MicroGames Design System

## Stack
- The app is a minimal Vite vanilla project. Important game, FAQ, and SEO content stays static in `index.html`; `src/main.js` only enhances the page after load.
- Runtime dependencies are intentionally lightweight: Geist for self-hosted typography, Lucide for SVG icons, Motion for transform/opacity animation, Lenis for smooth scrolling, and modern-normalize for browser consistency.
- The AdSense script is intentionally absent from the page for performance. The root `ads.txt` file remains unchanged, and `public/ads.txt` preserves the same metadata in Vite builds.

## Palette
- Light mode starts from clean paper and graphite neutrals.
- Dark mode uses deep neutral surfaces with the same semantic tokens.
- Teal/mint is the primary command accent, with lime, coral, and gold reserved for positive action, donation, and lightweight celebration states.

## Typography, Spacing, Radius
- Geist Sans is the primary UI face and Geist Mono is used for compact labels, stats, and arcade-like metadata.
- Type sizes are tokenized and adjusted with media queries instead of viewport-scaling formulas.
- Spacing follows a compact 4px-based scale. Repeated game cards keep an 8px radius for the precise launcher aesthetic.

## Components
- Game cards are semantic external links with a Lucide icon, category, title, description, and launch affordance. Destination URLs are unchanged.
- The first-visit welcome message is a non-blocking sheet, remembered with `blackopz-welcome-dismissed`.
- Theme and language preferences use `blackopz-theme` and `blackopz-lang`.
- Toasts provide lightweight feedback for preference changes, first-visit dismissal, and game launch intent.

## Motion, Rendering, Accessibility
- Enhanced motion uses transform and opacity only, with Motion handling entrances, sheet transitions, toast movement, and small bursts.
- Lenis is enabled only when the visitor has not requested reduced motion.
- `prefers-reduced-motion` disables enhanced motion and smooth scroll while keeping all content visible.
- The page includes semantic landmarks, a skip link, keyboard-operable controls, focus rings, accessible labels, and decorative icons marked as hidden.
