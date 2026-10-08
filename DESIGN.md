# DESIGN.md

A complete design system for this portfolio. Hand this file to any AI model or designer and they can extend the site so that new work is indistinguishable from the existing work. Read all of it before changing anything.

## 0. Hard rules (never break)

1. Light mode only. No dark backgrounds, no dark themes, no `prefers-color-scheme: dark`. The page background is always a warm off-white. Saturated color blocks (cobalt, lime, peach) are allowed, near-black full-page backgrounds are not.
2. No em dashes or en dashes anywhere (copy, code strings, comments). Use commas, colons, periods or the word "to".
3. No emojis anywhere. Use inline SVG for icons and glyphs.
4. Privacy: never publish location, address, family details, phone numbers, security details, or private project subdomains. The only public link is GitHub.
5. Do not brag with numbers. No module counts, lines of code, clone counts, view counts, streaks or "x times faster" claims. State what a thing is and does. Real recognition (a rank, a prize) may appear once, plainly, in the Record section.
6. Honest claims. Anything unverified, unpublished or experimental is labeled as such on the Context section or as a caveat on the project page. AI assistance is acknowledged. Work built on others (for example PCAM research) is clearly separated from original work.
7. No horizontal scroll sections. Vertical scroll only.
8. Do not add unnecessary details (languages, hardware spec sheets, hobbies, inventories).

## 1. Concept

An independent builder working across AI x Mathematics x Systems x Hardware x Autonomy. The site feels like a bright, playful, expensive editorial studio piece: giant confident typography, pastel fluid light, saturated color blocks, and physical, tactile interaction (things that spring, tilt, pull toward the cursor and can be dragged). Serious content, joyful surface.

Voice: plain, curious, humble, specific. Short sentences. Verbs over adjectives.

## 2. Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `--bg` | `#f3f2ee` | Page background |
| `--ink` | `#0d0d12` | Text, borders, shadows, icons |
| `--ink2` | `#4b4b57` | Secondary text |
| `--cobalt` | `#2f3bff` | Primary accent, kickers, cursor, progress bar, finale panel |
| `--lime` | `#d3ff45` | Highlight, menu overlay, hover fills, stickers, buttons on cobalt |
| `--peach` | `#ffb89a` | Card/tile color |
| `--lilac` | `#cbc2ff` | Card/tile color |
| sky | `#b4dbff` | Card/tile color |
| butter | `#ffe27a` | Card/tile color |
| mint | `#b8f0d0` | Card/tile color |
| pink | `#ffc2e0` | Card/tile color |
| orange | `#ff5a36` | Rare spark color (a few particles only) |

Project colors are fixed per project in `palette` in `src/sections.jsx`. Text on a colored block is `--ink`, except on cobalt where it is white.

Borders are always `1.5px solid var(--ink)`. Offset hard shadows (`3px 3px 0 var(--ink)`) are used on stickers only. Soft shadows are used under floating previews only.

### Typography
- Display and body: **Bricolage Grotesque** (variable: `wght` 200 to 800, `wdth` 75 to 100, `opsz` 12 to 96). Loaded from Google Fonts.
- Mono labels: **JetBrains Mono**, 12px, uppercase, `letter-spacing: .1em`, class `.mono`.
- Display headlines: weight 700 to 800, `letter-spacing: -.04em` to `-.06em`, `line-height: .85` to `.95`, sizes via `clamp()` (section titles `clamp(38px,7vw,110px)`, project names up to `172px`, hero is canvas-sized to fill the width).
- Body: 18px, line-height 1.55. Ledes: `clamp(20px,2vw,28px)`, weight 500, line-height 1.3.
- Variable font as motion: on hover, headings change `wght` up and `wdth` down (see `.index li.act h3`).

### Spacing and shape
- Page gutter: `3.5vw` (panels: `1.8vw`).
- Section vertical rhythm: `14vh` to `18vh` top padding.
- Radii: pills and buttons `99px`, tiles and cards `26px` to `34px`, big panels `36px` to `48px`.
- Chips: mono 12px, `1.5px` currentColor border, pill radius.

## 3. Background and atmosphere

- `src/Fluid.jsx`: a full-screen fixed WebGL fragment shader (react-three-fiber) producing a soft domain-warped pastel field of off-white, lilac, peach, sky and a touch of lime. It follows the pointer (smoothed) and drifts with scroll. Always light, always low contrast so text stays readable.
- A fixed film grain overlay (`.grain`, multiply blend, 25 percent opacity) sits above the shader.
- Content is in `main` with `z-index: 2`.

## 4. Layout of the home page (top to bottom)

1. **Header**: fixed. Left pill wordmark with a pulsing lime dot. Right ink pill "Menu" that opens a full-screen lime overlay (circle clip-path reveal from the button) with giant numbered links.
2. **Hero**: the name is made of thousands of springy dots (`ParticleText`). Dots flee the pointer, burst on click, and fly in on load. The dots form an animated halftone: sizes pulse in a travelling wave, they wobble at rest, and they swirl away from the pointer. Color is a gradient across the name (ink to cobalt to violet to orange). In the empty area beside "A.S." sit: a rolling "currently building" word ticker, five draggable color stickers (AI, Mathematics, Systems, Hardware, Autonomy) that drop in with spring physics, and a rotating lime circular text badge. A live x/y cursor readout appears top right. An invisible `h1.sr` carries the accessible name.
3. **Statement**: a large paragraph whose words fade up as you scroll (`ScrollWords`). Key phrases marked with asterisks turn cobalt.
4. **Work (project index)**: a typographic index, not a card grid. Each project is one giant row: index number, name at up to 172px, role plus status pill, and an arrow circle. Hovering a row fills it with that project's color from the bottom, narrows and shifts the name, dims all other rows to 25 percent, and shows a floating preview card (project color plus its animated emblem) that chases the cursor with eased motion and tilts with cursor velocity. Click opens the project page. On touch devices the preview is hidden and rows stack.
5. **Disciplines**: five large accordion rows (hover or tap to expand, lime fill when open) listing the topics under each discipline, followed by an 8 step method grid.
6. **Workshop**: a bento grid of colored tiles that tilt in 3D toward the pointer.
7. **Record**: three columns of plain rows; a row turns cobalt with white text on hover.
8. **Context**: four honest notes in white translucent cards.
9. **Finale (Contact)**: a rounded cobalt panel. "SAY HELLO." is rendered as dots again (lime and white) that react to the pointer. A short invitation, two magnetic circular buttons (GitHub in lime, Back to top as an outline), an outlined text marquee of interest words, and a single footer line.

Project pages (`/project/:id`): a large rounded color header in the project's color with the name animating in letter by letter and the emblem at right, a two column body (summary, problem, architecture, evidence, context note on the left; sticky key points and tech chips on the right), and a full-width "Next project" block in the next project's color.

## 5. Motion principles

- Everything uses easing `cubic-bezier(.2,.8,.2,1)` (out) or `cubic-bezier(.76,0,.24,1)` (in-out for wipes and clip paths).
- Entrances: rise and fade (`y: 40`, 0.9s) via the `Reveal` component. Never scale from 0.
- Springs for toys: stickers use `type: 'spring', stiffness: 160, damping: 11`.
- Physics for dots: spring toward home `0.055`, damping `0.85`, pointer repulsion radius about `0.45 x font size`, click impulse within `3 x radius`.
- Cursor: a small cobalt dot that eases (`0.18`). It grows into a ring over links and into a labeled lime disc over elements with `data-cursor="Label"`.
- Magnetic buttons: translate toward the pointer by 30 to 50 percent of the offset, release on leave.
- Page transitions: lime wipe slides up, the page fades. A cobalt scroll progress bar sits at the very top.
- Smooth scroll via Lenis (exposed as `window.__lenis` for anchor navigation).
- Respect `prefers-reduced-motion` (animations and transitions disabled).
- Pause expensive canvases when offscreen (`ParticleText` skips frames when out of view).

## 6. Per project emblems

`src/Motif.jsx` draws one animated SVG emblem per project from simple geometry in ink, white and transparency. They must stay abstract, 400 by 400 viewBox, 2px strokes, round caps, no text. Existing metaphors:
- POLARIS: concentric rings, a spinning eight point star, orbiting beads
- SENTINEL: radar sweep with blinking blips
- ANDROMEDA: three branches merging into one node
- NEBULA: drifting dot cloud
- ZENITH: self drawing spiral around a fixed core
- GARGANTUA: a core with five counter-rotating orbits
- INDRA: a chain of six nodes with a flowing dashed line
- CHIMERA: a branching tree that draws itself
- NEURAL COMPILER: a grid of squares pulsing in size
- UntitledOS: a terminal window with typed lines and a blinking cursor

To add a project: add its entry in `src/data.js`, add its id to `order` and a color pair to `palette` in `src/sections.jsx`, and add a new emblem branch in `Motif.jsx`.

## 7. Content model (`src/data.js`)

Each project has: `id`, `name`, `status`, `role`, `summary`, `facts[]`, `tech[]`, optional `problem`, `architecture`, `evidence`, and an optional `caveat` (used to flag unpublished or experimental claims). Also `disciplines`, `method`, `workshop`, `record`, `notes` and `github`. Keep all copy in this file so design and content stay separate. No project may include a URL unless it is intentionally public.

## 8. Components and files

| File | Responsibility |
|---|---|
| `src/main.jsx` | App shell, router (HashRouter), Lenis, page wipe, Home and Project pages |
| `src/sections.jsx` | Hero, Statement, Work index, Disciplines, Workshop, Record, Context, Contact finale, color palette |
| `src/ParticleText.jsx` | Dot typography engine (canvas, font sampling, physics) |
| `src/Fluid.jsx` | Pastel fluid shader background |
| `src/Motif.jsx` | Animated project emblems |
| `src/ui.jsx` | Cursor, Progress, Header and menu, Reveal, Letters, ScrollWords, Magnetic |
| `src/styles.css` | All styles (tokens at the top, later blocks override earlier ones) |
| `src/data.js` | All content |
| `checkpoints/` | Saved earlier versions (v1, v2, v3) |

Stack: React 18, react-router-dom (hash routing), framer-motion, @react-three/fiber with three, lenis, Vite.

## 9. Recipes

**New section**: a `section` with an `id`, a `.sec-t` heading block (mono kicker in cobalt plus an `h2` at `clamp(38px,7vw,110px)`), then content in the 3.5vw gutter. Wrap items in `Reveal`.

**New card or tile**: pick a color pair from the palette, `1.5px` ink border, `28px` radius, mono label at the top, bold tight heading at the bottom, optional pointer tilt like `Tile`.

**New interactive text**: prefer `ParticleText` for one hero style phrase per page at most. Use `Letters` or `ScrollWords` elsewhere. Never animate more than one giant text effect in the same viewport.

**Buttons**: pill, `1.5px` ink border, 15px by 28px padding, weight 600. Primary is ink with white text and turns cobalt on hover. Secondary is `--bg` and turns lime on hover. Wrap in `Magnetic`.

## 10. Quality bar

- First view must read as a studio piece, not a template: giant type, one surprising interaction, one color block.
- Every interaction has a physical feel (ease, spring, tilt, magnetism). No instant snaps.
- Contrast: ink on pastel is always at least 7:1. White only on cobalt.
- Accessible names for canvas text (`aria-label` or `.sr` heading), focusable buttons, visible states, reduced-motion support.
- Check at 1440px, 1024px and 390px widths. On narrow screens: hide the badge and the cursor preview, stack rows, keep type fluid with `clamp()`.

## 11. Anti patterns

Dark mode, gradients on text, glassmorphism, stock illustration, emoji, centered hero with a gradient blob, three equal feature cards, carousels, horizontal scroll, counters that animate up to impressive numbers, "world class" or "revolutionary" language, em dashes.

## 12. Prompt for another AI

"Extend the portfolio in this repository. Read DESIGN.md fully first. Obey the hard rules in section 0. Reuse the tokens, components and motion principles. Put copy in src/data.js. After changes run `npm run build` and fix every error. Do not introduce dark backgrounds, emojis, em dashes, subdomain links, location, or numeric bragging."

