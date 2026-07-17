/**
 * Elimina caracteres de control invisibles (los que se pueden pegar
 * desde un editor raro o inyectar vía teclado) que no aportan nada
 * legítimo a un formulario de contacto.
 *
 * `allowNewlines`: úsalo en el campo de mensaje (textarea) — en campos
 * de una sola línea (nombre, correo, asunto) los saltos de línea
 * tampoco deberían sobrevivir.
 */
export function stripControlChars(value, { allowNewlines = false } = {}) {
  if (typeof value !== 'string') return value;
  const pattern = allowNewlines
    ? /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g // conserva \n (0x0A) y \t (0x09)
    : /[\x00-\x1F\x7F]/g;
  return value.replace(pattern, '');
}