# Cosmos — Featured Project Card (Design Spec)

## Context

The Projects section (`src/features/projects/`) currently renders a uniform
2-column grid of `ProjectCard` components from `PROJECTS` in
`src/data/projects.js`. We're adding "Cosmos" — a cinematic 3D solar-system
exploration site (React + Three.js/R3F + GSAP + Zustand + Howler.js, deployed
at https://cosmos-nine-iota.vercel.app/) — as the first **featured** project,
with a visually protagonist treatment distinct from the regular grid cards:
full-width, larger, with a hover/focus-triggered image→video swap and
ambient audio.

Reference material: a screenshot from another portfolio was provided as
*conceptual* guidance only (full-width card, hover image→video). Its palette
(orange), stat iconography, and planet indicators are explicitly **not**
reused. This feature must feel native to the existing design system: same
color tokens, same Geist + Instrument Serif heading pattern, same
Card/Tag/Button components and spacing/radius/shadow tokens already defined
in `src/styles/tokens/`.

## Assets

Already present in the repo (confirmed exact names/paths — do not assume
different casing or extensions):

- `src/assets/images/Cosmos.png`
- `src/assets/Video/Cosmos.mp4`
- `src/assets/Sound/space ambience.mp3` (note the space in the filename —
  Vite handles this fine in an ES import, no renaming needed)

The `Video`/`Sound` folder casing differs from the `video`/`sound` lowercase
naming implied by the original task description, but since Windows'
filesystem is case-insensitive and the folders/files already exist with
content in them, we import from the existing paths as-is rather than
renaming — renaming buys nothing and risks case-only-rename git weirdness.

## Data model (`src/data/projects.js`)

Add a `cosmos` entry to the `PROJECTS` array with two new fields not used by
existing entries — `video` and `audio` — plus `featured: true`:

```js
import cosmosImg from '@/assets/images/Cosmos.png';
import cosmosVideo from '@/assets/Video/Cosmos.mp4';
import cosmosAudio from '@/assets/Sound/space ambience.mp3';

{
  id: 'cosmos',
  title: 'Cosmos',
  image: cosmosImg,
  video: cosmosVideo,
  audio: cosmosAudio,
  demoUrl: 'https://cosmos-nine-iota.vercel.app/',
  githubUrl: null, // demo-only, no public repo link
  status: 'wip',
  accent: 'cyan',
  featured: true,
  tech: ['React', 'Three.js', 'React Three Fiber', 'GSAP', 'Zustand', 'Howler.js'],
}
```

Existing entries are untouched (no `featured` key on them — falsy/absent is
treated as "not featured").

## Copy (`src/i18n/translations.js`)

Under `projects.items`, add a `cosmos` key (es block and en block), matching
the existing shape (`tagline`, `description`; `highlight` omitted, same as
`fallo-del-sistema`/`ajtrucks`):

**ES**
```js
cosmos: {
  tagline: 'Viaje cinematográfico por el Sistema Solar',
  description:
    'Experiencia web inmersiva donde cada planeta transforma en tiempo real la paleta, las partículas y la iluminación de toda la interfaz. Incluye un carrusel 3D con planetas texturizados, fondo galáctico procedural con nebulosas en capas, y diseño de sonido reactivo a la interacción.',
},
```

**EN**
```js
cosmos: {
  tagline: 'A cinematic journey through the Solar System',
  description:
    "An immersive web experience where every planet reshapes the page's palette, particles, and lighting in real time. Featuring a 3D carousel of textured planets, a procedural galactic background with layered nebulae, and sound design that reacts to interaction.",
},
```

Also add, under `projects` (sibling to `eyebrow`/`viewDemo`/`code`/`status`):

- `featuredLabel`: 'Proyecto destacado' / 'Featured project'
- `playExperience`: 'Reproducir experiencia' / 'Play experience'
- `stopExperience`: 'Detener experiencia' / 'Stop experience'

No change needed to `status.wip` — it already exists ("En desarrollo" /
"In development").

## Component: `FeaturedProjectCard.jsx`

New file `src/features/projects/FeaturedProjectCard.jsx` +
`FeaturedProjectCard.module.css`. Not a variant of `ProjectCard` — the
layout, size, and interaction model are different enough that reuse would
mean prop-flag branching inside a component meant to stay simple.

**`Projects.jsx` changes**: split `PROJECTS` into the regular grid (existing
behavior, unchanged) and featured items (`PROJECTS.filter(p => p.featured)`),
rendering `FeaturedProjectCard` for each featured item below the grid
(loop-ready for more than one featured project in the future, even though
today there's exactly one).

### Visual treatment

- Full-width card, split layout: media ~58% / content ~42% on desktop
  (`≥1024px`), stacked (media on top, full width) below that — consistent
  with the grid's existing `1023px` breakpoint.
- Uses the same design tokens as `ProjectCard` (`--color-bg-secondary`,
  `--color-border`, `--radius-lg`, `--space-*`, `--card-accent` via
  `getAccentVar('cyan')`) but larger type scale and padding
  (`--text-2xl`/`--space-8`+) to read as protagonist, not just "big
  ProjectCard".
- Title "Cosmos" rendered with the `font-serif` utility class (Instrument
  Serif) — same pattern as the site's heading-accent word treatment, applied
  here to the card's own single-word title since a featured card doesn't
  have a pre/accent/post heading structure like section headings do.
- Tagline colored with `--card-accent` (cyan), same as `ProjectCard`.
- Tech tags via the existing `Tag` component, `tone="cyan"`.
- Status badge reuses the existing `.status`/`.statusDot` pattern (shows
  "WIP" state).
- `featuredLabel` eyebrow above the title.
- CTA is the shared `Button` component (`variant="primary"`, `magnetic`)
  linking to `demoUrl`, instead of the small icon+text link `ProjectCard`
  uses for demo/code — reinforces the "protagonist" feel. No code link
  (no `githubUrl`).

### Image → video hover/focus swap

Both `<img>` and `<video muted loop playsInline preload="none">` are always
mounted, stacked absolutely inside the media wrapper, cross-faded via CSS
`opacity` transition (the project's global `.reduce-motion` rule already
collapses all `transition-duration`s to ~0 when reduced motion is active, so
no extra CSS is needed for that case).

State model:

```js
const isPlaying = manuallyPlaying || (!reducedMotion && (hovering || focused));
```

- `hovering` — set by `onMouseEnter`/`onMouseLeave` on the media wrapper.
- `focused` — set by `onFocus`/`onBlur` on the media wrapper (React's
  synthetic focus events bubble, so focusing any descendant — the toggle
  button or the CTA link — counts).
- `manuallyPlaying` — toggled by the explicit control (see below),
  independent of hover/focus, always available regardless of
  `reducedMotion`.

An effect watches `isPlaying` and:
- `true` → `videoRef.current.play().catch(() => {})`, start the audio
  fade-in.
- `false` → `videoRef.current.pause()` (paused, not just visually hidden —
  stops CPU/battery drain), start the audio fade-out (which pauses the
  audio once volume reaches 0).

### Ambient audio

Plain `<audio preload="none" loop>` element (no extra dependency needed —
Howler.js is Cosmos's *internal* stack, not something this portfolio needs
to add). A `requestAnimationFrame`-driven ramp adjusts `audio.volume`:
0 → 0.4 over ~350ms on activate, 0.4 → 0 over ~300ms on deactivate, then
`.pause()`. Any in-flight ramp is cancelled via ref-tracked
`cancelAnimationFrame` when the target flips mid-fade (fast hover in/out).
`audio.play()`'s rejected promise (autoplay policy) is caught and swallowed
— never surfaced as an error.

### Accessibility control (merged design)

One real `<button>` in a corner of the media area — this is both the
"icon + real text" ambient indicator the task described AND the explicit
manual trigger for keyboard/screen-reader users, merged into a single
control per user approval (avoids two overlapping, partially-redundant
pieces of UI):

- Idle (`!isPlaying`): `VolumeX` icon + "Reproducir experiencia" / "Play
  experience", `aria-pressed="false"`.
- Active (`isPlaying`): `Volume2` icon + "Detener experiencia" / "Stop
  experience", `aria-pressed="true"`.
- `onClick` toggles `manuallyPlaying`.
- Being a real, always-visible, focusable button, it satisfies: (a) never
  hover-only, (b) works under `reducedMotion` (the only way to trigger video
  in that mode), (c) screen-reader/no-hover users get an explicit, labeled
  way to start the experience.
- Icons verified present in the installed `lucide-react@^1.24.0`
  (`Volume2`, `VolumeX`).

### Error handling

- `video.play()` / `audio.play()` promise rejections (autoplay policy) are
  caught and silently ignored — expected, not a bug, never shown to the
  user.
- No other failure modes: `<img>` has normal browser fallback behavior;
  no network requests beyond the already-bundled static assets.

## Testing

No test runner is configured in this project (`npm test` is a stub script).
Verification is manual via the dev server:

1. Hover the featured card → video replaces image, audio fades in; mouse
   leave → image returns, video pauses, audio fades out.
2. Tab through the card with keyboard only → focus reaches the toggle
   button and CTA; focusing either triggers the same swap as hover.
3. Click the toggle button with no hover/focus → experience starts/stops
   independently.
4. Enable "reduced motion" in the site's existing accessibility panel →
   hovering/focusing no longer triggers the video; only the explicit
   toggle button does.
5. Resize to mobile width → media stacks above content, layout doesn't
   break.
6. Confirm no video/audio network request fires on initial page load
   (only on first interaction) — check the Network tab.

## Out of scope

- No changes to `ProjectCard.jsx` or the regular grid's behavior.
- No new dependencies (Howler.js is not added — plain `<audio>` covers a
  single looping ambient track).
- No Web Audio API `GainNode` — a `requestAnimationFrame` volume ramp is
  simpler and sufficient for one audio element.
- Renaming `src/assets/Video`/`src/assets/Sound` to lowercase is skipped
  (see Assets section).
