const STORAGE_KEY = 'atlas-contact-attempts';
const MAX_ATTEMPTS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos de bloqueo tras exceder el máximo

function readAttempts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAttempts(attempts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  } catch {
    /* localStorage no disponible — el rate limit simplemente no persiste */
  }
}

/**
 * Rate limiting del lado del cliente. Importante ser honesto sobre lo
 * que esto es: NO es la defensa real (cualquiera puede borrar
 * localStorage), es la primera capa que frena el caso más común —
 * alguien reenviando el formulario en loop por error o con un script
 * simple. La defensa real vive del lado de Formspree.
 */
export function checkRateLimit() {
  const now = Date.now();
  const attempts = readAttempts().filter((ts) => now - ts < WINDOW_MS);

  if (attempts.length >= MAX_ATTEMPTS) {
    const retryAt = attempts[0] + COOLDOWN_MS;
    if (now < retryAt) {
      return { allowed: false, retryAfterSeconds: Math.ceil((retryAt - now) / 1000) };
    }
    writeAttempts([]);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordAttempt() {
  const attempts = readAttempts();
  attempts.push(Date.now());
  writeAttempts(attempts);
}