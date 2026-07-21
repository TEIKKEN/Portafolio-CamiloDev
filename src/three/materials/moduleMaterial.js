/**
 * Paleta reducida a propósito: el objeto es casi todo metal, con muy
 * pocos módulos "activos". El color pasa a comunicar estado
 * (activo/inactivo), no a decorar. El tono casi negro suma
 * profundidad tonal entre los grises medios, para que no se lea todo
 * al mismo nivel de brillo.
 */
export const METAL_GREYS = ['#1c1e21', '#55585c', '#606366', '#6b6e72', '#75787c'];

// Los 4 acentos del sistema de diseño (tokens/colors.css). Cada módulo
// "activo" toma uno al azar, en vez de un único color fijo, para que
// la distribución se sienta orgánica y no monocorde.
export const ACCENT_COLORS = ['#6cf4c5', '#a9f7ff', '#ffbe5c', '#ff6e5b'];

// Acento fijo para el highlight de hover en "frontend" (Skills) — un
// estado de interacción distinto al color individual por módulo.
export const ACTIVE_ACCENT = '#6cf4c5';
export const ACTIVE_RATIO = 0.15; // ~15% de los módulos son "activos"