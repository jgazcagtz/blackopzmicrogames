# BlackOpz MicroGames Design System

## Stack
- The app is a minimal Vite vanilla project. Important game, FAQ, and SEO content stays static in `index.html`; `src/main.js` only enhances the page after load.
- Runtime dependencies are intentionally lightweight: Zen Dots restores the arcade display typography, Geist supports readable body copy, Lucide provides SVG icons, Motion handles transform/opacity animation, Lenis handles smooth scrolling, and modern-normalize provides browser consistency.
- The AdSense script is intentionally absent from the page for performance. The root `ads.txt` file remains unchanged, and `public/ads.txt` preserves the same metadata in Vite builds.

## Palette
- Dark mode is the default product identity: near-black cabinet surfaces, neon cyan, hot pink, lime, and gold.
- Light mode keeps the same semantic tokens but moves to clean paper surfaces for visitors who toggle it.
- The palette should stay arcade-forward and multi-accent, not a single-hue dashboard theme.

## Typography, Spacing, Radius
- Zen Dots is the restored display/game font for the brand, headings, buttons, stats, and game titles.
- Geist Sans remains the reading face for descriptions and longer interface copy; Geist Mono is used for compact labels and metadata.
- Type sizes are tokenized and adjusted with media queries instead of viewport-scaling formulas.
- Spacing follows a compact 4px-based scale. Repeated game cards keep an 8px radius for the precise launcher aesthetic.

## Components
- Game cards are semantic external links with a real captured preview image, Lucide icon, category, title, description, and launch affordance. Destination URLs are unchanged.
- Preview assets live in `public/previews` and are screenshots from the linked game surfaces.
- The first-visit welcome message is a non-blocking sheet, remembered with `blackopz-welcome-dismissed`.
- Theme and language preferences use `blackopz-theme` and `blackopz-lang`.
- Toasts provide lightweight feedback for preference changes, first-visit dismissal, and game launch intent.

## Motion, Rendering, Accessibility
- Enhanced motion uses transform and opacity only, with Motion handling entrances, sheet transitions, toast movement, and small bursts.
- Lenis is enabled only when the visitor has not requested reduced motion.
- `prefers-reduced-motion` disables enhanced motion and smooth scroll while keeping all content visible.
- The page includes semantic landmarks, a skip link, keyboard-operable controls, focus rings, accessible labels, and decorative icons marked as hidden.
