/**
 * Traduce el nombre corto de acento ('mint' | 'amber' | 'coral' | 'cyan')
 * a la CSS custom property real. Único lugar donde vive este mapeo —
 * ProjectCard, TimelineItem y Skills lo comparten en vez de duplicarlo.
 */
const ACCENT_TOKENS = {
  mint: 'neo-mint',
  amber: 'soft-amber',
  coral: 'electric-coral',
  cyan: 'ice-cyan',
};

export function getAccentVar(accent) {
  return `var(--color-${ACCENT_TOKENS[accent] ?? ACCENT_TOKENS.mint})`;
}