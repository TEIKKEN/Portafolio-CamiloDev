# Cosmos Featured Project Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "Cosmos" as a full-width, visually protagonist featured project card in the Projects section, with a hover/focus-triggered image→video swap and ambient audio, fully keyboard- and reduced-motion-accessible.

**Architecture:** A new `featured: true` field on `PROJECTS` entries (`src/data/projects.js`) drives a split in `Projects.jsx`: the regular grid renders non-featured projects through the existing `ProjectCard`; a new `FeaturedProjectCard` component renders featured ones below it. `FeaturedProjectCard` owns its own interaction state (`hovering`, `focused`, `manuallyPlaying`) that together compute a single `isPlaying` boolean driving both the image→video cross-fade and an ambient audio fade via `requestAnimationFrame`.

**Tech Stack:** React 19, plain `<video>`/`<audio>` elements (no new dependencies), CSS Modules using the project's existing design tokens, `lucide-react` (`Volume2`, `VolumeX`), existing `Tag`/`Button`/`Icon` UI components.

## Global Constraints

- No new npm dependencies — no Howler.js, no Web Audio API `GainNode`. Plain `<audio>` + `requestAnimationFrame` volume ramp only.
- `<video>` attributes: `muted loop playsInline preload="none"` — never precache the video for all visitors.
- Audio must never autoplay without user interaction (hover, focus, or click all count as interaction).
- Hover/focus must NEVER be the *only* way to trigger the video: a real, always-visible, focusable `<button>` must also trigger it.
- When `reducedMotion` (from `useAccessibility()` in `src/app/context/AccessibilityContext.jsx`) is true, hover/focus must NOT trigger the video — only the explicit button may.
- `video.play()` / `audio.play()` promise rejections must be caught and silently swallowed — never surfaced as errors.
- All copy lives in `src/i18n/translations.js` (es + en) — never hardcode strings in the component.
- Use only existing design tokens (`src/styles/tokens/*.css`) — no new colors, no new font families. Accent color is `cyan` (`--color-ice-cyan`, `accent: 'cyan'` in data, resolved via `getAccentVar` from `src/utils/accent.js`).
- Card title "Cosmos" renders via the existing `font-serif` utility class (`src/styles/base/global.css`), same pattern as other section headings' accent word.
- lucide-react is pinned at `^1.24.0`; `Volume2` and `VolumeX` are confirmed present (`node_modules/lucide-react/dist/esm/icons/volume-2.mjs`, `volume-x.mjs`).
- No emoji anywhere — icons only via `lucide-react`.
- Assets already exist at these exact paths — do not rename or assume different extensions: `src/assets/images/Cosmos.png`, `src/assets/Video/Cosmos.mp4`, `src/assets/Sound/space ambience.mp3`.
- No automated test runner is configured (`npm test` is a stub). Verification is `npm run build` (catches import/syntax errors) plus manual checks against `npm run dev`.

---

### Task 1: Add Cosmos to project data

**Files:**
- Modify: `src/data/projects.js`

**Interfaces:**
- Produces: a `PROJECTS` entry with `id: 'cosmos'`, `featured: true`, `video` and `audio` fields (new — no other entry has these), consumed by Task 3's `FeaturedProjectCard`.

- [ ] **Step 1: Add the new imports and the `cosmos` entry**

Current file (`src/data/projects.js`) starts with four image imports and exports `PROJECTS`. Add three new imports after the existing ones, and append a new object to the `PROJECTS` array:

```js
import ajtrucksImg from '@/assets/images/AJTRUCKS.png';
import brutalcalcImg from '@/assets/images/BrutalCalc.png';
import fallosistemaImg from '@/assets/images/Fallodelsistema.png';
import inclusiaImg from '@/assets/images/Inclusiaweb.png';
import cosmosImg from '@/assets/images/Cosmos.png';
import cosmosVideo from '@/assets/Video/Cosmos.mp4';
import cosmosAudio from '@/assets/Sound/space ambience.mp3';

export const PROJECTS = [
  {
    id: 'inclusia',
    title: 'Inclusia',
    image: inclusiaImg,
    demoUrl: 'https://teikken.github.io/Inclusia/index.html',
    githubUrl: 'https://github.com/TEIKKEN/Inclusia',
    status: 'live',
    accent: 'mint',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'brutalcalc',
    title: 'BrutalCalc',
    image: brutalcalcImg,
    demoUrl: 'https://brutal-calc-edmm.vercel.app/',
    githubUrl: 'https://github.com/TEIKKEN/BrutalCalc',
    status: 'live',
    accent: 'cyan',
    tech: ['React', 'Vite', 'CSS', 'React Context API'],
  },
  {
    id: 'fallo-del-sistema',
    title: 'Fallo del Sistema',
    image: fallosistemaImg,
    demoUrl: 'https://fallo-del-sistema.vercel.app/',
    githubUrl: 'https://github.com/TEIKKEN/Fallo-del-sistema',
    status: 'live',
    accent: 'coral',
    tech: ['React', 'Vite', 'CSS', 'Framer Motion'],
  },
  {
    id: 'ajtrucks',
    title: 'AJ Trucks',
    image: ajtrucksImg,
    demoUrl: 'https://gestion-de-flota-de-camiones.vercel.app/',
    githubUrl: 'https://github.com/TEIKKEN/Gestion-de-flota-de-camiones',
    status: 'live',
    accent: 'amber',
    tech: ['React', 'Vite', 'CSS', 'JavaScript'],
  },
  {
    id: 'cosmos',
    title: 'Cosmos',
    image: cosmosImg,
    video: cosmosVideo,
    audio: cosmosAudio,
    demoUrl: 'https://cosmos-nine-iota.vercel.app/',
    githubUrl: null,
    status: 'wip',
    accent: 'cyan',
    featured: true,
    tech: ['React', 'Three.js', 'React Three Fiber', 'GSAP', 'Zustand', 'Howler.js'],
  },
];
```

- [ ] **Step 2: Verify the build resolves the new asset imports**

Run: `npm run build`
Expected: build succeeds with no "failed to resolve import" errors for `Cosmos.png`, `Cosmos.mp4`, or `space ambience.mp3`. (Cosmos will temporarily render as a plain grid card via the existing `ProjectCard` — that's expected until Task 3 splits it out.)

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.js
git commit -m "feat(projects): add Cosmos featured project data"
```

---

### Task 2: Add Cosmos copy and featured-card strings to i18n

**Files:**
- Modify: `src/i18n/translations.js`

**Interfaces:**
- Produces: `t.projects.items.cosmos.{tagline,description}`, `t.projects.featuredLabel`, `t.projects.playExperience`, `t.projects.stopExperience` (es + en), consumed by Task 3.

- [ ] **Step 1: Add the `cosmos` item and new labels to the ES block**

In the `es` translations object, the `projects` section currently reads (around line 42):

```js
    projects: {
      eyebrow: 'Selected Work',
      headingPre: 'Proyectos que ',
      headingAccent: 'cuentan',
      headingPost: ' una historia',
      viewDemo: 'Ver demo',
      code: 'Código',
      status: { live: 'En producción', wip: 'En desarrollo' },
      items: {
        inclusia: { ... },
        brutalcalc: { ... },
        'fallo-del-sistema': { ... },
        ajtrucks: { ... },
      },
    },
```

Change it to add `featuredLabel`/`playExperience`/`stopExperience` after `status`, and add the `cosmos` item after `ajtrucks`:

```js
    projects: {
      eyebrow: 'Selected Work',
      headingPre: 'Proyectos que ',
      headingAccent: 'cuentan',
      headingPost: ' una historia',
      viewDemo: 'Ver demo',
      code: 'Código',
      status: { live: 'En producción', wip: 'En desarrollo' },
      featuredLabel: 'Proyecto destacado',
      playExperience: 'Reproducir experiencia',
      stopExperience: 'Detener experiencia',
      items: {
        inclusia: {
          tagline: 'Landing page institucional — 100% accesible',
          description:
            'Sitio para una organización que trabaja por la inclusión y la accesibilidad de personas con discapacidad física en Colombia. Convierte experiencias reales en evidencia, campañas y alianzas para impulsar entornos más dignos.',
          highlight: 'Accesibilidad total',
        },
        brutalcalc: {
          tagline: 'Beautiful by design. Accessible by default.',
          description:
            'Calculadora con estética Neo Brutalist que integra accesibilidad desde el diseño: modos de contraste, tipografía amigable para dislexia, soporte para lectores de pantalla, navegación completa por teclado y un simulador de barreras.',
          highlight: 'Mejor accesibilidad',
        },
        'fallo-del-sistema': {
          tagline: 'Narrativa inmersiva sobre accesibilidad',
          description:
            'Experiencia web interactiva que expone los desafíos de accesibilidad e inclusión en América Latina mediante una narrativa inmersiva inspirada en interfaces de auditoría digital y visualización de sistemas.',
        },
        ajtrucks: {
          tagline: 'Fleet Management',
          description:
            'Aplicación web para la gestión de ingresos, gastos y operaciones de una flota de camiones. Permite registrar movimientos financieros, organizar categorías y obtener una visión clara del estado económico del negocio.',
        },
        cosmos: {
          tagline: 'Viaje cinematográfico por el Sistema Solar',
          description:
            'Experiencia web inmersiva donde cada planeta transforma en tiempo real la paleta, las partículas y la iluminación de toda la interfaz. Incluye un carrusel 3D con planetas texturizados, fondo galáctico procedural con nebulosas en capas, y diseño de sonido reactivo a la interacción.',
        },
      },
    },
```

- [ ] **Step 2: Add the matching `cosmos` item and new labels to the EN block**

The `en` translations object's `projects` section (around line 374) mirrors the ES one. Apply the same change:

```js
    projects: {
      eyebrow: 'Selected Work',
      headingPre: 'Projects that ',
      headingAccent: 'tell',
      headingPost: ' a story',
      viewDemo: 'View demo',
      code: 'Code',
      status: { live: 'Live', wip: 'In progress' },
      featuredLabel: 'Featured project',
      playExperience: 'Play experience',
      stopExperience: 'Stop experience',
      items: {
        inclusia: {
          tagline: 'Institutional landing page — fully accessible',
          description:
            'Site for a nonprofit working toward inclusion and accessibility for people with physical disabilities in Colombia. Turns real experiences into evidence, campaigns, and partnerships that push for more dignified environments.',
          highlight: 'Full accessibility',
        },
        brutalcalc: {
          tagline: 'Beautiful by design. Accessible by default.',
          description:
            'A Neo Brutalist calculator with accessibility built into the design: contrast modes, dyslexia-friendly typography, screen reader support, full keyboard navigation, and a barrier simulator.',
          highlight: 'Best-in-class accessibility',
        },
        'fallo-del-sistema': {
          tagline: 'An immersive narrative on accessibility',
          description:
            'An interactive web experience exposing accessibility and inclusion challenges across Latin America through an immersive narrative inspired by digital audit interfaces and system visualization.',
        },
        ajtrucks: {
          tagline: 'Fleet Management',
          description:
            "A web app for managing income, expenses, and operations for a truck fleet. Lets users log financial movements, organize categories, and get a clear view of the business's financial health.",
        },
        cosmos: {
          tagline: 'A cinematic journey through the Solar System',
          description:
            "An immersive web experience where every planet reshapes the page's palette, particles, and lighting in real time. Featuring a 3D carousel of textured planets, a procedural galactic background with layered nebulae, and sound design that reacts to interaction.",
        },
      },
    },
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: build succeeds (translations.js has no syntax errors — this is a plain object literal, so a missing comma would throw immediately).

- [ ] **Step 4: Commit**

```bash
git add src/i18n/translations.js
git commit -m "feat(i18n): add Cosmos copy and featured-card strings"
```

---

### Task 3: Static `FeaturedProjectCard` skeleton wired into `Projects.jsx`

**Files:**
- Create: `src/features/projects/FeaturedProjectCard.jsx`
- Create: `src/features/projects/FeaturedProjectCard.module.css`
- Modify: `src/features/projects/Projects.jsx`

**Interfaces:**
- Consumes: `PROJECTS` entries from Task 1 (`id, title, image, demoUrl, tech, status, accent, featured`), `t.projects.items[id].{tagline,description}`, `t.projects.{featuredLabel,viewDemo,status}` from Task 2, `getAccentVar(accent)` from `src/utils/accent.js`, `Tag` (`src/components/ui/Tag/Tag.jsx`, props `tone`), `Button` (`src/components/ui/Button/Button.jsx`, props `variant`, `as`, `magnetic`).
- Produces: default-exported `FeaturedProjectCard({ project })` component and its `.card`/`.media`/`.image`/`.body`/`.eyebrow`/`.headerRow`/`.title`/`.status`/`.statusDot`/`.tagline`/`.description`/`.tags`/`.cta` CSS classes, which Task 4 and Task 5 will extend (adding `.video`, `.audioToggle` and their states) without renaming any of these.

This task intentionally ships **image-only** — no `<video>`, no `<audio>`, no toggle button yet. Those land in Task 4 and Task 5 so each task stays independently reviewable.

- [ ] **Step 1: Write `FeaturedProjectCard.jsx`**

```jsx
import { memo } from 'react';
import Tag from '@/components/ui/Tag/Tag';
import Button from '@/components/ui/Button/Button';
import { getAccentVar } from '@/utils/accent';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './FeaturedProjectCard.module.css';

const FeaturedProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const { id, title, image, demoUrl, tech, status, accent } = project;
  const copy = t.projects.items[id];

  return (
    <article className={styles.card} style={{ '--card-accent': getAccentVar(accent) }}>
      <div className={styles.media}>
        <img
          src={image}
          alt={`${title} — ${copy.tagline}`}
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        <span className={styles.eyebrow}>{t.projects.featuredLabel}</span>

        <div className={styles.headerRow}>
          <h3 className={styles.title}>
            <span className="font-serif">{title}</span>
          </h3>
          <span className={styles.status} data-status={status}>
            <span className={styles.statusDot} />
            {t.projects.status[status] ?? status}
          </span>
        </div>

        <p className={styles.tagline}>{copy.tagline}</p>
        <p className={styles.description}>{copy.description}</p>

        {tech.length > 0 && (
          <div className={styles.tags}>
            {tech.map((item) => (
              <Tag key={item} tone={accent}>
                {item}
              </Tag>
            ))}
          </div>
        )}

        <Button
          as="a"
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          magnetic
          className={styles.cta}
        >
          {t.projects.viewDemo}
        </Button>
      </div>
    </article>
  );
};

export default memo(FeaturedProjectCard);
```

- [ ] **Step 2: Write `FeaturedProjectCard.module.css`**

```css
.card {
  --card-accent: var(--color-neo-mint);
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-top: var(--space-8);
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.card:hover {
  border-color: color-mix(in srgb, var(--card-accent) 50%, transparent);
  box-shadow: 0 0 56px color-mix(in srgb, var(--card-accent) 20%, transparent);
}

@media (max-width: 1023px) {
  .card {
    grid-template-columns: 1fr;
  }
}

.media {
  position: relative;
  min-height: 320px;
  overflow: hidden;
  background: var(--color-bg-elevated);
}

.image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.body {
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  justify-content: center;
}

.eyebrow {
  font-size: var(--text-sm);
  color: var(--card-accent);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}

.headerRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

.statusDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--card-accent);
}

.tagline {
  font-size: var(--text-base);
  color: var(--card-accent);
  font-weight: var(--weight-medium);
}

.description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.cta {
  align-self: flex-start;
  margin-top: var(--space-2);
}
```

- [ ] **Step 3: Wire it into `Projects.jsx`**

Current `Projects.jsx` maps the entire `PROJECTS` array into the grid. Change it to split featured vs. regular, and render `FeaturedProjectCard` for the featured ones below the grid:

```jsx
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import ProjectCard from './ProjectCard';
import FeaturedProjectCard from './FeaturedProjectCard';
import styles from './Projects.module.css';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const createItemVariants = (reducedMotion) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
});

const Projects = () => {
  const { reducedMotion } = useAccessibility();
  const { t } = useTranslation();
  const itemVariants = useMemo(() => createItemVariants(reducedMotion), [reducedMotion]);

  const regularProjects = useMemo(() => PROJECTS.filter((project) => !project.featured), []);
  const featuredProjects = useMemo(() => PROJECTS.filter((project) => project.featured), []);

  const renderedProjects = useMemo(
    () =>
      regularProjects.map((project, index) => (
        <motion.div key={project.id} variants={itemVariants}>
          <ProjectCard project={project} index={index} />
        </motion.div>
      )),
    [itemVariants, regularProjects]
  );

  return (
    <section className={`${styles.projects} section`} id="projects" aria-label={t.projects.eyebrow}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t.projects.eyebrow}</span>
          <h2 className={styles.heading}>
            {t.projects.headingPre}
            <span className="font-serif">{t.projects.headingAccent}</span>
            {t.projects.headingPost}
          </h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {renderedProjects}
        </motion.div>

        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
```

- [ ] **Step 4: Verify visually**

Run: `npm run dev`, open the Projects section.
Expected:
- The regular grid shows exactly the original 4 projects (Cosmos is no longer in it).
- Below the grid, a full-width Cosmos card renders with the static image, "Proyecto destacado" eyebrow, serif "Cosmos" title, WIP status, cyan tagline/tags, and a working "Ver demo" button linking to `https://cosmos-nine-iota.vercel.app/`.
- Switching the language toggle updates all Cosmos copy to English.
- No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/features/projects/FeaturedProjectCard.jsx src/features/projects/FeaturedProjectCard.module.css src/features/projects/Projects.jsx
git commit -m "feat(projects): render Cosmos as a static full-width featured card"
```

---

### Task 4: Interactive image→video swap (hover, focus, manual toggle)

**Files:**
- Modify: `src/features/projects/FeaturedProjectCard.jsx`
- Modify: `src/features/projects/FeaturedProjectCard.module.css`

**Interfaces:**
- Consumes: `useAccessibility()` → `{ reducedMotion }` from `src/app/context/AccessibilityContext.jsx`; `Volume2`, `VolumeX` from `lucide-react`; `Icon` from `src/components/ui/Icon/Icon.jsx` (props `icon`, `size`).
- Produces: `isPlaying` boolean state fully wired to the video element and the toggle button; Task 5 reuses this same `isPlaying` value (no new state) to drive the audio fade.

- [ ] **Step 1: Add video element, toggle button, and interaction state to `FeaturedProjectCard.jsx`**

Replace the full file with:

```jsx
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Icon from '@/components/ui/Icon/Icon';
import Tag from '@/components/ui/Tag/Tag';
import Button from '@/components/ui/Button/Button';
import { getAccentVar } from '@/utils/accent';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './FeaturedProjectCard.module.css';

const FeaturedProjectCard = ({ project }) => {
  const { t } = useTranslation();
  const { reducedMotion } = useAccessibility();
  const { id, title, image, video, demoUrl, tech, status, accent } = project;
  const copy = t.projects.items[id];

  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manuallyPlaying, setManuallyPlaying] = useState(false);
  const videoRef = useRef(null);

  const isPlaying = manuallyPlaying || (!reducedMotion && (hovering || focused));

  const handleToggle = useCallback(() => {
    setManuallyPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    if (isPlaying) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [isPlaying]);

  return (
    <article className={styles.card} style={{ '--card-accent': getAccentVar(accent) }}>
      <div
        className={styles.media}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <img
          src={image}
          alt={`${title} — ${copy.tagline}`}
          loading="lazy"
          decoding="async"
          className={styles.image}
          data-hidden={isPlaying}
        />
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className={styles.video}
          data-hidden={!isPlaying}
        />

        <button
          type="button"
          className={styles.audioToggle}
          onClick={handleToggle}
          aria-pressed={isPlaying}
        >
          <Icon icon={isPlaying ? Volume2 : VolumeX} size={16} />
          {isPlaying ? t.projects.stopExperience : t.projects.playExperience}
        </button>
      </div>

      <div className={styles.body}>
        <span className={styles.eyebrow}>{t.projects.featuredLabel}</span>

        <div className={styles.headerRow}>
          <h3 className={styles.title}>
            <span className="font-serif">{title}</span>
          </h3>
          <span className={styles.status} data-status={status}>
            <span className={styles.statusDot} />
            {t.projects.status[status] ?? status}
          </span>
        </div>

        <p className={styles.tagline}>{copy.tagline}</p>
        <p className={styles.description}>{copy.description}</p>

        {tech.length > 0 && (
          <div className={styles.tags}>
            {tech.map((item) => (
              <Tag key={item} tone={accent}>
                {item}
              </Tag>
            ))}
          </div>
        )}

        <Button
          as="a"
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          magnetic
          className={styles.cta}
        >
          {t.projects.viewDemo}
        </Button>
      </div>
    </article>
  );
};

export default memo(FeaturedProjectCard);
```

- [ ] **Step 2: Add video cross-fade and toggle-button styles to `FeaturedProjectCard.module.css`**

Append to the file:

```css
.image,
.video {
  transition: opacity var(--duration-base) var(--ease-out);
}

.image[data-hidden='true'] {
  opacity: 0;
}

.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
}

.video[data-hidden='true'] {
  opacity: 0;
  pointer-events: none;
}

.audioToggle {
  position: absolute;
  bottom: var(--space-4);
  right: var(--space-4);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--card-accent);
  background: color-mix(in srgb, var(--color-obsidian) 70%, transparent);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: var(--card-accent);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  transition: background var(--duration-fast) var(--ease-out);
}

.audioToggle:hover,
.audioToggle:focus-visible {
  background: color-mix(in srgb, var(--card-accent) 20%, var(--color-obsidian));
}
```

- [ ] **Step 3: Verify hover, keyboard focus, and manual toggle all work**

Run: `npm run dev`, open the Projects section, and check:
- Mousing over the Cosmos card's media area swaps the image for the looping video within ~350ms; the toggle button shows "Detener experiencia"/"Stop experience" with the `Volume2` icon while hovering.
- Moving the mouse away swaps back to the image and the video visibly pauses (check the DevTools Elements panel — the `<video>` element's `paused` property should be `true`, not just visually hidden).
- Tabbing with the keyboard until focus reaches the toggle button also swaps to the video (no mouse involved); tabbing past it swaps back.
- Clicking the toggle button with the mouse *not* hovering the media area keeps the video playing until clicked again (`aria-pressed` toggles between `"true"`/`"false"` — check via DevTools).
- In the site's accessibility panel, enable "reduced motion", then hover the card: the video must NOT start. Clicking the toggle button must still start it.

- [ ] **Step 4: Commit**

```bash
git add src/features/projects/FeaturedProjectCard.jsx src/features/projects/FeaturedProjectCard.module.css
git commit -m "feat(projects): add hover/focus/manual image-to-video swap for Cosmos card"
```

---

### Task 5: Ambient audio fade tied to `isPlaying`

**Files:**
- Modify: `src/features/projects/FeaturedProjectCard.jsx`

**Interfaces:**
- Consumes: `isPlaying` (defined in Task 4), `project.audio` (defined in Task 1).
- Produces: no new exports — this is the final piece of `FeaturedProjectCard`'s interaction model.

- [ ] **Step 1: Destructure `audio` from `project` and add the audio element + fade effect**

In `FeaturedProjectCard.jsx`:

1. Change the destructuring line:

```jsx
  const { id, title, image, video, audio, demoUrl, tech, status, accent } = project;
```

2. Add these constants above the component:

```jsx
const AUDIO_FADE_IN_MS = 350;
const AUDIO_FADE_OUT_MS = 300;
const AUDIO_TARGET_VOLUME = 0.4;
```

3. Add a second ref next to `videoRef`:

```jsx
  const audioRef = useRef(null);
  const fadeFrameRef = useRef(null);
```

4. Add a second effect right after the existing video-sync effect (still keyed on `isPlaying`):

```jsx
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    cancelAnimationFrame(fadeFrameRef.current);

    const startVolume = audioEl.volume;
    const targetVolume = isPlaying ? AUDIO_TARGET_VOLUME : 0;
    const duration = isPlaying ? AUDIO_FADE_IN_MS : AUDIO_FADE_OUT_MS;
    const startTime = performance.now();

    if (isPlaying) {
      audioEl.play().catch(() => {});
    }

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audioEl.volume = startVolume + (targetVolume - startVolume) * progress;
      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
      } else if (!isPlaying) {
        audioEl.pause();
      }
    };
    fadeFrameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(fadeFrameRef.current);
  }, [isPlaying]);
```

5. Add the `<audio>` element inside `.media`, right after the `<video>` element:

```jsx
        <audio ref={audioRef} src={audio} loop preload="none" />
```

- [ ] **Step 2: Verify audio fade behavior**

Run: `npm run dev`, open the Projects section (unmute your system volume), and check:
- Hovering the Cosmos media area fades the ambient track in smoothly (no abrupt jump to full volume).
- Moving away fades it out and it goes silent — confirm via DevTools that `audioEl.paused` becomes `true` after the fade completes, not immediately on mouse-leave.
- Rapidly hovering in and out doesn't cause overlapping/glitchy volume jumps (the `cancelAnimationFrame` guard should prevent this).
- Open DevTools → Network tab, reload the page: the audio file must NOT be fetched until the first hover/focus/click (confirms `preload="none"` is working and there's no autoplay-without-interaction).
- No unhandled promise rejection appears in the console when interacting rapidly (confirms the `.catch(() => {})` on `audioEl.play()` is doing its job).

- [ ] **Step 3: Commit**

```bash
git add src/features/projects/FeaturedProjectCard.jsx
git commit -m "feat(projects): add ambient audio fade to Cosmos featured card"
```

---

### Task 6: Final QA pass against the full spec

**Files:** none (verification only — fix forward in the relevant file from Tasks 1–5 if something fails)

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: clean build, no errors or warnings about the new files/assets.

- [ ] **Step 2: Walk the spec's testing checklist end to end**

Run: `npm run dev` and, on the Cosmos featured card, confirm all of the following in one pass:

1. Default state shows the static image, not the video.
2. Hover → video replaces image, ambient audio fades in; mouse leave → image returns, video pauses (not just hidden), audio fades out and pauses.
3. Keyboard-only: Tab reaches the toggle button and the "Ver demo"/"View demo" button in a sensible order; focusing the toggle button triggers the same swap as hover; blurring it reverts.
4. Click the toggle button with no hover/focus active: experience starts; click again: it stops. Works independent of mouse position.
5. Enable "reduced motion" in the site's accessibility panel: hovering/focusing the media no longer triggers the video; only the toggle button does.
6. Resize the viewport below 1024px: the card stacks (media above content), no overflow or broken layout; the toggle button remains reachable and legible.
7. Language toggle switches all Cosmos copy (tagline, description, eyebrow, toggle button text, status label) between ES/EN with no leftover hardcoded strings.
8. No emoji anywhere on the card; all icons render via `lucide-react` (`Volume2`/`VolumeX`) sized/stroked consistently with the rest of the site (via the shared `Icon` component).
9. Browser DevTools Network tab, hard reload: confirm `Cosmos.mp4` and `space ambience.mp3` are not fetched on page load — only after first interaction with the card.
10. No console errors or unhandled promise rejections throughout the above.

- [ ] **Step 3: Fix forward**

If any check in Step 2 fails, fix it in the relevant file (`FeaturedProjectCard.jsx`, `FeaturedProjectCard.module.css`, `projects.js`, or `translations.js`) and re-run the full checklist before proceeding.

- [ ] **Step 4: Final commit (only if fixes were needed)**

```bash
git add -A
git commit -m "fix(projects): address QA findings on Cosmos featured card"
```
