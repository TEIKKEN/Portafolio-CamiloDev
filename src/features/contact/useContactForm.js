import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getContactSchema } from './schema';
import { useTranslation } from '@/hooks/useTranslation';
import { checkRateLimit, recordAttempt } from '@/utils/rateLimiter';
import { onQuoteRequest } from '@/utils/quoteRequest';

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mlgqgpkp';
const MIN_SUBMIT_DELAY_MS = 1500; // menos que esto entre montar el form y enviarlo = casi seguro un bot

export function useContactForm() {
  const { t, language } = useTranslation();
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const mountedAt = useRef(Date.now());
  const isSubmittingRef = useRef(false);

  const resolver = useMemo(() => zodResolver(getContactSchema(t.contact)), [t]);

  const form = useForm({
    resolver,
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      website: '',
    },
  });

  // Si se llegó acá desde el botón "Solicitar este plan" de Investment,
  // precarga el asunto con el nombre del plan. Contact casi siempre ya
  // está montado cuando ocurre el click (prefetch secuencial), así que
  // esto queda suscrito en vivo en vez de leer una sola vez al montar.
  useEffect(() => {
    return onQuoteRequest((planTitle) => {
      form.setValue('subject', planTitle, {
        shouldValidate: false,
        shouldDirty: false,
      });
    });
  }, [form]);

  const onSubmit = useCallback(
    async (data) => {
      // Bloqueo de envíos duplicados: el `disabled` del botón cubre el
      // caso normal; esto cubre el caso borde de doble-click/Enter
      // antes de que React re-renderice el estado disabled.
      if (isSubmittingRef.current) return;

      // Honeypot: fallamos en silencio, sin decirle al bot por qué —
      // no queremos darle pistas de cómo evadirlo la próxima vez.
      if (data.website) {
        setStatus('success');
        form.reset();
        return;
      }

      if (Date.now() - mountedAt.current < MIN_SUBMIT_DELAY_MS) {
        setErrorMessage(t.contact.genericError);
        setStatus('error');
        return;
      }

      const rateCheck = checkRateLimit();
      if (!rateCheck.allowed) {
        setErrorMessage(t.contact.rateLimited(rateCheck.retryAfterSeconds));
        setStatus('error');
        return;
      }

      isSubmittingRef.current = true;
      setStatus('submitting');
      setErrorMessage('');

      try {
        const { website, ...payload } = data;
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            _subject: `Portafolio — ${payload.subject}`,
            _language: language,
          }),
        });

        recordAttempt();

        if (response.ok) {
          setStatus('success');
          form.reset();
          return;
        }

        const responsePayload = await response.json().catch(() => null);
        const message =
          responsePayload?.errors?.map((e) => e.message).join(', ') ||
          t.contact.genericError;
        setErrorMessage(message);
        setStatus('error');
      } catch {
        setErrorMessage(t.contact.networkError);
        setStatus('error');
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [form, t, language]
  );

  const resetStatus = useCallback(() => setStatus('idle'), []);

  return { form, status, errorMessage, onSubmit, resetStatus };
}
