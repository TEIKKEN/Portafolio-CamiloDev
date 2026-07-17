import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

/**
 * Reporta las Core Web Vitals REALES del visitante (a diferencia de
 * Lighthouse, que las simula). En desarrollo las imprime en consola;
 * en producción, conéctalas a tu analítica reemplazando `send`.
 */
function send(metric) {
  if (import.meta.env.DEV) {
    console.log(`[web-vitals] ${metric.name}:`, Math.round(metric.value), metric.rating);
    return;
  }
  // [CONFIRMAR] ejemplo si usas Vercel Analytics:
  // window.va?.('event', { name: metric.name, value: metric.value });
}

export function reportWebVitals() {
  onCLS(send);
  onFCP(send);
  onINP(send);
  onLCP(send);
  onTTFB(send);
}