# BlackOpz MicroGames Design System

## Palette
- The app uses semantic CSS tokens, with light mode as the base and dark mode applied through `data-theme="dark"` or the visitor's OS preference.
- Core surfaces are neutral graphite and clean paper tones, balanced with teal, lime, coral, and gold accents for the arcade-command feel.
- Interactive focus uses a high-contrast teal ring, while donation and success moments use gold/coral/lime accents for warmth.

## Spacing, Radius, Shadows, Type
- Spacing follows a compact 4px-based scale from `--space-1` through `--space-16`.
- Radius tokens run from 4px to 16px, with game cards capped at 8px for a precise launcher aesthetic.
- Shadows progress from subtle elevation to a controlled glow used only on premium interactive states.
- The required `Zen Dots` font is preserved everywhere. Type sizes are tokenized and adjusted with media queries instead of viewport-scaling formulas.

## Components
- Buttons and icon buttons share one interaction model: clear focus rings, hover lift, pressed scale, disabled-ready states, and consistent SVG icons.
- Game cards are semantic external links with icon, label, description, and launch affordance. The exact destination URLs are unchanged.
- The welcome modal uses accessible dialog semantics, focus trapping, Escape/backdrop dismissal, and restored focus after closing.
- Toasts provide lightweight feedback for theme changes, language changes, modal start, and game launches.

## Motion and Accessibility
- Motion is limited to transform and opacity for smooth rendering: marquee notice, card entrances, modal transitions, button feedback, and small success bursts.
- `prefers-reduced-motion` disables marquee, entrance transitions, and bursts for users who request less motion.
- The page includes a skip link, semantic landmarks, ARIA labels, keyboard-operable controls, and no emoji characters in the UI.
