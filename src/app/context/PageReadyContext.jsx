import { createContext, useContext, useMemo, useState } from 'react';

const PageReadyContext = createContext(null);

/**
 * Señal simple: "¿ya terminó la cortina de entrada?". El Hero la usa
 * para no empezar a montar el Ecosystem 3D (trabajo pesado del hilo
 * principal) hasta que la animación de la cortina haya terminado.
 */
export const PageReadyProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const api = useMemo(() => ({ ready, setReady }), [ready]);
  return <PageReadyContext.Provider value={api}>{children}</PageReadyContext.Provider>;
};

export function usePageReady() {
  const ctx = useContext(PageReadyContext);
  if (!ctx) throw new Error('usePageReady debe usarse dentro de <PageReadyProvider>');
  return ctx;
}