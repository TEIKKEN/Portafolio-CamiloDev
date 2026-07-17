import { z } from 'zod';
import { stripControlChars } from '@/utils/sanitize';

export function getContactSchema(t) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, t.validation.nameMin)
      .max(80, t.validation.nameMax)
      .transform((v) => stripControlChars(v)),
    email: z
      .string()
      .trim()
      .min(1, t.validation.emailRequired)
      .email(t.validation.emailInvalid)
      .transform((v) => stripControlChars(v)),
    subject: z
      .string()
      .trim()
      .min(3, t.validation.subjectMin)
      .max(120, t.validation.subjectMax)
      .transform((v) => stripControlChars(v)),
    message: z
      .string()
      .trim()
      .min(10, t.validation.messageMin)
      .max(2000, t.validation.messageMax)
      .transform((v) => stripControlChars(v, { allowNewlines: true })),
    // Honeypot — un bot que llena todos los campos ciegamente lo va a
    // llenar; un humano nunca lo ve, así que siempre debe llegar vacío.
    website: z.string().max(0).optional(),
  });
}