const STORAGE_KEY = 'atlas-quote-plan';
const EVENT_NAME = 'atlas:quote-request';

/**
 * Puente entre las cards de precios (Investment) y el form de Contact —
 * viven en features distintos y Contact es lazy. Un evento en vivo
 * porque Contact casi siempre YA está montado cuando se hace el click
 * (el prefetch secuencial lo carga temprano) — un simple "leer al
 * montar" se pierde el valor si se setea después. sessionStorage queda
 * como respaldo por si el click llega antes de que Contact monte.
 */
export function requestQuote(planTitle) {
  try {
    sessionStorage.setItem(STORAGE_KEY, planTitle);
  } catch {
    /* sessionStorage no disponible — el evento en vivo sigue funcionando */
  }
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: planTitle }));
}

export function onQuoteRequest(handler) {
  try {
    const pending = sessionStorage.getItem(STORAGE_KEY);
    if (pending) {
      sessionStorage.removeItem(STORAGE_KEY);
      handler(pending);
    }
  } catch {
    /* no-op */
  }

  const listener = (event) => handler(event.detail);
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
