# Fase 3 — Foundation System

## Qué hacer con estos archivos
Todo lo que está bajo `src/` en este paquete respeta EXACTAMENTE tu
arquitectura de carpetas ya creada. Son archivos **nuevos** — cópialos
tal cual a las rutas correspondientes dentro de tu proyecto (sobrescribiendo
cualquier placeholder vacío que hayas dejado en la Fase 2).

```
src/
├── constants/
│   └── breakpoints.js
├── components/
│   ├── ui/
│   │   ├── Button/ (Button.jsx + .module.css)
│   │   ├── Card/   (Card.jsx + .module.css)
│   │   └── Icon/   (Icon.jsx + .module.css)
│   └── layout/
│       ├── Navbar/     (Navbar.jsx + .module.css)
│       └── MainLayout/ (MainLayout.jsx + .module.css)
├── features/
│   └── hero/
│       └── HeroSkeleton.jsx + .module.css
└── styles/
    ├── tokens/      (colors, typography, spacing, radius, shadows, motion + index.css)
    ├── themes/      (dark.css)
    ├── base/        (reset, global + index.css)
    ├── utilities/   (layout, elevation, accessibility, responsive + index.css)
    └── index.css    ← el único import que necesitas en main.jsx
```

## 1. Un solo cambio en `main.jsx`
```jsx
import '@/styles/index.css';
```
Si ya tenías imports de CSS sueltos de la Fase 2, elimínalos — todo pasa
ahora por este único punto de entrada.

## 2. Fuentes (pendiente de tu parte)
No pude descargar los binarios de Geist / Instrument Serif desde este
entorno (red restringida a registries de paquetes). Recomendación más
simple, vía Fontsource:

```bash
npm install @fontsource-variable/geist-sans @fontsource/instrument-serif
```

y en `main.jsx`, antes de `styles/index.css`:
```jsx
import '@fontsource-variable/geist-sans';
import '@fontsource/instrument-serif';
```

Verifica el nombre exacto de `font-family` que expone cada paquete
(`Geist Sans` / `Instrument Serif` normalmente) contra
`src/styles/tokens/typography.css` — ajusta si difiere. Si prefieres
auto-hospedar los `.woff2` en `src/assets/fonts/`, dejé el bloque
`@font-face` comentado y listo en `src/styles/base/global.css`.

## 3. Alias `@` para imports
Los componentes usan `import Button from '@/components/ui/Button/Button'`.
Si aún no tienes el alias `@` → `src/` configurado en `vite.config.js`,
añade:
```js
resolve: {
  alias: { '@': path.resolve(__dirname, './src') }
}
```

## 4. Cómo probar rápido que todo encaja
En tu página principal (donde antes tenías el render skeleton de la
Fase 2):
```jsx
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import HeroSkeleton from '@/features/hero/HeroSkeleton';

function App() {
  return (
    <MainLayout>
      <HeroSkeleton />
    </MainLayout>
  );
}
```
Deberías ver: fondo obsidian, navbar fija con blur al hacer scroll,
titular con "Creative" en Instrument Serif (si ya instalaste la fuente),
dos botones (mint sólido + outline), y foco visible en mint al navegar
con Tab.

## Decisiones de diseño que tomé (y por qué)
- **Tokens crudos vs. semánticos separados** (`tokens/colors.css` vs
  `themes/dark.css`): así la Fase 5 agrega `themes/high-contrast.css`
  sin tocar ni un componente — solo cambia `data-theme` en `<html>`.
- **Reduce-motion resuelto a nivel de token** (`tokens/motion.css`):
  ya hay una red de seguridad activa aunque el `AccessibilityContext`
  completo de la Fase 5 aún no exista.
- **Glows de color en vez de sombras oscuras** para hover states:
  coherente con "muchísima iluminación" del brief, sobre fondo obsidian
  una sombra negra no se nota — un glow mint sí.
- **Breakpoints como constantes JS**, no CSS vars: `@media` no acepta
  `var()`, así que quedaron hardcodeados mobile/tablet/laptop/desktop/wide
  y documentados en un solo lugar (`constants/breakpoints.js`) para que
  JS y CSS no se desincronicen.
- **Navbar y copy del Hero son placeholders neutros**, no repliqué el
  layout de Franky Hung 1:1 (ni el texto "Local time HKT...") — es su
  diseño real; usé la imagen como referencia de tono/mood, no como
  plantilla a clonar.

## Qué falta antes de dar la Fase 3 por cerrada
- [ ] Instalar fuentes (paso 2)
- [ ] Confirmar alias `@` (paso 3)
- [ ] Reemplazar el copy placeholder de Navbar/HeroSkeleton con el tuyo
- [ ] Un pase visual tuyo — avísame si algo no se ve como esperabas
      y lo ajustamos antes de pasar a la Fase 4 (el objeto 3D)
